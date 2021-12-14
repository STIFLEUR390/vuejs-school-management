<template>
    <div class="hold-transition register-page">
        <div class="register-box">
            <div class="register-logo">
                <router-link to="/"><b>Franck School</b></router-link>
            </div>

            <div class="card">
                <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">{{message}}</div>
                <div class="card-body register-card-body">
                    <p class="login-box-msg">Register a new membership</p>
                    <div v-if="errors.all().length > 0" class="alert alert-danger alert-dismissible mx-2 my-2">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                            <ul>
                                <li v-for="(error, id) in errors.all()" :key="id">{{ error }}</li>
                            </ul>
                    </div>
                    <form @submit.prevent="handleRegister" name="form">
                        <div class="input-group mb-3">
                            <input v-model="user.username" v-validate.continues="'required|alpha|min:5'" name="username" type="text" class="form-control" placeholder="Full name">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input v-model="user.email" v-validate.continues="'required|email|max:50'" name="email" type="email" class="form-control" placeholder="Email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input v-model="user.password" v-validate.continues="'required|alpha|min:5'" type="password" ref="password" name="password" class="form-control" placeholder="Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input v-model="user.password_confirmation" name="password_confirmation" type="password" class="form-control" placeholder="Retype password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input v-model="check" type="checkbox" id="agreeTerms" name="terms" value="agree">
                                    <label for="agreeTerms">
                                        I agree to the <a href="#">terms</a>
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Register</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <div class="social-auth-links text-center">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i>
                            Sign up using Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i>
                            Sign up using Google+
                        </a>
                    </div>

                    <router-link :to="{name: 'Login'}" class="text-center">I already have a membership</router-link>
                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>
    </div>
</template>

<script>
    import User from '../models/user';

    export default {
        name: "Register",
        data() {
            return {
                user: new User('', '', '', ''),
                submitted: false,
                successful: false,
                message: '',
                check: false,
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        mounted() {
            if (this.loggedIn) {
                this.$router.push({ name: 'SuperAdminDashboard' });
            }
        },
        methods: {
            handleRegister() {
                this.message = '';
                this.submitted = true;
                this.$validator.validate().then(isValid => {
                    if (isValid) {
                        this.$store.dispatch('auth/register', this.user).then(
                            data => {
                                this.message = data.message;
                                this.successful = true;
                            },
                            error => {
                                this.message =
                                    (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();
                                this.successful = false;
                            }
                        );
                    }
                });
            }
        }
    }
</script>

<style>

</style>