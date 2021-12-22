<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('teachers') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('teachers') }}</li>
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
                                <h3 class="card-title">{{ $t('teachers') }}</h3>
                                <router-link :to="{name: 'SuperAdminTeacherCreate'}" style="float: right;" class="btn btn-primary">{{ $t('create_teacher') }}</router-link>
                            </div>
                            <div class="card-body">
                                <table id="datatable" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>{{ $t('image') }}</th>
                                            <th>{{ $t('name') }}</th>
                                            <th>{{ $t('code') }}</th>
                                            <th>{{ $t('department') }}</th>
                                            <th>{{ $t('designation') }}</th>
                                            <th width="37%">{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(teacher, id) in teachers" :key="id">
                                            <td>
                                                <img :src="teacher.user.image" :alt="teacher.user.name" width="40" />
                                            </td>
                                            <td>{{ teacher.user.name }}</td>
                                            <td>{{ teacher.user.code }}</td>
                                            <td>{{ teacher.department.name }}</td>
                                            <td>{{ teacher.designation }}</td>
                                            <td>
                                                <button v-if="teacher.user.deleted_at" @click="restoredUser(teacher.user.id)" class="btn btn-outline-success mr-1">
                                                    <i class="fa fa-recycle"></i>
                                                </button>
                                                <router-link v-if="!teacher.user.deleted_at" :to="{name: 'SuperAdminTeacherEdit', params: { id: teacher.user.id }}" class="btn btn-primary mr-1">
                                                    {{ $t('edit')}}
                                                </router-link>
                                                <button type="button" class="btn btn-info mr-1" data-toggle="modal" :data-target="'#modal-default'+teacher.id"> {{ $t('permissions') }} </button>
                                                <div class="modal fade" :id="'modal-default'+teacher.id">

<!--                                                    Debut modal-->
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h4 class="modal-title">{{ $t('assigned_permissions') }}</h4>
                                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <div v-if="teacher.permissions.length >= 1" class="card-body table-responsive p-0">
                                                                    <table v-for="(permission, idper) in teacher.permissions" :key="idper" class="table table-hover text-nowrap" style="margin-bottom: 50px !important; border: 1px solid #dee2e6 !important;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>{{ $t('class') }}</td>
                                                                                <td>{{ permission.classe.name }}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>{{ $t('section') }}</td>
                                                                                <td>{{ permission.classe.sections[0].name }}</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>{{ $t('marks') }}</td>
                                                                                <td>
                                                                                    <i v-if="permission.marks" class="fa fa-circle text-success"></i>
                                                                                    <i v-else class="fa fa-circle text-danger"></i>
                                                                                </td>
                                                                            </tr>
                                                                            <!--<tr>
                                                                                <td>{{ $t('assignment') }}</td>
                                                                                <td>
                                                                                    <i v-if="permission.assignment" class="fa fa-circle text-success"></i>
                                                                                    <i v-else class="fa fa-circle text-danger"></i>
                                                                                </td>
                                                                            </tr>-->
                                                                            <tr>
                                                                                <td>{{ $t('attendance') }}</td>
                                                                                <td>
                                                                                    <i v-if="permission.attendance" class="fa fa-circle text-success"></i>
                                                                                    <i v-else class="fa fa-circle text-danger"></i>
                                                                                </td>
                                                                            </tr>
                                                                            <!--<tr>
                                                                                <td>{{ $t('online_exam') }}</td>
                                                                                <td>
                                                                                    <i v-if="permission.online_exam" class="fa fa-circle text-success"></i>
                                                                                    <i v-else class="fa fa-circle text-danger"></i>
                                                                                </td>
                                                                            </tr>-->
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div v-else>
                                                                    <router-link :to="{name: 'SuperAdminTeacherPermission' }" class="btn btn-info btn-block">{{ $t('update_permissions') }}</router-link>
                                                                </div>
                                                            </div>
                                                            <div class="modal-footer justify-content-between">
                                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
<!--                                                                <button type="button" class="btn btn-primary">Save changes</button>-->
                                                            </div>
                                                        </div>
                                                        <!-- /.modal-content -->
                                                    </div>
                                                    <!-- /.modal-dialog -->
                                                </div>
<!--                                                Fin modal-->

                                                <button v-if="!teacher.user.deleted_at" @click="confirmDisabledUser(teacher.user.id)" class="btn btn-danger mr-1">{{ $t('delete') }}</button>
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
        name: "Teacher",
        mounted() {
            this.axios.get("/superadmin/user?role=teacher")
                .then((response) => {
                    this.teachers = response.data.data;
                    setTimeout(() => {
                        $("#datatable").DataTable({
                            lengthMenu: [
                                [5,10, 25, 50, -1],
                                [5,10, 25, 50, "All"],
                            ],
                            pageLength: 5,
                        });
                    });
                });
        },
        data() {
            return {
                teachers: [],
            }
        },
        methods: {
            disabledUser(id){
                this.axios.delete("/superadmin/user/" + id)
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

                    this.$router.push({name: 'Refresh'})
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
            restoredUser(id){
                this.axios.put("/superadmin/user/restore/" + id)
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

                        this.$router.push({name: 'Refresh'})
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
            confirmDisabledUser(id){
                console.log(id)
                this.$swal({
                    title: this.$t('are_you_sure_2'),
                    text: this.$t('no_revert_action'),
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: this.$t('deactivate_id'),
                    cancelButtonText: this.$t('cancelled'),
                    showCloseButton: true,
                    showLoaderOnConfirm: true
                }).then((result) => {
                    if(result.value) {
                        this.disabledUser(id)
                    } else {
                        this.$swal('Cancelled', this.$t('not_delete_file'), 'info')
                    }
                })
            },
        }
    }
</script>

<style>

</style>