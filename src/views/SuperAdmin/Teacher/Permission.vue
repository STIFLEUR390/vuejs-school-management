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
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>{{ $t('select_a_class') }}</label>
                                            <v-select :options="classes_select" @input="searchSection" v-model="class_id"></v-select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label>{{ $t('select_a_section') }}</label>
                                            <v-select :options="section_select" v-model="section_id"></v-select>
                                        </div>
                                    </div>
                                    <div class="col-md-4" style="padding-top: 33px;">
                                        <button class="btn btn-block btn-secondary">{{ $t('filter') }}</button>
                                    </div>
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
    /*import 'admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css'
    import 'admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css'
    import 'admin-lte/plugins/jquery/jquery'
    import 'admin-lte/plugins/bootstrap/js/bootstrap.bundle'
    import 'admin-lte/plugins/datatables/jquery.dataTables'
    import 'admin-lte/plugins/datatables-bs4/js/dataTables.bootstrap4'
    import 'admin-lte/plugins/datatables-responsive/js/dataTables.responsive'
    import 'admin-lte/plugins/datatables-responsive/js/responsive.bootstrap4'
    import $ from "jquery"*/

    export default {
        name: "Permission",
        data() {
            return {
                // classes: [],
                classes_select: [],
                section_select: [],
                class_id: null,
                section_id: null
            }
        },
        mounted() {
            // this.getDataClass()
            this.getDataClassForSelect()
        },
        methods: {
            /*async getDataClass() {
                this.axios.get("/superadmin/crud?getData=class")
                    .then((response) => {
                        this.classes = response.data.data
                    })
            },*/
            async getDataClassForSelect() {
                this.axios.get("/superadmin/crud?getData=class_for_select")
                    .then((response) => {
                        this.classes_select = response.data.data
                    })
            },
            async searchSection() {
                this.section_select = []
                this.section_id = null
                this.axios.get("/superadmin/crud?getData=section_for_select&class_id="+ this.class_id.id)
                    .then((response) => {
                        this.section_select = response.data.data
                    })
            }
        },
    }
</script>

<style scoped>

</style>