<template>
  <div class="header">
    <div class="container">
      <div class="menu d-flex">
        <h4 class="brand cursor-pointer">Logo</h4>
        <p class="login cursor-pointer">Log In / Create Account</p>
      </div>
    </div>
  </div>
</template>
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