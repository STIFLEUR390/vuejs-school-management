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
                                        <router-link class="nav-link" :to="{name: 'SuperAdminStudentBulkAdmission'}">{{ $t('bulk_student_admission') }}</router-link>
                                    </li>
                                    <li class="nav-item">
                                        <router-link class="nav-link active" :to="{name: 'SuperAdminStudentExcelAdmission'}">{{ $t('excel_upload') }}</router-link>
                                    </li>
                                </ul>
                            </div>
                            <div class="card-body">
                                <div class="tab-content" id="custom-tabs-four-tabContent">
                                    <div class="tab-pane fade show active">
                                        <form @submit.prevent="excelBulkStudent">
                                            <class-section v-on:classSection="changerClasse($event)" ></class-section>
                                            <a v-if="$i18n.locale==='fr'" target="_blank" class="btn btn-dark btn-sm mb-1" :href="link.fr">{{ $t('generate_csv_file') }}</a>
                                            <a v-else target="_blank" class="btn btn-dark btn-sm mb-1" :href="link.en">{{ $t('generate_csv_file') }}</a>
                                            <div class="form-group mt-4">
                                                <div class="custom-file-container" data-upload-id="myFirstImage">
                                                    <label>{{ $t('upload') }} EXCEL <a href="javascript:void(0)" class="custom-file-container__image-clear" title="Clear Image">x</a></label>
                                                    <label class="custom-file-container__custom-file" >
                                                        <input @change="imgScr($event)" type="file" class="custom-file-container__custom-file__custom-file-input" accept="xls,xlsx">
                                                        <input type="hidden" name="MAX_FILE_SIZE" value="10485760" />
                                                        <span class="custom-file-container__custom-file__custom-file-control"></span>
                                                    </label>
                                                    <div class="custom-file-container__image-preview"></div>
                                                </div>
                                            </div>

                                            <button type="submit" class="btn btn-primary">{{ $t('add_students') }}</button>
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
    import FileUploadWithPreview from "file-upload-with-preview"
    import "file-upload-with-preview/dist/file-upload-with-preview.min.css"

    export default {
        name: "ExcelStudentAdmission",
        components: {
            classSection,
        },
        data(){
            return{
                classe: {
                    class_id: null,
                    section_id: null,
                },
                excel: null,
                errors_n: null,
                link: null,
            }
        },
        mounted() {
            this.getExcelLink()
            new FileUploadWithPreview('myFirstImage')
        },
        methods: {
            changerClasse(classe) {
                this.classe = classe
            },
            imgScr(event) {
                this.excel = event.target.files[0]
            },
            excelBulkStudent(){
                this.errors_n = null
                this.$validator.validateAll().then(isValid => {
                    if (!isValid) {
                        this.loading = false
                        return
                    }

                    let formData = new FormData()
                    formData.append('role', 'student');
                    formData.append('method', 'excel');
                    formData.append('class_id', this.classe.class_id);
                    formData.append('section_id', this.classe.section_id);
                    formData.append('excel', this.excel);

                    this.axios.post('/superadmin/user', formData, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then((response) => {
                            console.log(response.data.data.notification)
                            this.$swal({
                                toast: true,
                                // icon: 'success',
                                icon: response.data.data.code,
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
            },
            getExcelLink(){
                this.errors_n = null
                this.axios.get('/superadmin/student/student-excel')
                    .then((response) => {
                        this.link = response.data.data.notification
                    })
                    .catch((error) => {
                        console.log(error.response.data)
                        if (error.response.data.success === false)
                        {
                            this.errors_n = error.response.data.message
                        }
                    })
            }
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