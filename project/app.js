//app.js
App({
  getLatlong() {
    wx.getLocation({
      type: 'wgsb4',
      success: res => {
        this.globalData.latLong.latitude = res.latitude;
        this.globalData.latLong.longitude = res.longitude;
        this.getLocation(this.globalData.latLong)
      }
    })
  },
  getLocation(latLong) {
    wx.request({
      url: 'https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding',
      data: latLong,
      success: res => {
        console.log(res);
        
        this.globalData.location = res.data;
      }
    })
  },
  onLaunch: function () {
    this.getLatlong()


  },
  globalData: {
    userInfo: null,
    latLong: {},
    location:{address:'定位中...'}
  }
})