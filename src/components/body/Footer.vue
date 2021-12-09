<template>
    <footer class="main-footer">
        <!-- To the right -->
        <div class="float-right d-none d-sm-inline">
            Anything you want
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 21-{{ year }} <a href="javascript:void(0);">Franck School</a>.</strong> All rights reserved.
    </footer>
</template>

<script>
    export default {
        name: "Footer",
        data: () => ({
            date: '',
            time: '',
            year: '',
            timestamp: '',
            fulldatetime: ''
        }),
        methods: {
            printDate: function () {
                return new Date().toLocaleDateString();
            },
            printTime: function () {
                return new Date().toLocaleTimeString();
            },
            printYear: function () {
                return new Date().getFullYear();
            },
            printTimestamp: function () {
                return Date.now();
            },
            printFullDate: function(){
                return new Date();
            }
        },
        mounted: function () {
            this.date = this.printDate();
            this.time = this.printTime();
            this.timestamp = this.printTimestamp();
            this.year = this.printYear();
            this.fulldatetime = this.printFullDate();
        },
    }
</script>

<style>

</style>