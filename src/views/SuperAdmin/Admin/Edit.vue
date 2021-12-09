<template>
    <div>
        <!-- Content Header (Page header) -->
        <div class="content-header">
            <div class="container-fluid">
                <div class="row mb-2">
                    <div class="col-sm-6">
                        <h1 class="m-0">{{ $t('update_admin') }}</h1>
                    </div><!-- /.col -->
                    <div class="col-sm-6">
                        <ol class="breadcrumb float-sm-right">
                            <li class="breadcrumb-item">
                                <router-link :to="{name: 'SuperAdminDashboard'}">{{ $t('home') }}</router-link>
                            </li>
                            <li class="breadcrumb-item active">{{ $t('update_admin') }}</li>
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
                                <router-link :to="{name: 'SuperAdminAdminReport'}" class="btn btn-primary">
                                    <i class=" fa fa-arrow-left"></i> {{ $t('return') }}
                                </router-link>
                            </div>
                            <!-- /.card-header -->
                            <!-- form start -->

                            <div v-if="errors" class="alert alert-danger alert-dismissible mx-2 my-2">
                                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>
                                <h5><i class="icon fas fa-ban"></i> {{ $t('errors') }}</h5>
                                <ul>
                                    <li v-for="(error, id) in errors" :key="id">{{ error[0] }}</li>
                                </ul>
                            </div>
                            <form @submit.prevent="updatedAdmin">
                                <div class="card-body">
                                    <div class="form-group">
                                        <label for="name">{{ $t('name') }}</label>
                                        <input type="text" class="form-control" id="name" name="name" v-model="form.name">
                                        <small class="form-text text-muted">{{ $t('provide_admin_name') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="email">{{ $t('email') }}</label>
                                        <input type="email" class="form-control" id="email" name="email" v-model="form.email">
                                        <small class="form-text text-muted">{{ $t('provide_admin_email') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="phone">{{ $t('phone_number') }}</label>
                                        <input type="text" class="form-control" id="phone" name="phone" v-model="form.phone">
                                        <small class="form-text text-muted">{{ $t('provide_admin_phone_number') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('gender') }}</label>
                                        <select class="custom-select" name="gender" v-model="form.gender">
                                            <option value="">{{ $t('select_a_gender') }}</option>
                                            <option v-for="(gender, index) in genders" :key="index" :value="gender">{{ $t(gender) }}</option>
                                        </select>
                                        <small class="form-text text-muted">{{ $t('provide_admin_gender') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label>{{ $t('blood_group') }}</label>
                                        <select class="custom-select" name="blood_group" v-model="form.blood_group">
                                            <option value="">{{ $t('select_a_blood_group') }}</option>
                                            <option v-for="(blood, index) in blood_groups" :key="index" :value="blood">{{ blood }}</option>
                                        </select>
                                        <small class="form-text text-muted">{{ $t('select_a_blood_group') }}</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="address">{{ $t('address') }}</label>
                                        <textarea class="form-control" id="address" name="address" v-model="form.address"></textarea>
                                        <small id="" class="form-text text-muted">{{ $t('provide_admin_address') }}</small>
                                    </div>
                                    <div class="form-check">
                                        <input type="checkbox" v-model="change" class="form-check-input" id="exampleCheck1">
                                        <label class="form-check-label" for="exampleCheck1">{{ $t('change_profile_picture') }}</label>
                                    </div>
                                    <div v-show="!change" class="form-group">
                                        <img :src="form.image" :alt="form.name" width="100">
                                    </div>
                                    <div v-show="change" class="form-group">
                                        <div class="custom-file-container" data-upload-id="myUniqueUploadId">
                                            <label>Upload File<a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">&times;</a></label>
                                            <label class="custom-file-container__custom-file">
                                                <input @change="imgScr($event)" type="file" class="custom-file-container__custom-file__custom-file-input" accept="image/*" aria-label="Choose File"/>
                                                <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                <span class="custom-file-container__custom-file__custom-file-control"></span>
                                            </label>
                                            <div class="custom-file-container__image-preview"></div>
                                        </div>
                                    </div>
                                </div>
                                <!-- /.card-body -->

                                <div class="card-footer">
                                    <button type="submit" class="btn btn-primary">{{ $t('update_admin') }}</button>
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
                form: {},
                blood_groups: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
                genders: ['male', 'female', 'others'],
                errors: null,
                image: null,
                change: false,
            }
        },
        mounted() {
            this.getUser()
            new FileUploadWithPreview("myUniqueUploadId")
        },
        methods: {
            async updatedAdmin(){
                let formData = new FormData()
                if (this.change){
                    formData.append('image', this.image)
                }
                formData.append('name', this.form.name)
                formData.append('email', this.form.email)
                formData.append('phone', this.form.phone)
                formData.append('gender', this.form.gender)
                formData.append('blood_group', this.form.blood_group)
                formData.append('address', this.form.address)
                formData.append('role', 'admin')
                this.axios.post('/superadmin/user/'+this.$route.params.id+'?_method=PUT', formData, {headers: {'Content-Type': 'multipart/form-data'}})
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
                    this.errors = null
                })
                .catch((error) => {
                    console.log(error.response.data)
                    if (error.response.data.success === false)
                    {
                        this.errors = error.response.data.message
                    }
                })
            },
            async getUser(){
                this.axios.get('/superadmin/user/'+this.$route.params.id)
                    .then((response) => {
                        console.log(response.data)
                        this.form = response.data.data
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
            imgScr(event) {
                this.image = event.target.files[0]
            }
        },
    }
</script>

<style scoped>

</style>