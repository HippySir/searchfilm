<template>
  <!-- 头部 -->
  <div class="header">
    <div class="left">
      <a class="title" href="#">冲天炮</a>
      <a class="titleicon" href="#">
        <icon type="search" size="24" class="icontt" color="#3c434a"/>
      </a>
    </div>
    <div class="right">
      <button>勇洋</button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
@clolor: #3c434a;
.header {
  color: @clolor;
  // background-color:red;
  height: 150rpx;
  display: flex;
  justify-content: space-between;
  padding: 0 35rpx;
  align-items: center;
  border-bottom: 1rpx solid #ccc;
  .left {
    display: flex;
    align-items: center;
    .title {
      font-size: 24px;
      // height: 24px;
      margin-right: 30rpx;
    }
    .titleicon {
      height: 24px;
      .icontt {
        margin-top: 8rpx;
      }
    }
  }
  .right {
    button {
      color: #fff;
      background-color: @clolor;
    }
  }
}
</style>
