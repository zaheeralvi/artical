<template>
  <div class="topic-page pb-5">
    <Banner />
    <div class="d-inline-block">
      <b-breadcrumb>
        <b-breadcrumb-item active href="#home">Home</b-breadcrumb-item>
        <b-breadcrumb-item href="#bar">Tree</b-breadcrumb-item>
      </b-breadcrumb>
    </div>
    <div class="slider relative" :key="updater">
      <div
        :class="'slide slide-' + index"
        :key="index"
        v-for="(slide, index) of sliderLength"
      >
        <img
          @click="changeSlide(index, 'left')"
          class="left"
          src="@/assets/img/left.svg"
          alt="left"
        />
        <img
          @click="changeSlide(index, 'right')"
          class="right"
          src="@/assets/img/right.svg"
          alt="right"
        />
      </div>
      <vue-tree
        class="node-tree"
        :dataset="mediaData"
        :config="treeConfig"
        linkStyle="straight"
      >
        <template v-slot:node="{ node, collapsed }">
          <div
            :key="node.id"
            @click="nodeChange(node)"
            :class="collapsed ? 'collapsed-node node' : 'node'"
          >
            <Node :topic="node" />
          </div>
        </template>
      </vue-tree>
    </div>
  </div>
</template>
<script>
import Banner from "../components/banner/banner.vue";
import Node from "../components/node/node.vue";
import axios from "axios";

export default {
  name: "Home",
  components: { Banner, Node },
  data() {
    return {
      updater: 1212,
      sliderLength: 0,
      topicId: 0,
      rootNode: {},
      nodes: [],
      rowsChildren: {},
      mediaData: {},
      nodeData: {
        id: 1,
        name: "Root",
        children: [
          {
            id: 1,
            name: "Successful Posibilities",
            children: [
              { id: 1, name: "Successful Posibilities", public: true },
              { id: 2, name: "Successful Posibilities", public: false },
              { id: 3, name: "Successful Posibilities", public: true },
            ],
          },
          {
            id: 2,
            name: "Successful Posibilities",
            children: [
              { id: 1, name: "Successful Posibilities", public: true },
              { id: 2, name: "Successful Posibilities", public: false },
              { id: 3, name: "Successful Posibilities", public: true },
              { id: 4, name: "Successful Posibilities", public: true },
              { id: 5, name: "Successful Posibilities", public: true },
            ],
          },
          {
            id: 3,
            name: "Successful Posibilities",
            children: [
              { id: 1, name: "Successful Posibilities", public: true },
              { id: 2, name: "Successful Posibilities", public: false },
              { id: 3, name: "Successful Posibilities", public: true },
            ],
          },
        ],
      },
      treeConfig: { nodeWidth: 300, nodeHeight: 150, levelHeight: 200 },
    };
  },
  mounted() {
    this.topicId = this.$route.params.id
    if(this.topicId){
      this.getTopicData();
    }
  },
  methods: {
    getTopicData() {
      axios.get(`/topics/${this.topicId}`).then((res) => {
        console.log(res);
        this.nodeData = res.data;
        this.setData();
      });
    },
    async setData() {
      await this.nodeFormater(this.nodeData, "0");
      this.showTree();
    },
    async nodeFormater(node, key) {
      let arr = key.split("-");
      this.nodes.push({ id: node.id, name: node.name, key: key });
      if (node.subtopics) {
        node.children = node.subtopics
        node.children.forEach((n, i) => this.nodeFormater(n, `${key}-${i}`));
      }
    },
    showTree() {
      this.mediaData = this.nodes.find((n) => n.key == "0");
      this.updateMap();
    },
    nodeChange(node) {
      let keysArr = node.key.split("-");
      // find child nodes
      let children = this.nodes.filter(
        (n) =>
          n.key.includes(`${node.key}-`) && n.key.length == node.key.length + 2
      );
      if(children?.length){
        this.sliderLength = keysArr.length;
      }

      if (node.key == "0") {
        this.rowsChildren = {
          ...this.rowsChildren,
          1: {
            children: children,
            key: node.key,
            active: 0,
            croppedChildren: children.slice(0, 4),
          },
        };
        this.mediaData = {
          ...this.mediaData,
          children: this.rowsChildren[1].croppedChildren,
        };
      } else {
        this.rowsChildren = {
          ...this.rowsChildren,
          [keysArr.length]: {
            children: children,
            key: node.key,
            active: 0,
            croppedChildren: children.slice(0, 4),
          },
        };
        // node.children = children.slice(0, 4);
        node.children = this.rowsChildren[keysArr.length].croppedChildren;
      }
      console.log(this.rowsChildren);

      this.updateMap();
    },
    updateMap() {
      this.updater = Math.random();
    },
    changeSlide(index, type) {
      if (this.rowsChildren[index + 1].children.length > 4) {
        let activeIndex = this.rowsChildren[index + 1].active;
        if (type == "right") {
          activeIndex = parseInt(activeIndex) + 1;
        } else {
          activeIndex = parseInt(activeIndex) - 1;
        }
        this.rowsChildren[index + 1].croppedChildren = this.rowsChildren[
          index + 1
        ].children.slice(activeIndex, activeIndex + 4);
        this.rowsChildren[index + 1].active = activeIndex;

        this.assignValues(this.mediaData, this.rowsChildren[index + 1]);
      }
    },
    assignValues(node, child) {
      if (node.key == child.key) {
        node.children = child.croppedChildren;
        this.updateMap();
        return;
      }
      if (node.children) {
        node.children.forEach((n) => {
          this.assignValues(n, child);
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.topic-page {
  min-height: calc(100vh - 100px);
  .node-tree {
    width: 100%;
    height: 700px;
    // border: 1px solid #ccc;
    .node {
      border-radius: 5px;
      &.collapsed-node {
        border: 1px solid $primary;
      }
    }
  }
  .slider {
    position: relative;
    .slide {
      position: absolute;
      top: 320px;
      left: 0;
      right: 0;
      z-index: 111;
      @for $i from 1 through 3 {
        &.slide-#{$i} {
          top: #{260 * ($i + 1)}px;
        }
      }
      .left,
      .right {
        position: absolute;
        cursor: pointer;
      }
      .left {
        left: -50px;
      }
      .right {
        right: -50px;
      }
    }
  }
}
</style>