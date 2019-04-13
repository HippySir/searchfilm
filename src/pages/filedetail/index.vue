<template>
  <div class="detailbox">
    电影详情页面
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
        url: "",
        method: "GET"
      },
    };
  },

  methods: {},
  components: {
    topbarsd,
    starscore
  },
  mounted() {
   
   
  }
};
</script>

<style scoped lang="less">


</style>
