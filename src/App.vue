<!-- 
    * App.vue
		* Center all component. 
		* @author natirut duangpak 59161030
		* @create Date	2019-09-05
 -->
<template>
  <v-flex id="app">
    <v-content></v-content>
    <router-view />
    <v-footer height="auto" color="indigo">
      <v-layout justify-center row wrap>
        <v-flex color="indigo" dark py-3 text-xs-center white--text xs12>
          &copy; {{ new Date().getFullYear() }} —
          <strong>GreenHub, Inc</strong>
          <br />
          <br />
        </v-flex>
      </v-layout>
    </v-footer>
  </v-flex>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
    
    };
  },
  computed: {
    /*
      * appName
      * return value appTitle. 
      * @output appTitle
      * @author natirut duangpak 59161030
      * @create Date	2018-08-23
		*/
    appName() {
      return this.$store.getters.appTitle;
    },

    /*
      * isAuthenticated
      * check authen users. 
      * @author natirut duangpak 59161030
      * @create Date	2018-08-23
		*/
    isAuthenticated() {
      return (
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      );
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
