<!-- 
    * v_login.vue
		* login to web app. 
		* @author natirut duangpak 59161030
		* @create Date	2019-09-05
 -->
<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom></v-tooltip>
                <v-tooltip right></v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="login">
                  <!-- <v-text-field
                      label="Username"
                      name="email"
                      prepend-icon="person"
                      type="text"
                      v-model="email"
                  ></v-text-field> -->
                         <v-text-field
                          name="email"
                          v-model="email"
                          :rules="emailRules"
                           prepend-icon="person"
                          label="Username"
                          required
                         ></v-text-field>
                  <!-- <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      type="password"
                      v-model="password"
                  ></v-text-field> -->
                   <v-text-field
                      id="password"
                      label="Password"
                      name="password"
                      :rules="passwordRules"
                      prepend-icon="lock"
                      v-model="password"
                      :append-icon="show_password ? 'visibility' : 'visibility_off'"
                      :type="show_password ? 'text' : 'password'"
                      @click:append="show_password = !show_password"
                  ></v-text-field>
                  <v-btn color="primary" type="submit" :disabled="loading">Login</v-btn>
                  <br />
                  <br />
                  <span>
                    New accout to
                    <router-link to="/signup">Sign Up</router-link>
                  </span>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import firebase from "firebase";
export default {
  props: {
    source: String
  },
  name: "login",
  data() {
    return {
      drawer: null,
      email: "",
      password: "",
      alert: false,
      show_password:false,
       emailRules: [
      v => !!v || 'username ไม่สามารถว่างได้',
      v => /.+@.+/.test(v) || 'รูปแบบ username ไม่ถูกต้อง',
    ],
      passwordRules: [
      v => !!v || 'password ไม่สามารถว่างได้',
    ],
    };
  },
  computed: {
    error() {
      return this.$store.getters.getError;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true;
      }
    },
    alert(value) {
      if (!value) {
        this.$store.dispatch("setError", false);
      }
    }
  },
  methods: {
      /*
      * login
      * check login. 
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    login() {
      if (!this.email || !this.password) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
      this.$store.dispatch("login", {
        email: this.email,
        password: this.password
      });
    }
  }
};
</script>