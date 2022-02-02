<template>
    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <router-link :to="{name: 'SuperAdminDashboard'}" class="brand-link">
            <img src="/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">Franck School</span>
        </router-link>

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <div class="image">
                    <img src="/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <a href="javascript:void(0);" class="d-block">{{ currentUser.user.name }}</a>
                </div>
            </div>

            <!-- SidebarSearch Form -->
            <div class="form-inline">
                <div class="input-group" data-widget="sidebar-search">
                    <input class="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search">
                    <div class="input-group-append">
                        <button class="btn btn-sidebar">
                            <i class="fas fa-search fa-fw"></i>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    <li class="nav-item">
                        <router-link :to="{name: 'SuperAdminDashboard'}" class="nav-link">
                            <i class="nav-icon fas fa-tachometer-alt"></i>
                            <p>
                                {{ $t('dashboard') }}
                            </p>
                        </router-link>
                    </li>

                    <li class="nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                            <i class="nav-icon fas fa-user"></i>
                            <p>
                                {{ $t('users') }}
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminAdminReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('admin') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminParentReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('parent') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminAccountantReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('accountant') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminLibrarianReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('librarian') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminTeacherReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('teacher') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminTeacherPermission'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('teacher_permission') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminAllStudents'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('student') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminStudentSingleAdmission'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('admission') }}</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <a href="javascript:void(0);" class="nav-link">
                            <i class="nav-icon fas fa-home"></i>
                            <p>
                                {{ $t('academic') }}
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminClassReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('class') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminClassRoomReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('class_room') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminDepartmentReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('department') }}</p>
                                </router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{name: 'SuperAdminSubjectReport'}" class="nav-link">
                                    <i class="far fa-circle nav-icon"></i>
                                    <p>{{ $t('subject') }}</p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
    export default {
        name: "Sidebar",
        computed: {
            currentUser() {
                return this.$store.state.auth.user;
            }
        },
        mounted() {
            if (!this.currentUser) {
                this.$router.push('/login');
            }
        }
    }
</script>

<style>

</style>