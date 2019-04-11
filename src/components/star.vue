<template>
     <div class="star">
         <img src="../../static/images/a.png" alt="">
         <img v-show="drops>2" src="../../static/images/a.png" alt="">
         <img v-show="drops<=2" src="../../static/images/b.png" alt="">
         <img v-show="drops>4" src="../../static/images/a.png" alt="">
         <img v-show="drops<=4" src="../../static/images/b.png" alt="">
         <img v-show="drops>6" src="../../static/images/a.png" alt="">
         <img v-show="drops<=6" src="../../static/images/b.png" alt="">
         <img v-show="drops>8" src="../../static/images/a.png" alt="">
         <img v-show="drops<=8" src="../../static/images/b.png" alt="">
       </div>
</template>

<script>
export default {
    data() {
        return {
            
        }
    },
   props:["drops"],
       
}
</script>

 <style lang="less">
    .star{
  img{
    width: 20rpx;
    height: 20rpx;;
  }
}
</style>>


