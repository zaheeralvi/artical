<template>
  <div class="banner">
    <h2 class="title">Search what you desire</h2>
    <div class="search-box">
      <b-form-input class="search" list="my-list-id" placeholder="typeing..."></b-form-input>
      <datalist id="my-list-id">
        <option :key="index" v-for="(size,index) in sizes">{{ size }}</option>
      </datalist>
      <b-button variant="primary" @click="$router.push('/topic/1')"
        >Search</b-button
      >
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        sizes: [
          'Topic 1 > Sub Topic 11',
          'Topic 2 > Sub Topic 22 > Subject 222',
          'Testing > DEV > SQA',
          ]
      }
    }
  }
</script>
<style lang="scss" scoped>
.banner {
  padding: 70px 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    text-align: center;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .search-box {
    width: 500px;
    max-width: 100%;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    .search {
      border: none;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }
  }
}
</style>