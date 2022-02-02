<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('students') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('students') }}</li>
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
                                <h3 class="card-title">{{ $t('students') }}</h3>
                                <router-link :to="{name: 'SuperAdminStudentSingleAdmission'}" style="float: right;" class="btn btn-primary">{{ $t('add_new_student') }}</router-link>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <class-section v-on:classSection="changerClasse($event)" ></class-section>
                                    </div>
                                    <div class="col-md-4" style="padding-top: 29px;">
                                        <button @click="getStudentWithClass" class="btn btn-block btn-secondary">{{ $t('filter') }}</button>
                                    </div>
                                </div>

                                <table id="datatable" class="table table-bordered table-striped">
                                    <thead>
                                    <tr>
                                        <th>{{ $t('code') }}</th>
                                        <th>{{ $t('photo') }}</th>
                                        <th>{{ $t('name') }}</th>
                                        <th>{{ $t('email') }}</th>
                                        <th>{{ $t('password') }}</th>
                                        <th>{{ $t('action') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="(student, id) in students" :key="id">
                                        <td>{{ student.matricule }}</td>
                                        <td>
                                            <img :src="student.user.image" :alt="student.user.name" width="40" />
                                        </td>
                                        <td>{{ student.user.name }}</td>
                                        <td>{{ student.user.email }}</td>
                                        <td>{{ student.user.code }}</td>
                                        <td>
                                            <button v-if="student.user.deleted_at" @click="restoredUser(student.user.id)" class="btn btn-outline-success mr-1">
                                                <i class="fa fa-recycle"></i>
                                            </button>
                                            <router-link v-if="!student.user.deleted_at" :to="{name: 'SuperAdminEditStudent', params: { id: student.id }}" class="btn btn-outline-primary mr-1">
                                                <i class="fa fa-edit"></i>
                                            </router-link>
                                            <button type="button" class="btn btn-outline-secondary mr-1" data-toggle="modal" :data-target="'#modal'+student.id">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <div class="modal fade" :id="'modal'+student.id">
                                                <div class="modal-dialog modal-lg">
                                                    <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h4 class="modal-title">{{ $t('profile') }}</h4>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <div class="row">
                                                                <div class="col-4">
                                                                    <img :src="student.user.image" :alt="student.user.name" width="70" />
                                                                    <div>
                                                                        <span>{{ $t('name') }}: {{ student.user.name }}</span><br/>
                                                                        <span>{{ $t('student_code') }}: {{ student.matricule }}</span>
                                                                    </div>
                                                                </div>
                                                                <div class="col-8">
                                                                <div class="card card-primary card-outline card-outline-tabs">
                                                                    <div class="card-header p-0 border-bottom-0">
                                                                        <ul class="nav nav-tabs" :id="'custom-tabs-four-tab'+student.id" role="tablist">
                                                                            <li class="nav-item">
                                                                                <a class="nav-link active" id="custom-tabs-four-home-tab" data-toggle="pill" :href="'#profile'+student.id" role="tab" aria-controls="custom-tabs-four-home" aria-selected="true">{{ $t('profile') }}</a>
                                                                            </li>
                                                                            <li class="nav-item">
                                                                                <a class="nav-link" id="custom-tabs-four-profile-tab" data-toggle="pill" :href="'#parent_info'+student.id" role="tab" aria-controls="custom-tabs-four-profile" aria-selected="false">{{ $t('parent_info') }}</a>
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                    <div class="card-body">
                                                                        <div class="tab-content" :id="'custom-tabs-four-tabContent'+student.id">
                                                                                    <div class="tab-pane fade show active" :id="'profile'+student.id" role="tabpanel" aria-labelledby="custom-tabs-four-home-tab">
                                                                                        <table class="table table-centered mb-0">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td style="font-weight: bold;">{{ $t('name') }}</td>
                                                                                                <td>{{ student.user.name }}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="font-weight: bold;">{{ $t('class') }}</td>
                                                                                                <td>{{ student.enrol[0].classes.name }}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="font-weight: bold;">{{ $t('section') }}</td>
                                                                                                <td>{{ student.enrol[0].section.name }}</td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                    <div class="tab-pane fade" :id="'parent_info'+student.id" role="tabpanel" aria-labelledby="custom-tabs-four-profile-tab">
                                                                                        <table class="table table-centered mb-0">
                                                                                            <tbody>
                                                                                            <tr>
                                                                                                <td style="font-weight: bold;">{{ $t('parent_name') }}</td>
                                                                                                <td>{{ student.parent.user.name }}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="font-weight: bold;">{{ $t('parent_email') }}</td>
                                                                                                <td>{{ student.parent.user.email }}</td>
                                                                                            </tr>
                                                                                            <tr>
                                                                                                <td style="font-weight: bold;">{{ $t('parent_phone_number') }}</td>
                                                                                                <td>{{ student.parent.user.phone }}</td>
                                                                                            </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                    </div>
                                                                    <!-- /.card -->
                                                                </div>
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div class="modal-footer justify-content-between">
                                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                    <!-- /.modal-content -->
                                                </div>
                                                <!-- /.modal-dialog -->
                                            </div>
                                            <!-- /.modal -->
                                            <button v-if="!student.user.deleted_at" @click="confirmDisabledUser(student.user.id)" class="btn btn-outline-dark mr-1">
                                                <i class="fa fa-trash"></i>
                                            </button>
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
    import classSection from '../../../components/select2/ClassSelect'

    export default {
        name: "Student",
        components: {
            classSection,
        },
        data() {
            return {
                students: null,
                classe: {
                    class_id: null,
                    section_id: null,
                },
            }
        },
        methods: {
            getStudentWithClass(){
                this.axios.get("/superadmin/user?role=student&class_id="+this.classe.class_id+"&section_id="+this.classe.section_id)
                    .then((response) => {
                        if ( $.fn.DataTable.isDataTable('#datatable') ) {
                            $('#datatable').DataTable().destroy();
                        }
                        this.students = response.data.data;
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
            changerClasse(classe) {
                this.classe = classe
            },
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

                        setTimeout(() => {
                            this.$router.push({name: 'Refresh'})
                        }, 5000)
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

<style scoped>

</style>