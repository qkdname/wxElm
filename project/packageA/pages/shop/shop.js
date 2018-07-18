// packageA/pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  getDat(id){
    var a = wx.getStorageSync('address'),
    lat = a.latitude,lon = a.longitude;
    console.log(a,id)
    wx.request({
      url:'https://h5.ele.me/restapi/batch/v2?trace=shop_detail_h5',
      data:{
        "timeout": 15000,
        "requests": {
          "rst": {
            "method": "GET",
            "url": `/shopping/restaurant/${id}?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification&extras[]=qualification&terminal=h5&latitude=${lat}&longitude=${lon}`
          },
          "menu": {
            "method": "GET",
            "url": `/shopping/v2/menu?restaurant_id=${id}&terminal=h5`
          },
          "recommend": {
            "method": "GET",
            "url": `/shopping/v1/restaurants/${id}/quality_combo`
          },
          "redpack": {
            "method": "GET",
            "url": `/shopping/v1/restaurants/${id}/exclusive_hongbao/overview?code=0.7392385348366972&terminal=h5&latitude=${lat}itude=${lon}`
          }
        }
      },
      method:'post',
      dataType:'json',
      header:{
        'content-type':'text/plain;charset=UTF-8'
      },
      success:res => {
        console.log(res)

      }
    })
  },
  getData(){
    wx.request({
      url:'./data.json',
      success: res => {
        console.log(res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})