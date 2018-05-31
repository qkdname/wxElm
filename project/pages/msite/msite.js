const app = getApp();
const utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hello: 'hell',
    location: {
      address: '定位中...'
    },
    foodEntry: [],
    restaurants: [],
    offset: 0
  },
  
  getEntries(data) {
    wx.request({
      url: 'https://h5.ele.me/restapi/shopping/openapi/entries?latitude=' + data.latitude + '&longitude=' + data.longitude + '&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template',

      success: res => {
        //console.log(res.data);
        let foodEntry = res.data;
        foodEntry.forEach(function (item, index, arr) {
          item.entries.forEach(function (ite) {
            let p = ite.image_hash;
            ite.image_hash = utils.formatHash(p)
          })
        })
        this.setData({
          foodEntry: foodEntry
        })
      }
    })
  },
  getRestaurnats(latLong) {
    let offset = this.data.offset;
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=${latLong.latitude}&longitude=${latLong.longitude}&offset=${offset}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5`,
      success: res => {

        let items = res.data.items;
        items.forEach(function (item) {
          item.restaurant.image_path = utils.formatHash(item.restaurant.image_path)
        })
        items = this.data.restaurants.concat(items)
        this.setData({
          restaurants: items,
          offset: offset + 8
        });
      }
    })
  },
  tapme(e) {
    console.log(e);

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(app.globalData);
    const latLong = app.globalData.latLong;
    this.setData({location:app.globalData.location})
    this.getEntries(latLong);
    this.getRestaurnats(latLong)
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
    this.getRestaurnats(app.globalData.latLong, this.offset)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})