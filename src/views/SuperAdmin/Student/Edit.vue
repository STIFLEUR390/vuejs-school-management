<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('student_update_form') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('student_update_form') }}</li>
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
                                <router-link :to="{name: 'SuperAdminAllStudents'}" class="btn btn-primary">
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
                            <div v-if="errors_n" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <ul>
                                    <li v-for="(error_n, id_n) in errors_n" :key="id_n">{{ $t(error_n[0]) }}</li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <form @submit.prevent="updateStudent">
                                <div class="form-group">
                                    <label for="name">{{ $t('name') }}</label>
                                    <input type="text" :name="$t('name')" v-validate.continues="{ required: true, min: 3 }" class="form-control" id="name" v-model="student.user.name">
                                    <!--                                                <small class="form-text text-muted">{{ $t('provide_subject_name') }}</small>-->
                                </div>
                                <div class="form-group">
                                    <label for="email">{{ $t('email') }}</label>
                                    <input type="text" :name="$t('email')" v-validate.continues="{ required: true, min: 3, email:true }" class="form-control" id="email" v-model="student.user.email">
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('parent') }}</label>
                                    <v-select :options="parents_select" v-model="parent" v-validate.continues="{ required: true }" name="parent" ></v-select>
                                    <small class="form-text text-muted">{{ $t('select_a_parent') }}</small>
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('class') }}</label>
                                    <v-select :options="classes" @input="searchSection" v-model="class_id" v-validate.continues="{ required: true }" name="classe" ></v-select>
                                    <small class="form-text text-muted">{{ $t('select_a_class') }}</small>
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('section') }}</label>
                                    <v-select :options="sections" v-model="section_id" v-validate.continues="{ required: true }" name="section" ></v-select>
                                    <small class="form-text text-muted">{{ $t('select_section') }}</small>
                                </div>
                                <div class="form-group">
                                    <label for="email">{{ $t('birthday') }}</label>
                                    <input type="date" :name="$t('birthday')" v-validate.continues="{ required: true }" class="form-control" id="birthday" v-model="student.user.birthday">
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('gender') }}</label>
                                    <select v-validate="{ required: true}" :data-vv-as="$t('gender')" class="custom-select" name="gender" v-model="student.user.gender">
                                        <option value="">{{ $t('select_a_gender') }}</option>
                                        <option v-for="(gender, index) in genders" :key="index" :value="gender">{{ $t(gender) }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label>{{ $t('blood_group') }}</label>
                                    <select v-validate="{ required: true}" :data-vv-as="$t('blood_group')" class="custom-select" name="blood_group" v-model="student.user.blood_group">
                                        <option value="">{{ $t('select_a_blood_group') }}</option>
                                        <option v-for="(blood, index) in blood_groups" :key="index" :value="blood">{{ blood }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="address">{{ $t('address') }}</label>
                                    <textarea class="form-control" id="address" name="address" v-model="student.user.address"></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="phone">{{ $t('phone') }}</label>
                                    <input type="text" v-validate="{ required: true, digits: 9 }" :data-vv-as="$t('phone')" class="form-control" id="phone" name="phone" v-model="student.user.phone">
                                </div>
                                    <div class="form-check">
                                        <input type="checkbox" v-model="change" class="form-check-input" id="exampleCheck1">
                                        <label class="form-check-label" for="exampleCheck1">{{ $t('change_profile_picture') }}</label>
                                    </div>
                                    <div v-show="!change" class="form-group">
                                        <img :src="student.user.image" :alt="student.user.name" width="100">
                                    </div>
                                    <div v-show="change" class="form-group">
                                    <div class="custom-file-container" data-upload-id="myFirstImage">
                                        <label>{{ $t('student_profile_image') }} <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">x</a></label>
                                        <label class="custom-file-container__custom-file" >
                                            <input @change="imgScr($event)" type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*">
                                            <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                            <span class="custom-file-container__custom-file__custom-file-control"></span>
                                        </label>
                                        <div class="custom-file-container__image-preview"></div>
                                    </div>
                                </div>

                                <button type="submit" class="btn btn-primary">{{ $t('update_student_information') }}</button>
                            </form>
                            </div>
                        </div>
                    </div>
                    <!-- /.row -->
                </div><!-- /.container-fluid -->
            </div>
        </div>
    </div>
</template>

<script>
    import FileUploadWithPreview from "file-upload-with-preview"
    import "file-upload-with-preview/dist/file-upload-with-preview.min.css"

    export default {
        name: "Edit",
        data() {
            return {
                student: null,
                parent: null,
                parents_select: [],
                classes: [],
                class_id: null,
                sections: [],
                section_id: null,
                blood_groups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                genders: ['male', 'female', 'others'],
                errors_n: null,
                image: null,
                change: false,
            }
        },
        mounted() {
            this.getDataClassForSelect()
            this.getDataParentForSelect()
            this.getStudent()
            setTimeout(() => {
                new FileUploadWithPreview('myFirstImage')
            }, 5000)
        },
        methods: {

            async getStudent(){
                this.axios.get('/superadmin/user/'+this.$route.params.id+'?role=student')
                    .then((response) => {
                        this.student = response.data.data

                        this.parent = {
                            id: response.data.data.parent.user.id,
                            label: response.data.data.parent.user.name,
                        }

                        this.class_id = {
                            id: response.data.data.enrol[0].classes.id,
                            label: response.data.data.enrol[0].classes.name
                        }

                        this.searchSection()
                        setTimeout(() => {
                            this.section_id = {
                                id: response.data.data.enrol[0].section.id,
                                label:response.data.data.enrol[0].section.name
                            }
                        }, 1000)
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
            async getDataClassForSelect() {
                this.axios.get("/superadmin/crud?getData=class_for_select")
                    .then((response) => {
                        this.classes = response.data.data
                    })
            },
            async searchSection() {
                this.sections = []
                this.section_id = null
                this.axios.get("/superadmin/crud?getData=section_for_select&class_id="+ this.class_id.id)
                    .then((response) => {
                        this.sections = response.data.data
                    })
            },
            async getDataParentForSelect() {
                this.axios.get("/superadmin/crud?getData=parent_for_select")
                    .then((response) => {
                        this.parents_select = response.data.data
                    })
            },
            imgScr(event) {
                this.image = event.target.files[0]
            },
            async updateStudent(){
                this.errors_n = null
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false
                        return
                    }

                    let formData = new FormData()
                    formData.append('role', 'student')
                    if (this.change) {
                        formData.append('image', this.image)
                    }
                    formData.append('name', this.student.user.name)
                    formData.append('email', this.student.user.email)
                    formData.append('birthday', this.student.user.birthday)
                    formData.append('gender', this.student.user.gender)
                    formData.append('blood_group', this.student.user.blood_group)
                    formData.append('address', this.student.user.address)
                    formData.append('phone', this.student.user.phone)
                    formData.append('parent_id', this.parent.id)
                    formData.append('class_id', this.class_id.id)
                    formData.append('section_id', this.section_id.id)
                    formData.append('student_id', this.$route.params.id)
                    formData.append('enrol_id', this.student.enrol[0].id)
                    formData.append('user_id', this.student.user.id)


                    this.axios.post('/superadmin/user/'+this.$route.params.id+'?_method=PUT', formData, {headers: {'Content-Type': 'multipart/form-data'}})
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
                        })
                        .catch((error) => {
                            console.log(error.response.data)
                            /*if (error.response.data.success === false)
                            {
                                this.errors = error.response.data.message
                            }*/
                        })
                })
            }
        }
    }
</script>

<style>
    .custom-file-container {
        box-sizing: border-box;
        position: relative;
        display: block;
    }

    .custom-file-container label {
        color: #4361ee;
    }

    .custom-file-container label .custom-file-container__image-clear {
        color: #3b3f5c;
    }

    .custom-file-container__custom-file {
        box-sizing: border-box;
        position: relative;
        display: inline-block;
        width: 100%;
        height: calc(2.25rem + 2px);
        margin-bottom: 0;
        margin-top: 5px;
    }

    .custom-file-container__custom-file:hover {
        cursor: pointer;
    }

    .custom-file-container__custom-file__custom-file-input {
        box-sizing: border-box;
        min-width: 14rem;
        max-width: 100%;
        height: calc(2.25rem + 2px);
        margin: 0;
        opacity: 0;
    }

    .custom-file-container__custom-file__custom-file-input:focus ~ span {
        outline: 1px dotted #515365;
        outline: 5px auto -webkit-focus-ring-color;
    }

    .custom-file-container__custom-file__custom-file-control {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        z-index: 5;
        height: auto;
        overflow: hidden;
        line-height: 1.5;
        user-select: none;
        background-clip: padding-box;
        border-radius: .25rem;
        height: auto;
        border: 1px solid #f1f2f3;
        color: #3b3f5c;
        font-size: 15px;
        padding: 8px 10px;
        letter-spacing: 1px;
        background-color: #f1f2f3;
    }

    .custom-file-container__custom-file__custom-file-control__button {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        z-index: 6;
        display: block;
        height: auto;
        padding: 10px 16px;
        line-height: 1.25;
        background-color: rgba(27, 85, 226, 0.239216);
        color: #4361ee;
        border-left: 1px solid #e0e6ed;
        box-sizing: border-box;
    }

    .custom-file-container__image-preview {
        box-sizing: border-box;
        transition: all 0.2s ease;
        margin-top: 54px;
        margin-bottom: 40px;
        height: 250px;
        width: 100%;
        border-radius: 4px;
        background-size: contain;
        background-position: center center;
        background-repeat: no-repeat;
        background-color: #fff;
        overflow: auto;
        padding: 15px;
    }

    .custom-file-container__image-multi-preview {
        position: relative;
        box-sizing: border-box;
        transition: all 0.2s ease;
        border-radius: 6px;
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
        float: left;
        margin: 1.858736%;
        width: 29.615861214%;
        height: 90px;
        box-shadow: 0 4px 10px 0 rgba(51, 51, 51, 0.25);
    }

    .custom-file-container__image-multi-preview__single-image-clear {
        left: -6px;
        background: #ffffff;
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        text-align: center;
        margin-top: -6px;
        box-shadow: 0 4px 10px 0 rgba(51, 51, 51, 0.25);
    }

    .custom-file-container__image-multi-preview__single-image-clear:hover {
        background: #cbcbbd;
        cursor: pointer;
    }

    .custom-file-container__image-multi-preview__single-image-clear__icon {
        color: #4361ee;
        display: block;
        margin-top: -2px;
    }
</style>