<template>
  <div class="topbox">
    <topbarsd></topbarsd>
    <div class="hotfilm">
      <div class="toptitle">
        <div class="topleft">{{filetheme}}</div>
      </div>
      <div class="listContainer">
        <view class="fileItem" v-for="(item,index) in fileList" :key="index">
          <img :src="item.images.small" alt>
          <div class="bottom">
            <text class="filename">{{item.title}}</text>
            <div class="score">
              <starscore :drops="item.rating.average" v-if="item.rating.average != 0"></starscore>
              <text v-if="item.rating.average != 0">{{item.rating.average}}</text>
              <text v-else>暂无评分！</text>
            </div>
          </div>
        </view>
      </div>
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
      filetheme:"",
      fileList: [],
      option: {
        start: 0,
        count: 9,
        city: "深圳",
        url: "",
        method: "GET"
      }
    };
  },

  methods: {},
  components: {
    topbarsd,
    starscore
  },
  mounted() {
    console.log(this.$root.$mp.query);
    if(this.$root.$mp.query.path == "in_theaters"){
      this.filetheme = "影院热映";
    }else{
      this.filetheme = "top250";
    }
    this.option.url = this.$root.$mp.query.path;
    myrequest(this.option).then(res => {
      console.log(res);
      this.fileList = res.data.subjects;
      console.log(this.fileList);
    });
  }
};
</script>

<style scoped lang="less">
@clolor: #42bd56;
.topbox {
  // 头部样式代码
  .hotfilm {
    .toptitle {
      display: flex;
      height: 150rpx;
      justify-content: space-between;
      padding: 0 35rpx;
      font-size: 20px;
      line-height: 150rpx;
      .topright {
        color: #42bd56;
      }
    }
    // 热门电影
    .listContainer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      .fileItem {
        text-align: center;
        width: 33.33%;
        height: 400rpx;
        img {
          width: 90%;
          height: 286rpx;
        }
        .bottom {
            text-align: center;
          .filename {
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .score {
            font-size: 12px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>
