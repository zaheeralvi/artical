<template>
  <div class="node">
    <b-card :title="topic.name" tag="node">
      <b-card-text>
        <img class="icon topRight" src="@/assets/img/pin.svg" />
        <img class="icon bottomRight" src="@/assets/img/create.svg" />
        <img class="icon bottomLeft" src="@/assets/img/zoomIn.svg" />
        <img class="icon topLeft" src="@/assets/img/arrowUp.svg" />
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  name:'NodeCard',
  props:['topic','active'],
}
</script>
<style lang="scss" scoped>
.node {
  position: relative;
  .card {
    &.selected{
      background-color: $primary;
      color: #fff;
    }
    height: 150px;
    width: 250px;
    text-align: center;
    .card-body {
      .card-title{
        font-weight: bold;
      }
      display: flex;
      justify-content: center;
      align-items: center;
      .icon {
        position: absolute;
        &.topRight {
          top: 10px;
          right: 10px;
        }
        &.topLeft {
          top: 10px;
          left: 10px;
        }
        &.bottomRight {
          bottom: 10px;
          right: 10px;
        }
        &.bottomLeft {
          bottom: 10px;
          left: 10px;
        }
      }
    }
  }
}
</style>