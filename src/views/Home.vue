<template>
  <div id="app">
    <h1>VUE DATA TABLE</h1>
    <main>
      <h2>TABLE 1</h2>
      <br>
      <data-table v-bind="parametersTable1" @actionTriggered="handleAction"/>
      <br>
      <br>
      <h2>TABLE 2</h2>
      <br>
      <data-table v-bind="parametersTable2" @actionTriggered="handleAction"/>
    </main>
  </div>
</template>

<style lang="css">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  main {
    padding: 32px;
  }
</style>

<script>
  import users from "@/users"

  export default {
    name: "Home",

    computed: {
      parametersTable1() {
        return {
          data: users,
          actionMode: "multiple",
          columnKeys: [
            "name",
            "email",
            "gender",
            "country",
            "job",
            "city",
            "created_at"
          ]
        };
      },
      parametersTable2() {
        return {
          data: users.slice(200),
          actionMode: "single",
          actions: ["view"],
          columns: [
            { key: "id"},
            {
              key: "email",
              title: "Email address"
            },
            { key: "username" },
            { key: "company" },
            {
              key: "phone",
              sortable: false
            },
            { key: "state" }
          ]
        };
      }
    },

    methods: {
      handleAction(actionName, data) {
        console.log(actionName, data);
        window.alert("check out the console to see the logs");
      }
    }
  };
</script>
