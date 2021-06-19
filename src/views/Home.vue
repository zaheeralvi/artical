<template>
  <div class="home">
    <Banner />
    <div class="content pb-5">
      <div class="row">
        <div class="col-md-9">
          <VueSlickCarousel
            class="carousel"
            v-bind="settings"
            :arrows="false"
            :dots="false"
          >
            <TopicCard
              v-for="(topic, index) of topicList"
              :active="index == activeIndex"
              :topic="topic"
              :key="topic.id"
            />
          </VueSlickCarousel>
        </div>
        <div class="col-md-3">
          <div class="float-right">
            <b-card class="addTopic" title="Add Topic"> </b-card>
          </div>
        </div>
      </div>
      <div class="pt-5">
        <div class="row">
          <div class="col-md-3">
            <VueSlickCarousel
              class="carousel"
              v-bind="columnSettings"
              :arrows="false"
              :dots="false"
            >
              <SubTopicCard
                v-for="(topic, index) of topicList"
                :active="index == activeIndex"
                :topic="topic"
                :key="topic.id"
              />
            </VueSlickCarousel>
            <div class="">
              <b-card class="addTopic addSubTopic" title="Add Topic"> </b-card>
            </div>
          </div>
          <div class="col-md-9">
            <div class="d-inline-block">
              <b-breadcrumb>
                <b-breadcrumb-item active href="#home">Topic</b-breadcrumb-item>
                <b-breadcrumb-item active href="#foo"
                  >Sub Topic</b-breadcrumb-item
                >
                <b-breadcrumb-item href="#bar">Topic Tile</b-breadcrumb-item>
              </b-breadcrumb>
            </div>
            <div class="sub-topic-content">
              <template v-for="(item, index) in subTopicContent">
                <b-card class="mb-5" :title="item.title" :key="index">
                  <b-card-text class="text">{{ item.content }}</b-card-text>
                  <b-card-text>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      <div class="tags">
                        <b-button
                          disabled="disabled"
                          class="mr-2"
                          variant="primary"
                          >Topic</b-button
                        >
                        <b-button disabled="disabled" variant="primary"
                          >Sub Topic</b-button
                        >
                      </div>
                      <div>
                        <img class="mr-2" src="@/assets/img/check.svg" alt="" />
                        <img src="@/assets/img/pen.svg" alt="" />
                      </div>
                    </div>
                  </b-card-text>
                </b-card>
              </template>
            </div>
            <div class="files-card">
              <div class="file-item">
                <h3 class="title">Data sample</h3>
                <b-card title="CSVG File"></b-card>
              </div>
              <div class="file-item">
                <h3 class="title">Visual 1</h3>
                <b-card>
                  <b-card-text>
                    <img src="@/assets/img/folder.svg">
                  </b-card-text>
                </b-card>
              </div>
              <div class="file-item">
                <h3 class="title">Visual 2</h3>
                <b-card>
                  <b-card-text>
                    <img src="@/assets/img/folder.svg">
                  </b-card-text>
                </b-card>
              </div>
              <div class="file-item">
                <h3 class="title"></h3>
                <b-card>
                  <b-card-text>
                    <img src="@/assets/img/folder.svg">
                  </b-card-text>
                </b-card>
              </div>
            </div>
            <div class="sub-topic-content mt-5">
              <h4 class="title">Use your data</h4>
              <b-card>
                <b-card-text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. From lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make.</b-card-text>
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "../components/banner/banner.vue";
import TopicCard from "../components/topic/topic.vue";
import SubTopicCard from "../components/subtopic/subtopic.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";

export default {
  name: "Home",
  components: { Banner, VueSlickCarousel, TopicCard, SubTopicCard },
  data() {
    return {
      activeIndex: 0,
      topicList: [
        { id: 1, name: "Successful Posibilities", public: true },
        { id: 2, name: "Successful Posibilities", public: false },
        { id: 3, name: "Successful Posibilities", public: true },
        { id: 4, name: "Successful Posibilities", public: true },
        { id: 5, name: "Successful Posibilities", public: true },
      ],
      subTopicContent: [
        {
          title: `What is it?`,
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. The is lrem Ipsum has been the industry's standard dummy text ever since the 1500s, text when an
Ipsum has been the industry's standard dummy text ever since the 1500s, text when an  Ithas survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
        },
        {
          title: `How is used?`,
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. From lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make.`,
        },
        {
          title: `How is used?`,
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. From .`,
        },
      ],
    };
  },
  computed: {
    isMobile() {
      return window.screen.width < 768;
    },
    columnSettings() {
      return {
        infinite: true,
        vertical: !this.isMobile,
        slidesToShow: this.isMobile ? 1 : 4,
      };
    },
    settings() {
      return {
        infinite: true,
        slidesToShow: this.isMobile ? 1 : 3,
        slidesToScroll: 1,
      };
    },
  },
};
</script>

<style lang="scss">
.home {
  .card.addTopic {
    height: 150px;
    width: 200px;
    text-align: center;
    &.addSubTopic {
      width: 250px;
    }
    .card-body {
      display: flex;
      justify-content: center;
      align-items: center;
      .card-title {
        font-weight: bold;
        color: $primary;
      }
    }
  }
  .sub-topic-content {
    .text {
      font-size: 18px;
      line-height: 32px;
    }
  }
  .files-card{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    .file-item{
      // margin-left: 20px;
      // &:first-child{
      //   margin-left: 0;
      // }
      .title{
        font-size: 20px;
      }
      .card{
        width: 160px;
        height: 150px;
        .card-body{
          display: flex;
          align-items: center;
          justify-content: center;
          .card-title{
            margin: 0 !important;
            color: #999;
          }
        }
      }
    }
  }
}
.slick-vertical {
  .topic {
    margin-bottom: 15px;
  }
}
.breadcrumb {
  background-color: #fff !important;
  padding: 0 15px !important;
  .breadcrumb-item + .breadcrumb-item::before {
    content: "" !important;
    background: url(../assets/img/divider.svg) no-repeat;
    background-size: cover;
    height: 28px;
    position: relative;
    right: 6px;
    top: -1px;
    width: 14px;
  }
}
</style>
