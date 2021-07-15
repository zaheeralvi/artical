<template>
  <div class="banner">
    <h2 class="title">Search what you desire</h2>
    <div class="search-box">
      <b-form-input
        v-model="search"
        class="search"
        list="my-list-id"
        placeholder="typeing..."
      ></b-form-input>
      <datalist id="my-list-id">
        <option :key="index" v-for="(result, index) in results">
          {{ result.name }}
        </option>
      </datalist>
      <b-button @click="openResults()" variant="primary">Search</b-button>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      results: [],
      search: "",
    };
  },
  watch: {
    search(value) {
      if (value) {
        this.searchTopicList();
      }
    },
  },
  mounted(){
    // this.searchTopicList()
  },
  methods: {
    searchTopicList() {
      axios.get(`/topics/?search=${this.search}`).then((res) => {
        this.results = res.data;
      });
    },
    openResults(){
      console.log(this.results)
    }
  },
};
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