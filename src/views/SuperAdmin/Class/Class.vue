<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('all_class') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('all_class') }}</li>
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
                                <h3 class="card-title">{{ $t('all_class') }}</h3>
                                <router-link :to="{name: 'SuperAdminClassCreate'}" style="float: right;" class="btn btn-primary">{{ $t('add_class') }}</router-link>
                            </div>
                            <div class="card-body">
                                <table id="datatable" class="table table-bordered table-striped">
                                    <thead>
                                        <tr>
                                            <th>{{ $t('id') }}</th>
                                            <th>{{ $t('name') }}</th>
                                            <th>{{ $t('section') }}</th>
                                            <th width="35%">{{ $t('action') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(classe, id) in classes" :key="id">
                                            <td>{{ id + 1 }}</td>
                                            <td>{{ classe.name }}</td>
                                            <td>
                                                <ul>
                                                    <li v-for="session in classe.sections" :key="session.id">{{ session.name }}</li>
                                                </ul>
                                            </td>
                                            <td>
                                                <router-link :to="{name: 'SuperAdminClassEdit', params: { id: classe.id }}" class="btn btn-primary mr-3">
                                                    {{ $t('edit')}}
                                                </router-link>
                                                <router-link :to="{name: 'SuperAdminClassSession', params: { id: classe.id }}" class="btn btn-info mr-3">{{ $t('section') }}</router-link>
                                                <button @click="confirmDeleteClass(classe.id)" class="btn btn-danger mr-3">{{ $t('delete') }}</button>
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
        name: "Class",
        mounted() {
            this.axios.get("/superadmin/crud?getData=class")
                .then((response) => {
                    this.classes = response.data.data;
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
                classes: [],
            }
        },
        methods: {
            deleteClass(id){
                this.axios.delete("/superadmin/crud/"+id+"?getData=class")
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
            confirmDeleteClass(id){
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
                        this.deleteClass(id)
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