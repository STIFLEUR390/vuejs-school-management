<template>
    <img src="/img/loader/1.gif" style="height: 100%; width: 100%;" />
</template>

<script>
    export default {
        name: "Refresh",
        created() {
            this.$router.go(-1)
        }
    }
</script>

<style scoped>

</style>