<template>
  <div class="topic">
    <b-card :class="active?'selected':''" :title="topic.name" tag="topic">
      <b-card-text>
        <img v-if='topic.private' class="icon topRight" src="@/assets/img/private.svg" />
        <img v-else class="icon topRight" src="@/assets/img/public.svg" />
        <img @click="$router.push(`topic/${topic.id}`)" class="icon bottomRight cursor-pointer" src="@/assets/img/tree.svg" />
      </b-card-text>
    </b-card>
  </div>
</template>
<script>
export default {
  name:'TopicCard',
  props:['topic','active'],
}
</script>
<style lang="scss" scoped>
.topic {
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