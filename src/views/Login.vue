<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <router-link to="/"><b>Franck School</b></router-link>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <div v-if="message" class="alert alert-danger alert-dismissible">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                        <h5><i class="icon fas fa-ban"></i> {{ $t('errors') }}</h5>
                        <ul>
                            <li v-for="(mes, id) in message" :key="id">
                                <span v-if="mes['0'] == 'U'">Unauthorized</span>
                                <span v-else>{{ mes['0'] }}</span>
                            </li>
                        </ul>
                    </div>
                    <p class="login-box-msg">Sign in to start your session</p>

                    <form name="form" @submit.prevent="handleLogin">
                        <div class="input-group mb-3">
                            <input v-model="user.email" type="email" class="form-control" placeholder="Email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input v-model="user.password" type="password" class="form-control" placeholder="Password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input v-model="check" type="checkbox" id="remember">
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block">Sign In</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <div class="social-auth-links text-center mb-3">
                        <p>- OR -</p>
                        <a href="#" class="btn btn-block btn-primary">
                            <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
                        </a>
                        <a href="#" class="btn btn-block btn-danger">
                            <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
                        </a>
                    </div>
                    <!-- /.social-auth-links -->

                    <p class="mb-1">
                        <a href="javascript:void(0);">I forgot my password</a>
                    </p>
                    <p class="mb-0">
                        <router-link :to="{name: 'Register'}" class="text-center">Register a new membership</router-link>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>
        <!-- /.login-box -->
    </div>
</template>

<script>
    import User from '../models/user';

    export default {
        name: "Login",
        data() {
            return {
                user: new User('', ''),
                loading: false,
                message: '',
                check: false
            };
        },
        computed: {
            loggedIn() {
                return this.$store.state.auth.status.loggedIn;
            }
        },
        created() {
            if (this.loggedIn) {
                this.$router.push({ name: 'SuperAdminDashboard' });
            }
        },
        methods: {
            handleLogin() {
                this.loading = true;
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false;
                        return;
                    }

                    if (this.user.email && this.user.password) {
                        this.$store.dispatch('auth/login', this.user).then(
                            () => {
                                this.$router.push({ name: 'SuperAdminDashboard' });
                            },
                            error => {
                                this.loading = false;
                                this.message =
                                    (error.response && error.response.data) ||
                                    error.message || error.toString();
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