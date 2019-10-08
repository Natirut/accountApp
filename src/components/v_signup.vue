<!-- 
    * v_signup.vue
		* signup to web app. 
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
              <v-toolbar color="warning" dark flat>
                <v-toolbar-title>Signup</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom></v-tooltip>
                <v-tooltip right></v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="signup">
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
                  <v-text-field
                      label="Password"
                      name="password"
                      prepend-icon="lock"
                      :rules="passwordRules"
                      v-model="password"
                      :append-icon="show_password ? 'visibility' : 'visibility_off'"
                      :type="show_password ? 'text' : 'password'"
                      @click:append="show_password = !show_password"
                  ></v-text-field>
                  <v-text-field
                      label="ConfirmPassword"
                      name="confirmpassword"
                      prepend-icon="lock_open"
                      :rules="confirmpasswordRules"
                      v-model="confirmpassword"
                      :append-icon="show_confirmpassword ? 'visibility' : 'visibility_off'"
                      :type="show_confirmpassword ? 'text' : 'password'"
                      @click:append="show_confirmpassword = !show_confirmpassword"
                  ></v-text-field>
                  <v-btn color="warning" type="submit" :disabled="loading">SignUp</v-btn>
                  <br><br>
                  <span>
                    Already have a account?
                    <router-link to="/login">Log In</router-link>
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
  name: "signup",
  data() {
    return {
      email: "",
      password: "",
      confirmpassword: "",
      alert: false,
      show_password:false,
      show_confirmpassword:false,
      emailRules: [
      v => !!v || 'username ไม่สามารถว่างได้',
      v => /.+@.+/.test(v) || 'รูปแบบ username ไม่ถูกต้อง',
    ],
       passwordRules: [
      v => !!v || 'password ไม่สามารถว่างได้',
    ],
       confirmpasswordRules: [
      v => !!v || 'confirm password ไม่สามารถว่างได้',
    ],
    };
  },
  computed: {
    /*
      * comparePasswords
      * check confirmpassword. 
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    comparePasswords() {
      return this.password === this.confirmpassword
        ? true
        : "Password and confirm password don't match";
    },
    error() {
      return this.$store.getters.getError;
    },
    loading() {
      return this.$store.getters.getLoading;
    }
  },
  methods: {
    /*
      * signup
      * check signup. 
      * @author natirut duangpak 59161030
      * @create Date	2019-08-23
		*/
    signup() {
      if (!this.email || !this.password || !this.confirmpassword) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      } else if (this.comparePasswords !== true) {
        alert("กรุณากรอกรหัสให้ตรงกัน");
        return;
      } else {
        this.$store.dispatch("signup", {
          email: this.email,
          password: this.password
        });
      }
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
        this.$store.dispatch("setError", null);
      }
    }
  } 
};
</script>