const app = getApp();
const utils = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sift:[],
    restaurants: [],
    offset:0
  },
  getSift(latLong){
    wx.request({
      url:`https://h5.ele.me/restapi/shopping/v2/foods_page/sift_factors?entry_id=20004689&longitude=${latLong.longitude}&latitude=${latLong.latitude}&terminal=h5`,
      success:res => {
        console.log(res.data);
        this.setData({
          sift:res.data
        })
      }
    })
  },
  getRestaurnats(latLong) {
    let offset = this.data.offset;
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=${latLong.latitude}&longitude=${latLong.longitude}&keyword=&offset=${offset}&limit=8`,
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
  rank(e){
    
    let option = e.target.dataset.option;
    let r = this.data.restaurants.concat([]);
    //console.log(r);
    
    r.sort(function (a,b) {
      return b['restaurant'][option] - a['restaurant'][option];
    })
    console.log(r);
    
    this.setData({
      restaurants:r
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    this.getRestaurnats(app.globalData.latLong);
    this.getSift(app.globalData.latLong)
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
    this.getRestaurnats(app.globalData.latLong)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})