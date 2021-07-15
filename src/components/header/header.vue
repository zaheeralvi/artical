<template>
  <div class="header">
    <div class="container">
      <div class="menu d-flex">
        <h4 class="brand cursor-pointer">Logo</h4>
        <p v-if="!isLoggedIn" class="login cursor-pointer">
          <span v-b-modal.login>Log In</span> /
          <span v-b-modal.register>Create Account</span>
        </p>
        <span v-else class="cursor-pointer" @click='logout()'>Logout</span>
      </div>
    </div>
    <b-modal id="login" ref="login" hide-footer title="Login">
      <div>
        <b-form-group label="Username">
          <b-form-input v-model="loginCredentials.username" trim></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="Password">
          <b-form-input
            type="password"
            v-model="loginCredentials.password"
            trim
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-button
          :disabled="!isLoginFormValid"
          class="mt-3"
          block
          variant="primary"
          @click="login()"
          >Login</b-button
        >
      </div>
    </b-modal>

    <b-modal id="register" ref="register" hide-footer title="Register">
      <div>
        <b-form-group label="Username">
          <b-form-input
            v-model="registerCredentials.username"
            trim
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="Email">
          <b-form-input v-model="registerCredentials.email" trim></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="First Name">
          <b-form-input
            v-model="registerCredentials.first_name"
            trim
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="Last Name">
          <b-form-input
            v-model="registerCredentials.last_name"
            trim
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="Password">
          <b-form-input
            type="password"
            v-model="registerCredentials.password"
            trim
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-form-group label="Confirm Password">
          <b-form-input
            type="password"
            v-model="registerCredentials.password2"
            trim
          ></b-form-input>
        </b-form-group>
      </div>
      <div>
        <b-button
          :disabled="!isRegisterFormValid"
          class="mt-3"
          block
          variant="primary"
          @click="register()"
          >Register</b-button
        >
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from "axios";

export default {
  name: "Header",
  data() {
    return {
      loginCredentials: {
        username: "",
        password: "",
      },
      registerCredentials: {
        username: "",
        email: "",
        password: "",
        password2: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
    isLoginFormValid() {
      return (
        this.loginCredentials.username !== "" &&
        this.loginCredentials.password !== ""
      );
    },
    isRegisterFormValid() {
      return (
        this.registerCredentials.username !== "" &&
        this.registerCredentials.password !== "" &&
        this.registerCredentials.password2 !== "" &&
        this.registerCredentials.password ===
          this.registerCredentials.password2 &&
        this.registerCredentials.password.length > 8 &&
        this.registerCredentials.email !== "" &&
        this.registerCredentials.first_name !== "" &&
        this.registerCredentials.last_name !== ""
      );
    },
  },
  methods: {
    login() {
      axios.post("/api-token-auth/", this.loginCredentials).then((res) => {
        localStorage.setItem("BOOK_APP_TOKEN", res.token);
        this.$store.commit("UPDATE_TOKEN", res.token);
        this.$store.commit("UPDATE_LOGIN_STATUS", true);
        this.$refs["login"].hide();
      });
    },
    logout() {
      localStorage.removeItem("BOOK_APP_TOKEN");
      this.$store.commit("UPDATE_TOKEN", '');
      this.$store.commit("UPDATE_LOGIN_STATUS", false);
    },
    register() {
      console.log(this.registerCredentials);
      axios.post("/register/", this.registerCredentials).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.header {
  background: $primary;
  .menu {
    justify-content: space-between;
    align-items: center;
    color: #fff;
    height: 50px;
    .brand {
      font-weight: bold;
    }
    .login {
      margin-bottom: 0;
    }
  }
}
</style>