<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('student_admission_form') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('student_admission_form') }}</li>
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
                        <div class="card card-primary card-outline card-outline-tabs">
                            <div v-if="errors.all().length > 0" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <ul>
                                    <li v-for="(error, id) in errors.all()" :key="id">{{ error }}</li>
                                </ul>
                            </div>
                            <div v-if="errors_n" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <ul>
                                    <li v-for="(error_n, id_n) in errors_n" :key="id_n">{{ $t(error_n[0]) }}</li>
                                </ul>
                            </div>
                            <div class="card-header p-0 border-bottom-0">
                                <ul class="nav nav-tabs" id="custom-tabs-four-tab" role="tablist">
                                    <li class="nav-item">
                                        <router-link class="nav-link" :to="{name: 'SuperAdminStudentSingleAdmission'}">{{ $t('single_student_admission') }}</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link active" :to="{name: 'SuperAdminStudentBulkAdmission'}">{{ $t('bulk_student_admission') }}</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link" :to="{name: 'SuperAdminStudentExcelAdmission'}">{{ $t('excel_upload') }}</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-four-tabContent">
                                    <div class="tab-pane fade show active">
                                        <form @submit.prevent="admintBulkStudent">
                                            <class-section v-on:classSection="changerClasse($event)" ></class-section>
                                            <div v-for="(user, index) in form" :key="index" class="row">
                                                <div class="col-md-3 form-group">
                                                    <input v-validate="{ required: true}"  type="text" class="form-control" name="name" v-model="user.name">
                                                </div>
                                                <div class="col-md-3 form-group">
                                                    <input v-validate="{ required: true, email:true }"  type="email" class="form-control" name="email" v-model="user.email">
                                                </div>
                                                <div class="col-md-2 form-group">
                                                    <select v-validate="{ required: true}" :data-vv-as="$t('gender')" class="custom-select" name="gender" v-model="user.gender">
                                                        <option value="">{{ $t('select_a_gender') }}</option>
                                                        <option v-for="(gender, index) in genders" :key="index" :value="gender">{{ $t(gender) }}</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-3 form-group">
                                                    <v-select :options="parents_select" v-model="user.parent" v-validate.continues="{ required: true }" name="parent" ></v-select>
                                                </div>
                                                <div v-if="index===0" class="col-md-1 form-group">
                                                    <button type="button" @click="addStudent" class="btn btn-primary"><i class="fa fa-plus"></i></button>
                                                </div>
                                                <div v-if="index!==0" class="col-md-1 form-group">
                                                    <button type="button" @click="removeStudent(index)" class="btn btn-danger"><i class="fa fa-times"></i></button>
                                                </div>
                                            </div>
                                            <button type="submit" class="btn btn-secondary">{{ $t('add_students') }}</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <!-- /.card -->
                        </div>
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
        </div>
    </div>
</template>

<script>
    import classSection from '../../../components/select2/ClassSelect'

    export default {
        name: "BulkStudentAdmission",
        components: {
            classSection,
        },
        data() {
          return {
              form: [
                  {
                      name: null,
                      email: null,
                      gender: null,
                      parent: null,
                  },
              ],
              parent: null,
              parents_select: [],
              // blood_groups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
              genders: ['male', 'female', 'others'],
              errors_n: null,
              classe: {
                  class_id: null,
                  section_id: null,
              },
          }
        },
        mounted() {
            this.getDataParentForSelect()
        },
        methods: {
            async getDataParentForSelect() {
                this.axios.get("/superadmin/crud?getData=parent_for_select")
                    .then((response) => {
                        this.parents_select = response.data.data
                    })
            },
            changerClasse(classe) {
                this.classe = classe
            },
            addStudent(){
                let stud = {
                        name: null,
                        email: null,
                        gender: null,
                        parent: null,
                    };
                this.form.push(stud)
            },
            removeStudent(index){
                this.form.splice(index, 1)
            },
            admintBulkStudent() {
                console.log(this.form)
                this.errors_n = null
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false
                        return
                    }

                    /*let formData = new FormData()
                    formData.append('role', 'student')
                    formData.append('method', 'bulk')*/
                    let form = {
                        role: 'student',
                        method: 'bulk',
                        class_id: this.classe.class_id,
                        section_id: this.classe.section_id,
                        students: (this.form),
                    }
                    this.axios.post('/superadmin/user', form)
                    // this.axios.post('/superadmin/user', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then((response) => {
                            console.log(response.data.data.notification)
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
                            // this.errors = null
                        })
                        .catch((error) => {
                            console.log(error.response.data)
                            if (error.response.data.success === false)
                            {
                                this.errors_n = error.response.data.message
                            }
                        })
                })
            }
        }
    }
</script>

<style scoped>

</style>