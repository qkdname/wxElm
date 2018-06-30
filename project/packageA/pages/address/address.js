const utils = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    results: [],
    address: {
      name: '未能获取地址'
    }
  },
  getResults(e) {
    let k = e.detail.value;
    console.log(k)
    wx.request({
      url: `https://h5.ele.me/restapi/bgs/poi/search_poi_nearby_alipay?keyword=${k}&offset=0&limit=20`,
      success: res => {
        console.log(res);
        this.setData({
          results: res.data
        })
      }
    })
  },
  setLocation(e) {

    const i = e.currentTarget.dataset.index;
    if(i) {

      wx.setStorageSync('address', this.data.results[i]);
    }
    wx.reLaunch({
      url: '../../../pages/msite/msite'
    })
  },
  getAddress:utils.getAddress,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAddress(this)
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