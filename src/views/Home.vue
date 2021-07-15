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
              @click="changeIndex(index)"
            />
          </VueSlickCarousel>
        </div>
        <div class="col-md-3">
          <div class="float-right">
            <b-card
              v-if="isLoggedIn"
              v-b-modal.modal-1
              class="cursor-pointer addTopic"
              title="Add Topic"
            >
            </b-card>
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
                v-for="(topic, index) of subTopicList"
                :active="index == activeIndex"
                :topic="topic"
                :key="topic.id"
              />
            </VueSlickCarousel>
            <div class="">
              <b-card
                v-if="isLoggedIn"
                v-b-modal.modal-2
                class="addTopic addSubTopic"
                title="Add"
              >
              </b-card>
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
              <!-- explainations go here -->
              <template
                v-for="(item, index) in topicList[activeIndex].explanations"
              >
                <b-card class="mb-5" :title="item.title" :key="index">
                  <b-card-text class="text">{{ item.type }}</b-card-text>
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
                    <img src="@/assets/img/folder.svg" />
                  </b-card-text>
                </b-card>
              </div>
              <div class="file-item">
                <h3 class="title">Visual 2</h3>
                <b-card>
                  <b-card-text>
                    <img src="@/assets/img/folder.svg" />
                  </b-card-text>
                </b-card>
              </div>
              <div class="file-item">
                <h3 class="title"></h3>
                <b-card>
                  <b-card-text>
                    <img src="@/assets/img/folder.svg" />
                  </b-card-text>
                </b-card>
              </div>
            </div>
            <div class="sub-topic-content mt-5">
              <h4 class="title">Use your data</h4>
              <b-card>
                <b-card-text
                  >Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. From lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to
                  make.</b-card-text
                >
              </b-card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-1"
      ref="createTopicModal"
      hide-footer
      title="Create Topic"
    >
      <div>
        <div>
          <b-form-group id="fieldset-1" label="Enter Title">
            <b-form-input id="input-1" v-model="topic.name" trim></b-form-input>
          </b-form-group>
        </div>
        <div>
          <b-form-group id="fieldset-1" label="Type">
            <b-form-select v-model="topic.type">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Topic Type --</b-form-select-option
                >
              </template>
              <b-form-select-option
                :key="index"
                v-for="(type, index) in typeList"
                :value="type.value"
                >{{ type.label }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </div>
        <div>
          <b-form-group id="fieldset-1" label="Parent">
            <b-form-select v-model="topic.parent">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Parent --</b-form-select-option
                >
              </template>
              <b-form-select-option
                :key="index"
                v-for="(type, index) in topicList"
                :value="type.id"
                >{{ type.name }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </div>
        <b-form-checkbox
          id="checkbox-1"
          v-model="topic.private"
          name="checkbox-1"
        >
          Private
        </b-form-checkbox>
        <b-button class="mt-3" block variant="primary" @click="saveTopic()"
          >Save</b-button
        >
      </div>
    </b-modal>
    <b-modal
      id="modal-2"
      ref="createExplanationsModal"
      title="Create Sub Topic"
    >
      <div>
        <div>
          <b-form-group id="fieldset-1" label="Enter Title">
            <b-form-input
              id="input-1"
              v-model="explanations.title"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div>
          <b-form-group id="fieldset-1" label="Enter Type">
            <b-form-input
              id="input-1"
              v-model="explanations.type"
              trim
            ></b-form-input>
          </b-form-group>
        </div>
        <div>
          <b-form-group id="fieldset-1" label="Parent">
            <b-form-select v-model="explanations.topic">
              <template #first>
                <b-form-select-option :value="null" disabled
                  >-- Parent --</b-form-select-option
                >
              </template>
              <b-form-select-option
                :key="index"
                v-for="(type, index) in topicList"
                :value="type.id"
                >{{ type.name }}</b-form-select-option
              >
            </b-form-select>
          </b-form-group>
        </div>
        <b-button variant="primary" @click="saveExplanations()">Save</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import Banner from "../components/banner/banner.vue";
import TopicCard from "../components/topic/topic.vue";
import SubTopicCard from "../components/subtopic/subtopic.vue";
import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
import axios from "axios";

export default {
  name: "Home",
  components: { Banner, VueSlickCarousel, TopicCard, SubTopicCard },
  data() {
    return {
      activeIndex: 0,
      topic: {
        name: "",
        type: null,
        parent: null,
        private: false,
      },
      explanations: {
        title: "",
        type: "",
        topic: null,
      },
      typeList: [
        { label: "Diary", value: "diary" },
        { label: "Literary Novel", value: "literary_novel" },
        { label: "Course", value: "course" },
        { label: "Campaign", value: "campaign" },
        { label: "General Topic", value: "General_topic" },
        { label: "Faq Topic", value: "faq_topic" },
        { label: "Customer Hierarchy", value: "customer_hierarchy" },
      ],
      topicList: [
        // { id: 1, name: "Successful Posibilities", public: true },
        // { id: 2, name: "Successful Posibilities", public: false },
        // { id: 3, name: "Successful Posibilities", public: true },
        // { id: 4, name: "Successful Posibilities", public: true },
        // { id: 5, name: "Successful Posibilities", public: true },
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
    isLoggedIn() {
      return this.$store.state.isUserLoggedIn;
    },
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
    subTopicList() {
      if (this.topicList[this.activeIndex]) {
        return this.topicList[this.activeIndex]?.subtopics;
      } else {
        return [];
      }
    },
  },
  mounted() {
    this.getTopicList();
  },
  methods: {
    getTopicList() {
      axios.get("/topics/").then((res) => {
        console.log(res.data);
        this.topicList = res.data;
      });
    },
    saveTopic() {
      axios.post("/topics/", this.topic).then(() => {
        this.$refs["createTopicModal"].hide();
        this.getTopicList();
      });
    },
    saveExplanations() {
      axios.post("/explanations/", this.explanations).then(() => {
        this.$refs["createExplanationsModal"].hide();
        this.getTopicList();
      });
    },
    changeIndex(index) {
      debugger;
      this.activeIndex = index;
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
  .files-card {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
    .file-item {
      // margin-left: 20px;
      // &:first-child{
      //   margin-left: 0;
      // }
      .title {
        font-size: 20px;
      }
      .card {
        width: 160px;
        height: 150px;
        .card-body {
          display: flex;
          align-items: center;
          justify-content: center;
          .card-title {
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
