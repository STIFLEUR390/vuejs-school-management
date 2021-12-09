<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('update_class_room') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('update_class_room') }}</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header">
                                <!--                                <h3 class="card-title">Quick Example</h3>-->
                                <router-link :to="{name: 'SuperAdminClassRoomReport'}" class="btn btn-primary">
                                    <i class=" fa fa-arrow-left"></i> {{ $t('return') }}
                                </router-link>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->

                            <div v-if="errors" class="bg-danger text-white mx-2 my-2">
                                <ul>
                                    <li v-for="(error, id) in errors" :key="id">{{ error[0] }}</li>
                                </ul>
                            </div>
                            <form @submit.prevent="updatedClassRoom">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="name">{{ $t('class_room_name') }}</label>
                                        <input type="text" class="form-control" id="name" name="name" v-model="form.name">
                                        <small class="form-text text-muted">{{ $t('provide_class_room_name') }}</small>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">{{ $t('update_class_room') }}</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
        data() {
            return {
                form: {},
                getData: 'classroom',
                errors: null,
            }
        },
        mounted() {
            this.getClassRoom()
        },
        methods: {
            async updatedClassRoom(){
                let form = {
                    'name': this.form.name,
                    getData: 'classroom'
                }
                this.axios.put('/superadmin/crud/'+this.$route.params.id, form)
                .then((response) => {
                    this.$swal({
                        toast: true,
                        icon: 'success',
                        title: this.$t(response.data.data.notification, {name: response.data.data.name}),
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 5000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', this.$swal.stopTimer)
                            toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                        }
                    })
                    this.errors = null
                })
                .catch((error) => {
                    console.log(error.response.data)
                    if (error.response.data.success === false)
                    {
                        this.errors = error.response.data.message
                    }
                })
            },
            async getClassRoom(){
                this.axios.get('/superadmin/crud/'+this.$route.params.id+'?getData=classroom')
                    .then((response) => {
                        this.form = response.data.data
                    })
                    .catch((error) => {
                        this.$swal({
                            toast: true,
                            icon: 'warning',
                            title: 'Une erreur est survenue, veuillez recharger la page',
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                            }
                        })
                        console.log(error.response)
                    })
            },
        },
    }
</script>

<style scoped>

</style>