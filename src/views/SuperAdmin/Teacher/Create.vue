<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('create_teacher') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('create_teacher') }}</li>
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
                                <router-link :to="{name: 'SuperAdminTeacherReport'}" class="btn btn-primary">
                                    <i class=" fa fa-arrow-left"></i> {{ $t('return') }}
                                </router-link>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->

                            <!--<div v-if="errors" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i class="icon fas fa-ban"></i> {{ $t('errors') }}</h5>
                                <ul>
                                    <li v-for="(error, id) in errors" :key="id">{{ error[0] }}</li>
                                </ul>
                            </div>-->
                            <div v-if="errors.all().length > 0" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <ul>
                                    <li v-for="(error, id) in errors.all()" :key="id">{{ error }}</li>
                                </ul>
                            </div>
                            <form @submit.prevent="createTeacher">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="name">{{ $t('name') }}</label>
                                        <input type="text" v-validate="{ required: true, min: 3 }" class="form-control" id="name" name="name" v-model="form.name">
                                        <small class="form-text text-muted">{{ $t('provide_teacher_name') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">{{ $t('email') }}</label>
                                        <input type="email" v-validate="{ required: true, email: true }" class="form-control" id="email" name="email" v-model="form.email">
                                        <small class="form-text text-muted">{{ $t('provide_teacher_email') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">{{ $t('designation') }}</label>
                                        <input type="text" v-validate="{ required: true, min: 3 }" class="form-control" id="designation" name="designation" v-model="form.designation">
                                        <small class="form-text text-muted">{{ $t('provide_teacher_designation') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="name">{{ $t('department') }}</label>
                                        <v-select v-validate="{ required: true }" :options="departments" v-model="form.department_id" v-validate.continues="{ required: true }" name="department" ></v-select>
                                        <small class="form-text text-muted">{{ $t('provide_a_department') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">{{ $t('phone_number') }}</label>
                                        <input type="text" v-validate="{ required: true, digits: 9 }" :data-vv-as="$t('phone_number')" class="form-control" id="phone" name="phone" v-model="form.phone">
                                        <small class="form-text text-muted">{{ $t('provide_teacher_phone_number') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('gender') }}</label>
                                        <select v-validate="{ required: true}" :data-vv-as="$t('gender')" class="custom-select" name="gender" v-model="form.gender">
                                            <option value="">{{ $t('select_a_gender') }}</option>
                                            <option v-for="(gender, index) in genders" :key="index" :value="gender">{{ $t(gender) }}</option>
                                        </select>
                                        <small class="form-text text-muted">{{ $t('provide_admin_gender') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('blood_group') }}</label>
                                        <select v-validate="{ required: true}" :data-vv-as="$t('blood_group')" class="custom-select" name="blood_group" v-model="form.blood_group">
                                            <option value="">{{ $t('select_a_blood_group') }}</option>
                                            <option v-for="(blood, index) in blood_groups" :key="index" :value="blood">{{ blood }}</option>
                                        </select>
                                        <small class="form-text text-muted">{{ $t('select_a_blood_group') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('facebook_profile_link') }}</label>
                                        <input v-validate="{ required: true, url: {require_protocol: true }}" :data-vv-as="$t('facebook_profile_link')"  type="text" class="form-control" name="facebook_profile_link" v-model="form.facebook_link">
                                        <small class="form-text text-muted">{{ $t('facebook_profile_link') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('twitter_profile_link') }}</label>
                                        <input v-validate="{ required: true, url: {require_protocol: true }}" :data-vv-as="$t('twitter_profile_link')"  type="text" class="form-control" name="twitter_profile_link" v-model="form.twitter_link">
                                        <small class="form-text text-muted">{{ $t('twitter_profile_link') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('linkedin_profile_link') }}</label>
                                        <input v-validate="{ required: true, url: {require_protocol: true }}" :data-vv-as="$t('linkedin_profile_link')"  type="text" class="form-control" name="linkedin_profile_link" v-model="form.linkedin_link">
                                        <small class="form-text text-muted">{{ $t('linkedin_profile_link') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="address">{{ $t('address') }}</label>
                                        <textarea class="form-control" id="address" name="address" v-model="form.address"></textarea>
                                        <small class="form-text text-muted">{{ $t('provide_admin_address') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="address">{{ $t('about') }}</label>
                                        <textarea class="form-control" id="about" name="about" v-model="form.about"></textarea>
                                        <small class="form-text text-muted">{{ $t('about') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <div class="custom-file-container" data-upload-id="myFirstImage">
                                            <label>Upload (Single File) <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">x</a></label>
                                            <label class="custom-file-container__custom-file" >
                                                <input @change="imgScr($event)" type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*">
                                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                <span class="custom-file-container__custom-file__custom-file-control"></span>
                                            </label>
                                            <div class="custom-file-container__image-preview"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">{{ $t('create_teacher') }}</button>
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
    import FileUploadWithPreview from "file-upload-with-preview"
    import "file-upload-with-preview/dist/file-upload-with-preview.min.css"

    export default {
        name: "Create",
        data() {
            return {
                form: {
                    role: 'teacher',
                    name: null,
                    email: null,
                    phone: null,
                    gender: null,
                    blood_group: null,
                    address: null,
                    image: null,
                    about: null,
                    facebook_link: null,
                    twitter_link: null,
                    linkedin_link: null,
                    department_id: null,
                    designation: null,
                },
                blood_groups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                genders: ['male', 'female', 'others'],
                // errors: null,
                image: null,
                departments: [],
            }
        },
        mounted() {
            this.getDataDepartment()
            new FileUploadWithPreview('myFirstImage')
        },
        methods: {
            async createTeacher(){
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false
                        return
                    }

                    let formData = new FormData()
                    formData.append('role', 'teacher')
                    formData.append('name', this.form.name)
                    formData.append('email', this.form.email)
                    formData.append('phone', this.form.phone)
                    formData.append('gender', this.form.gender)
                    formData.append('blood_group', this.form.blood_group)
                    formData.append('address', this.form.address)
                    formData.append('image', this.image)
                    formData.append('about', this.form.about)
                    formData.append('facebook_link', this.form.facebook_link)
                    formData.append('twitter_link', this.form.twitter_link)
                    formData.append('linkedin_link', this.form.linkedin_link)
                    formData.append('department_id', this.form.department_id.id)
                    formData.append('designation', this.form.designation)
                    formData.append('show_on_website', '0')
                    this.axios.post('/superadmin/user', formData, {headers: {'Content-Type': 'multipart/form-data'}})
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
                            /*if (error.response.data.success === false)
                            {
                                this.errors = error.response.data.message
                            }*/
                        })
                })
            },
            imgScr(event) {
                this.image = event.target.files[0]
            },
            async getDataDepartment() {
                this.axios.get("/superadmin/crud?getData=department_for_select")
                    .then((response) => {
                        this.departments = response.data.data
                    })
            },
        },
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