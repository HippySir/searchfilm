<template>
  <div class="detailbox">
    <topbarsd></topbarsd>
    <!-- 电影介绍 -->
    <div class="filmintroduction">
      <div class="fileName">{{fileDetail.title}}</div>
      <div class="fileContent">
        <div class="left">
          <div class="fileScores">
            <starscore :drops="fileDetail.rating.average"></starscore>
            <span class="filescorenum">{{fileDetail.rating.average}}</span>
            <span class="fileevaluate">{{fileDetail.comments_count}}人评价</span>
          </div>
          <div
            class="fileillustrate"
          >{{fileString}}</div>
        </div>
        <div class="right">
          <img :src="fileDetail.images.large" alt>
        </div>
      </div>
    </div>
    <div class="btuuon">
      <div class="wanttosee">想看</div>
      <div class="haveseen">看过</div>
    </div>

    <!-- 所属频道 -->
    <div class="channel">
      <div class="channelWord">所属频道</div>
      <div class="channelItems">
        <div class="channelItem"  v-for="(item,index) in fileDetail.genres" :key="index">{{item}}&nbsp;></div>
      </div>
    </div>
    <!-- 剧情简介 -->
    <div class="paradiseFalls">
      <div class="storyTitle">{{fileDetail.title}}的剧情简介</div>
      <div class="storyDetail" :class="{active:isShow}">
        {{fileDetail.summary}}
      </div> 
       <span @click="constentshou">{{isShow?"展开":"收起"}}</span>
    </div>
  </div>
</template>

<script>
// 导入顶部栏
import topbarsd from "../../components/topbar";
// 导入评分的星星
import starscore from "../../components/star.vue";
// 导入自己的请求方法
import myrequest from "../../utils/myrequest.js";
export default {
  data() {
    return {
      option: {
        start: 0,
        count: 9,
        city: "深圳",
        url: "subject",
        method: "GET"
      },
      fileDetail: {},
      fileString: "",
      isShow:true,
      contented:"展开",
    };
  },

  methods: {},
  components: {
    topbarsd,
    starscore
  },
  methods: {
   constentshou(){
     console.log('ha');
     this.isShow = !this.isShow;
   }
  },
  async mounted() {
    console.log(this.url);
    this.option.url = this.option.url + "/" + this.$root.$mp.query.id;
    console.log(this.option.url);
    let resa = await myrequest(this.option);
    wx.hideNavigationBarLoading();
    wx.hideLoading();
    this.fileDetail = resa.data;
    console.log(this.fileDetail);
    this.fileString = "139分钟";
    resa.data.genres.forEach((v, index) => {
      this.fileString = this.fileString + "/" + v;
      console.log(index);
      //  console.log( resa.data.genres.length - 1);
      if (index == resa.data.genres.length - 1) {
        console.log("ha");
        console.log(this.fileString);
        console.log(resa.data.directors);
        this.fileString =
          this.fileString + "/" + resa.data.directors[0].name + "(导演)";
        console.log(this.fileString);
      }

    });
    console.log(this.fileString);
    resa.data.casts.forEach((v, index) => {
      this.fileString = this.fileString + "/" + v.name;
      if (index == resa.data.casts.length - 1) {
        this.fileString =
          this.fileString +
          "/" +
          resa.data.year +
          "(" +
          resa.data.countries +
          ")" +
          "上映";
      }
    });

    console.log(this.fileString);
  }
};
</script>

<style scoped lang="less">
@import url("index.less");
</style>
