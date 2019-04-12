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
    <div v-show="!isRefsh" class="aleadybottom">已经见底了，不要再刷新了！</div>
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
      filetheme: "",
      fileList: [],
      filenew: [],
      option: {
        start: 0,
        count: 9,
        city: "深圳",
        url: "",
        method: "GET"
      },
      isRefsh: true
    };
  },

  methods: {},
  components: {
    topbarsd,
    starscore
  },
  mounted() {
    console.log(this.$root.$mp.query);
    if (this.$root.$mp.query.path == "in_theaters") {
      this.filetheme = "影院热映";
    } else {
      this.filetheme = "top250";
    }
    this.option.url = this.$root.$mp.query.path;
    myrequest(this.option).then(res => {
      console.log(res);
      this.fileList = res.data.subjects;
      console.log(this.fileList);
      wx.hideLoading();
      wx.hideNavigationBarLoading();
    });
    // 滚动函数
  },
  // 触底加载更多事件
  onReachBottom() {
    if (this.isRefsh) {
      this.option.start += this.option.count;
      myrequest(this.option).then(res => {
        if (res.data.subjects.length == 0) {
          this.isRefsh = false;
          wx.showToast({
            title: "没有更多的数据了！",
            icon: "success"
          });
          wx.hideNavigationBarLoading();
          wx.hideLoading();
          return false;
        }
        console.log(res);
        this.filenew = res.data.subjects;
        this.fileList = this.fileList.concat(this.filenew);
        console.log(this.fileList);
        wx.hideLoading();
        wx.hideNavigationBarLoading();
      });
    }
  },
  // 下拉刷新事件
  onPullDownRefresh() {
    this.isRefsh = true;
    this.option.start = 0;
    this.fileList = [];
    myrequest(this.option).then(res => {
      this.fileList = res.data.subjects;
      console.log(this.fileList);
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
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
  .aleadybottom {
    font-size: 12px;
    text-align: center;
  }
}
</style>
