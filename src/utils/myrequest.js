function myrequest(option) {
    // console.log(option);
  return new Promise(function(resolve, reject) {
    wx.showLoading({
        title: '亲，请你稍等哟！',
        mask:true
    });
    wx.request({
      url: `https://autumnfish.cn/v2/movie/${option.url}`,
      data: {
        start: option.start,
        count: option.count,
        city: option.city
      },
      method: option.method,
      header: {
        "content-type": "json" // 默认值
      },
      success: function(res) {
        resolve(res);
      },
      fail: function(res){
        reject(res);
      }
    });
  });
}

export default myrequest;
