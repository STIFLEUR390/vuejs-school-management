<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('create_subject') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('create_subject') }}</li>
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
                                <router-link :to="{name: 'SuperAdminSubjectReport'}" class="btn btn-primary">
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
                            <form @submit.prevent="createSubject">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>{{ $t('class') }}</label>
                                        <select class="custom-select" name="class_id" v-model="form.class_id">
                                            <option v-for="(classe, index) in classes" :key="index" :value="classe.id">{{ classe.name }}</option>
                                        </select>
                                        <small class="form-text text-muted">{{ $t('select_a_class') }}</small>
                                    </div>
                                    <!--<div class="form-group">
                                        <label>{{ $t('class') }}</label>
                                        <select class="select2bs4" :data-placeholder="$t('select_a_class')"
                                                style="width: 100%;">
                                            <option v-for="(classe, index) in classes" :key="index" :value="classe.id">{{ classe.name }}</option>
                                        </select>
                                        <small class="form-text text-muted">{{ $t('select_a_class') }}</small>
                                    </div>-->
                                    <div class="form-group">
                                        <label for="name">{{ $t('subject_name') }}</label>
                                        <input type="text" class="form-control" id="name" name="name" v-model="form.name">
                                        <small class="form-text text-muted">{{ $t('provide_subject_name') }}</small>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">{{ $t('create_subject') }}</button>
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
    /*import 'admin-lte/plugins/select2/css/select2.css'
    import 'admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.css'
    import 'admin-lte/plugins/jquery/jquery'
    import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
    import 'admin-lte/plugins/select2/js/select2.full'
    import $ from "jquery"*/

    export default {
        name: "Create",
        data() {
            return {
                form: {
                    name: '',
                    getData: 'subject',
                    class_id: null,
                },
                classes: null,
                errors: null,
            }
        },
        mounted() {
            this.getDataClass()
            /*$('.select2bs4').select2({
                theme: 'bootstrap4'
            })*/
        },
        methods: {
            async createSubject(){
                this.axios.post('/superadmin/crud', this.form)
                .then((response) => {
                    console.log(response.data.data.notification)
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
            async getDataClass() {
                this.axios.get("/superadmin/crud?getData=class")
                    .then((response) => {
                        this.classes = response.data.data
                    })
            },
        },
    }
</script>

<style>

</style>