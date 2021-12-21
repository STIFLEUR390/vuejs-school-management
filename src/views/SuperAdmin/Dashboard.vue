<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('dashboard') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('dashboard') }}</li>
                        </ol>
                    </div><!-- /.col -->
                </div><!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
        <!-- /.content-header -->

        <!-- Main content -->
        <section class="content">
            <div class="container-fluid">
                <!-- Small boxes (Stat box) -->
                <div class="row">
                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="info-box shadow">
                            <span class="info-box-icon bg-info elevation-1"><i class="fas fa-cog"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">{{ $t('students') }}</span>
                                <span class="info-box-number">{{ data.student_count }}</span>
                            </div>
                            <!-- /.info-box-content -->
                        </div>
                        <!-- /.info-box -->
                    </div>
                    <!-- /.col -->
                    <div class="col-12 col-sm-6 col-md-3">
                        <router-link :to="{name: 'SuperAdminTeacherReport'}">
                            <div class="info-box shadow mb-3">
                                <span class="info-box-icon bg-danger elevation-1"><i class="fas fa-thumbs-up"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">{{ $t('teacher') }}</span>
                                    <span class="info-box-number">{{ data.teachers_count }}</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                        </router-link>
                        <!-- /.info-box -->
                    </div>
                    <!-- /.col -->

                    <!-- fix for small devices only -->
                    <div class="clearfix hidden-md-up"></div>
                    <div class="col-12 col-sm-6 col-md-3">
                        <router-link :to="{name: 'SuperAdminParentReport'}">
                            <div class="info-box shadow mb-3">
                                <span class="info-box-icon bg-warning elevation-1"><i class="fas fa-users"></i></span>

                                <div class="info-box-content">
                                    <span class="info-box-text">{{ $t('parents') }}</span>
                                    <span class="info-box-number">{{ data.parent_count }}</span>
                                </div>
                                <!-- /.info-box-content -->
                            </div>
                            <!-- /.info-box -->
                        </router-link>
                    </div>
                    <!-- /.col -->

                    <div class="col-12 col-sm-6 col-md-3">
                        <div class="info-box shadow mb-3">
                            <span class="info-box-icon bg-success elevation-1"><i class="fas fa-shopping-cart"></i></span>

                            <div class="info-box-content">
                                <span class="info-box-text">{{ $t('staff') }}</span>
                                <span class="info-box-number">{{ data.employee_count }}</span>
                            </div>
                            <!-- /.info-box-content -->
                        </div>
                        <!-- /.info-box -->
                    </div>
                    <!-- /.col -->
                </div>
            </div><!-- /.container-fluid -->
        </section>
    </div>
</template>

<script>
    import UserService from "../../services/user.service"
    import EventBus from "../../common/EventBus"

    export default {
        name: "Dashboard",
        data(){
            return {
                data: {
                    "teachers_count": 0,
                    "student_count": 0,
                    "employee_count": 0,
                    "parent_count": 0,
                    "daily_attendances": [],
                }
            }
        },
        mounted() {
            UserService.getUserSuperAdminBoard().then(
                response => {
                    this.data = response.data.data
                },
                error => {
                    this.content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                    if (error.response && error.response.status === 403) {
                        EventBus.dispatch("logout")
                    }
                }
            )
            // this.getData()
        },
        methods: {
            /*async getData() {
                this.axios.get('/superadmin/dashboard')
                    .then((response) => {
                        this.data = response.data.data
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
            }*/
        }
    }
</script>

<style scoped>

</style>