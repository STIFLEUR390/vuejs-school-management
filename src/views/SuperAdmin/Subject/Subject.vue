<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('subject') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('subject') }}</li>
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
                                <h3 class="card-title">{{ $t('subject') }}</h3>
                                <router-link :to="{name: 'SuperAdminSubjectCreate'}" style="float: right;" class="btn btn-primary">{{ $t('add_subject') }}</router-link>
                            </div>
                            <div class="card-body">
                                <div v-if="errors.all().length > 0" class="alert alert-danger alert-dismissible mx-2 my-2">
                                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                    <ul>
                                        <li v-for="(error, id) in errors.all()" :key="id">{{ error }}</li>
                                    </ul>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>{{ $t('select_a_class') }}</label>
                                            <!--<select v-model="class_id" class="custom-select" :data-placeholder="$t('select_a_class')"
                                                    style="width: 100%;">
                                                <option v-for="(classe, index) in classes" :key="index" :value="classe.id">{{ classe.name }}</option>
                                            </select>-->
                                            <v-select :options="classes" v-model="class_id"></v-select>
                                        </div>
                                        <!--<div class="form-group">
                                            <label>{{ $t('select_a_class') }}</label>
                                            <select class="custom-select" name="class_id" v-model="class_id">
                                                <option v-for="(classe, index) in classes" :key="index" :value="classe.id">{{ classe.name }}</option>
                                            </select>
                                        </div>-->
                                    </div>
                                    <div class="col-md-4" style="padding-top: 33px;">
                                        <button @click="getDataSubject()" class="btn btn-block btn-secondary">{{ $t('filter') }}</button>
                                    </div>
                                </div>
                                <table v-if="classes" id="datatable" class="table table-bordered table-striped mt-3">
                                    <thead>
                                        <tr>
                                            <th width="5%">{{ $t('id') }}</th>
                                            <th>{{ $t('name') }}</th>
                                            <th width="30%">{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(subject, id) in subjects" :key="id">
                                            <td>{{ id + 1 }}</td>
                                            <td>{{ subject.name }}</td>
                                            <td>
                                                <router-link :to="{name: 'SuperAdminSubjectEdit', params: { id: subject.id }}" class="btn btn-primary mr-3">
                                                    {{ $t('edit')}}
                                                </router-link>
                                                <button @click="confirmDeleteSubject(subject.id)" class="btn btn-danger mr-3">{{ $t('delete') }}</button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <!-- /.card-body -->
                        </div>
                    </div>
                </div>
                <!-- /.row -->
            </div><!-- /.container-fluid -->
        </div>
    </div>
</template>

<script>
    import 'admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css'
    import 'admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css'
    import 'admin-lte/plugins/jquery/jquery'
    import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
    import 'admin-lte/plugins/datatables/jquery.dataTables'
    import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4'
    import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive'
    import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4'
    import $ from "jquery"

    export default {
        name: "Subject",
        data() {
            return {
                subjects: [],
                classes: [],
                class_id: null,
            }
        },
        mounted() {
            this.getDataClass()
        },
        methods: {
            deleteSubject(id){
                this.axios.delete("/superadmin/crud/"+id+"?getData=subject")
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

                    // setTimeout(() => {
                        this.$router.push({name: 'Refresh'})
                    // }, 5000)
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
            confirmDeleteSubject(id){
                console.log(id)
                this.$swal({
                    title: this.$t('are_you_sure_2'),
                    text: this.$t('no_revert_action'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: this.$t('delete_id'),
                    cancelButtonText: this.$t('cancelled'),
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if(result.value) {
                        this.deleteSubject(id)
                    } else {
                        this.$swal('Cancelled', this.$t('not_delete_file'), 'info')
                    }
                })
            },
            getDataSubject() {
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false
                        return
                    }

                    if (this.class_id) {
                        this.axios.get("/superadmin/crud?getData=subject&class_id="+this.class_id.id)
                            .then((response) => {
                                if ( $.fn.DataTable.isDataTable('#datatable') ) {
                                    $('#datatable').DataTable().destroy();
                                }

                                this.subjects = response.data.data;
                                setTimeout(() => {
                                    $("#datatable").DataTable({
                                        lengthMenu: [
                                            [5,10, 25, 50, -1],
                                            [5,10, 25, 50, "All"],
                                        ],
                                        pageLength: 5,
                                    })
                                })
                            })
                    }
                })
            },
            getDataClass() {
                this.axios.get("/superadmin/crud?getData=class_for_select")
                    .then((response) => {
                        this.classes = response.data.data
                    })
            },
        }
    }
</script>

<style>

</style>