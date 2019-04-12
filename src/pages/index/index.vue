<template>
  <div class="bigcontiner">
    <topbarsd></topbarsd>
    <!-- 影院热映 -->
    <div class="hotfilm">
      <div class="toptitle">
        <div class="topleft">top250</div>
        <navigator class="topright" url="/pages/morefile/main?path=top250" >更多</navigator>
      </div>
      <!-- 微信小程序的滑动页 -->
      <!-- 热门电影 -->
      <scroll-view scroll-x class="slideFile">
        <view class="fileItem" v-for="(item,index) in hotfilemList" :key="index">
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
      </scroll-view>
    </div>
    <!-- top250 -->
    <div class="hotfilm">
      <div class="toptitle">
        <div class="topleft">影院热映</div>
        <navigator class="topright" url="/pages/morefile/main?path=in_theaters" >更多</navigator>
      </div>
      <!-- 微信小程序的滑动页 -->
      <!-- 热门电影 -->
      <scroll-view scroll-x class="slideFile">
        <view class="fileItem" v-for="(item,index) in topfileList" :key="index">
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
      </scroll-view>
      <!-- top250 -->

      <!-- <starscore drops="9"></starscore> -->
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
        url: "top250",
        start: 0,
        count: 9,
        city: "深圳",
        method: "GET"
      },
      optiona: {
        url: "in_theaters",
        start: 0,
        count: 9,
        city: "深圳",
        method: "GET"
      },
      hotfilemList: [],
      topfileList: []
    };
  },

  methods: {},
  components: {
    topbarsd,
    starscore
  },
  mounted() {
    myrequest(this.option).then(res => {
      this.hotfilemList = res.data.subjects;
      wx.hideLoading();
      console.log(res);
    });
    myrequest(this.optiona).then(res => {
      this.topfileList = res.data.subjects;
      wx.hideLoading();
      console.log(res);
    });
  }
};
</script>

<style scoped lang="less">
@clolor: #42bd56;
.bigcontiner {
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
    .slideFile {
      width: 100%;
      white-space: nowrap;
      height: 400rpx;
      .fileItem {
        display: inline-block;
        width: 33.33%;
        text-align: center;
        &:first-child {
          margin-left: 35rpx;
        }
        &:last-child {
          margin-right: 35rpx;
        }
        height: 400rpx;
        img {
          width: 90%;
          height: 286rpx;
        }
        .bottom {
          text-align: center;
          .filename {
            overflow: hidden; //盒子溢出隐藏
            text-overflow: ellipsis; //文字溢出显示省略号
            white-space: nowrap; //文字不换行
            font-size: 14px;
          }
          .score {
            display: flex;
            align-items: center;
            justify-content: center;
            text {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}
</style>
