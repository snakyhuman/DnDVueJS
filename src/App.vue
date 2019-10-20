<template>
  <v-app>
    <v-content>
      <appheader></appheader>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import appheader from "@/components/AppHeader";

export default {
  name: "App",
  components: {
    appheader
  },
  data: () => ({
    //
  })
};
</script>

<style scoped>
v-content v-container {
  margin: 0;
  padding: 0;
}
</style>