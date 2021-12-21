import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import SuperAdminLayout from '../views/SuperAdmin/layout.vue'

Vue.use(VueRouter)

const routes = [
  /*{
    path: '/',
    name: 'Home',
    component: Home,
  },*/
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/refresh',
    name: 'Refresh',
    component: () => import('../views/Refresh')
  },
  {
    path: '/superadmin',
    component: SuperAdminLayout,
    children: [
      {
        path: '/superadmin/dashboard',
        name: 'SuperAdminDashboard',
        component: () => import('../views/SuperAdmin/Dashboard')
      },
      {
        path: '/superadmin/users/admin',
        name: 'SuperAdminAdminReport',
        component: () => import('../views/SuperAdmin/Admin/Admin')
      },
      {
        path: '/superadmin/users/admin/create',
        name: 'SuperAdminAdminCreate',
        component: () => import('../views/SuperAdmin/Admin/Create')
      },
      {
        path: '/superadmin/users/admin/:id/edit',
        name: 'SuperAdminAdminEdit',
        component: () => import('../views/SuperAdmin/Admin/Edit')
      },
      {
        path: '/superadmin/users/parent',
        name: 'SuperAdminParentReport',
        component: () => import('../views/SuperAdmin/Parent/Parent')
      },
      {
        path: '/superadmin/users/parent/create',
        name: 'SuperAdminParentCreate',
        component: () => import('../views/SuperAdmin/Parent/Create')
      },
      {
        path: '/superadmin/users/parent/:id/edit',
        name: 'SuperAdminParentEdit',
        component: () => import('../views/SuperAdmin/Parent/Edit')
      },
      {
        path: '/superadmin/users/accountant',
        name: 'SuperAdminAccountantReport',
        component: () => import('../views/SuperAdmin/Accountant/Accountant')
      },
      {
        path: '/superadmin/users/accountant/create',
        name: 'SuperAdminAccountantCreate',
        component: () => import('../views/SuperAdmin/Accountant/Create')
      },
      {
        path: '/superadmin/users/accountant/:id/edit',
        name: 'SuperAdminAccountantEdit',
        component: () => import('../views/SuperAdmin/Accountant/Edit')
      },
      {
        path: '/superadmin/users/librarian',
        name: 'SuperAdminLibrarianReport',
        component: () => import('../views/SuperAdmin/Librarian/Librarian')
      },
      {
        path: '/superadmin/users/librarian/create',
        name: 'SuperAdminLibrarianCreate',
        component: () => import('../views/SuperAdmin/Librarian/Create')
      },
      {
        path: '/superadmin/users/librarian/:id/edit',
        name: 'SuperAdminLibrarianEdit',
        component: () => import('../views/SuperAdmin/Librarian/Edit')
      },
      {
        path: '/superadmin/manage/class',
        name: 'SuperAdminClassReport',
        component: () => import('../views/SuperAdmin/Class/Class')
      },
      {
        path: '/superadmin/manage/class/create',
        name: 'SuperAdminClassCreate',
        component: () => import('../views/SuperAdmin/Class/Create')
      },
      {
        path: '/superadmin/manage/class/:id/edit',
        name: 'SuperAdminClassEdit',
        component: () => import('../views/SuperAdmin/Class/Edit')
      },
      {
        path: '/superadmin/manage/class_session/:id/edit',
        name: 'SuperAdminClassSession',
        component: () => import('../views/SuperAdmin/Class/Section')
      },
      {
        path: '/superadmin/manage/classroom',
        name: 'SuperAdminClassRoomReport',
        component: () => import('../views/SuperAdmin/ClassRoom/ClassRoom')
      },
      {
        path: '/superadmin/manage/classroom/create',
        name: 'SuperAdminClassRoomCreate',
        component: () => import('../views/SuperAdmin/ClassRoom/Create')
      },
      {
        path: '/superadmin/manage/classroom/:id/edit',
        name: 'SuperAdminClassRoomEdit',
        component: () => import('../views/SuperAdmin/ClassRoom/Edit')
      },
      {
        path: '/superadmin/manage/department',
        name: 'SuperAdminDepartmentReport',
        component: () => import('../views/SuperAdmin/Department/Department')
      },
      {
        path: '/superadmin/manage/department/create',
        name: 'SuperAdminDepartmentCreate',
        component: () => import('../views/SuperAdmin/Department/Create')
      },
      {
        path: '/superadmin/manage/department/:id/edit',
        name: 'SuperAdminDepartmentEdit',
        component: () => import('../views/SuperAdmin/Department/Edit')
      },
      {
        path: '/superadmin/manage/subject',
        name: 'SuperAdminSubjectReport',
        component: () => import('../views/SuperAdmin/Subject/Subject')
      },
      {
        path: '/superadmin/manage/subject/create',
        name: 'SuperAdminSubjectCreate',
        component: () => import('../views/SuperAdmin/Subject/Create')
      },
      {
        path: '/superadmin/manage/subject/:id/edit',
        name: 'SuperAdminSubjectEdit',
        component: () => import('../views/SuperAdmin/Subject/Edit')
      },
      {
        path: '/superadmin/users/teacher',
        name: 'SuperAdminTeacherReport',
        component: () => import('../views/SuperAdmin/Teacher/Teacher')
      },
      {
        path: '/superadmin/users/teacher/create',
        name: 'SuperAdminTeacherCreate',
        component: () => import('../views/SuperAdmin/Teacher/Create')
      },
      {
        path: '/superadmin/users/teacher/:id/edit',
        name: 'SuperAdminTeacherEdit',
        component: () => import('../views/SuperAdmin/Teacher/Edit')
      },
      {
        path: '/superadmin/users/teacher/permission',
        name: 'SuperAdminTeacherPermission',
        component: () => import('../views/SuperAdmin/Teacher/Permission')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
