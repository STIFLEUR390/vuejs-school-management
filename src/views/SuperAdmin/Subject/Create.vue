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

                            <div v-if="errors.all().length > 0" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <ul>
                                    <li v-for="(error, id) in errors.all()" :key="id">{{ error }}</li>
                                </ul>
                            </div>
                            <form @submit.prevent="createSubject">
                                <div class="card-body">
                                    <!--<div class="form-group">
                                        <label>{{ $t('class') }}</label>
                                        <select2 :options="classes" v-validate.continues="{ required: true }" name="class" v-model="form.class_id">
                                            <option disabled value="">Select one</option>
                                        </select2>
                                        <small class="form-text text-muted">{{ $t('select_a_class') }}</small>
                                    </div>-->
                                    <div class="form-group">
                                        <label>{{ $t('class') }}</label>
                                        <v-select :options="classes" v-model="class_id" v-validate.continues="{ required: true }" name="classe" ></v-select>
                                        <small class="form-text text-muted">{{ $t('select_a_class') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">{{ $t('subject_name') }}</label>
                                        <input type="text" :name="$t('subject')" v-validate.continues="{ required: true, min: 3 }" class="form-control" id="name" v-model="form.name">
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
    export default {
        name: "Create",
        data() {
            return {
                form: {
                    name: '',
                    getData: 'subject',
                },
                // errors: null,
                test: null,
                classes: [],
                class_id: null,
            }
        },
        mounted() {
            this.getDataClass()
        },
        methods: {
            async createSubject(){
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false
                        return
                    }

                    let class_id = this.class_id.id

                    let form = {
                        name: this.form.name,
                        class_id: class_id,
                        getData: 'subject'
                    }
                    this.axios.post('/superadmin/crud', form)
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
                })

            },
            async getDataClass() {
                this.axios.get("/superadmin/crud?getData=class_for_select")
                    .then((response) => {
                        this.classes = response.data.data
                    })
            },
        },
    }
</script>

<style>
    .select2-selection {
        border-radius: 0px !important;
        text-align: left !important;
    }
    .select2-dropdown {
        border-radius: 0px !important;
    }
</style>