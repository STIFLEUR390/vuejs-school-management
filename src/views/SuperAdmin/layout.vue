<template>
    <div class="wrapper">

        <Header />

        <Sidebar />

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <router-view></router-view>
        </div>
        <!-- /.content-wrapper -->

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
            <div class="p-3">
                <h5>Title</h5>
                <p>Sidebar content</p>
            </div>
        </aside>
        <!-- /.control-sidebar -->
       <!-- <a id="back-to-top" href="#" class="btn btn-primary back-to-top" role="button" aria-label="Scroll to top">
            <i class="fas fa-chevron-up"></i>
        </a>-->

        <!-- Main Footer -->
        <Footer />
    </div>
</template>

<script>
    import Header from "../../components/body/Header.vue"
    import Footer from "../../components/body/Footer.vue"
    import Sidebar from "../../components/body/superadmin/Sidebar.vue"

    export default {
        name: "layout",
        components:  {
            Header,
            Footer,
            Sidebar,
        },
    }
</script>

<style scoped>

</style>