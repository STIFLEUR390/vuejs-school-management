<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('assigned_permission_for_teacher') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('assigned_permission_for_teacher') }}</li>
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
                                <h3 class="card-title">{{ $t('assigned_permission_for_teacher') }}</h3>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <class-section v-on:classSection="changerClasse($event)" ></class-section>
                                    </div>
                                    <div class="col-md-4" style="padding-top: 29px;">
                                        <button @click="getTeacherPermission" class="btn btn-block btn-secondary">{{ $t('filter') }}</button>
                                    </div>
                                </div>

                                <div v-if="teachers.length >=1" class="card-body table-responsive p-0">
                                    <table class="table table-hover text-nowrap" style="border: 1px solid #dee2e6 !important;">
                                        <thead>
                                            <tr style="background-color: #313a46; color: #ababab;">
                                                <th>{{ $t('teacher') }}</th>
                                                <th>{{ $t('marks') }}</th>
                                                <th>{{ $t('assignment') }}</th>
                                                <th>{{ $t('attendance') }}</th>
                                                <th>{{ $t('online_exam') }}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="(teacher, id) in teachers" :key="id">
                                                <td>{{ teacher.user.name }}</td>
                                                <td v-if="teacher.permissions.length >=1">{{ teacher.user.name }}</td>
                                                <td v-if="teacher.permissions.length >=1">{{ teacher.user.name }}</td>
                                                <td v-if="teacher.permissions.length >=1">{{ teacher.user.name }}</td>
                                                <td v-if="teacher.permissions.length >=1">{{ teacher.user.name }}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
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
    import 'admin-lte/plugins/jquery/jquery'
    import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
    import 'admin-lte/plugins/sweetalert2/sweetalert2'
    import $ from "jquery"

    import classSection from '../../../components/select2/ClassSelect'

    export default {
        name: "Permission",
        components: {
            classSection,
        },
        data() {
            return {
                classe: {
                    class_id: null,
                    section_id: null,
                },
                teachers: [],
                templatePermission: {
                    marks: 0,
                    assignment: 0,
                    attendance: 0,
                    online_exam:0,
                }
            }
        },
        methods: {
            changerClasse(classe) {
                this.classe = classe
            },
            getTeacherPermission(){
                this.axios.get("/superadmin/crud?getData=all_teacher_permissions&class_id="+ this.classe.class_id+"&section_id="+this.classe.section_id)
                    .then((response) => {
                        this.teachers = response.data.data
                        this.assignValue()
                    })
                    .catch(() => {
                        $(document).Toasts('create', {
                            class: 'bg-danger',
                            title: this.$t('error'),
                            // subtitle: 'Subtitle',
                            autohide: true,
                            delay: 3000,
                            body: this.$t('please_select_a_class_and_section'),
                            // icon: "fas fa-envelope fa-lg"
                        })
                    })
            },
            assignValue(){
                let length = this.teachers.length
                console.log(length)
                for (let i = 0; i <length ; i++) {
                    console.log(this.teachers[i].permissions.length)
                    if (this.teachers[i].permissions.length < 1){
                        this.teachers[i].permissions[0] = this.templatePermission
                    }
                }
            },
        },
    }
</script>

<style scoped>

</style>