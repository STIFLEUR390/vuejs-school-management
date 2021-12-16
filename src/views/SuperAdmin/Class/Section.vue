<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('update') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('update') }}</li>
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
                                <router-link :to="{name: 'SuperAdminClassReport'}" class="btn btn-primary">
                                    <i class=" fa fa-arrow-left"></i> {{ $t('return') }}
                                </router-link>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->
                            <form @submit.prevent="updatedSection">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="name">{{ $t('name') }}</label>
                                        <input type="text" class="form-control" id="name" name="name" v-model="name">
                                        <small class="form-text text-muted">{{ $t('provide_name') }}</small>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">{{ $t('update') }}</button>
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
        name: "Section",
        data() {
            return {
                name : null,
            }
        },
        mounted() {
            this.getSessions()
        },
        methods:  {
            async updatedSection(){
                let form = {
                    'name': this.name,
                    getData: 'class_section'
                }
                this.axios.put('/superadmin/crud/'+this.$route.params.id, form)
                    .then((response) => {
                        this.$swal({
                            toast: true,
                            icon: 'success',
                            title: this.$t(response.data.data.notification),
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 5000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', this.$swal.stopTimer)
                                toast.addEventListener('mouseleave', this.$swal.resumeTimer)
                            }
                        })
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                        if (error.response.data.success === false)
                        {
                            this.errors = error.response.data.message
                        }
                    })
            },
            async getSessions(){
                this.axios.get('/superadmin/crud/'+this.$route.params.id+'?getData=class_session')
                    .then((response) => {
                        this.name = response.data.data
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
        }
    }
</script>

<style scoped>

</style>