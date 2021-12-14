<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import EventBus from './common/EventBus'

  export default {
    name: 'App',
    methods: {
      logOut() {
        this.$store.dispatch('auth/logout')
        this.$router.push("/")
      },
    },
    mounted() {
      EventBus.on("logout", () => {
        this.logOut()
      })
    },
    beforeDestroy() {
      EventBus.remove("logout")
    }
  }
</script>

<style>
#app {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}
</style>
