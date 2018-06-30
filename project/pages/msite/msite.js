const utils = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      name: '定位中'
    },
    restaurants: [],
    offset: 0,
    bottom: false
  },
  getAddress: utils.getAddress,
  getEntries(th,data) {
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/openapi/entries?latitude=${data.latitude}&longitude=${data.longitude}&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template`,

      success: res => {
        console.log(res.data);
        let foodEntries = res.data;
        foodEntries.forEach(function (item, index, arr) {
          item.entries.forEach(function (ite) {
            let p = ite.image_hash;
            ite.image_hash = utils.formatHash(p)
          })
        })
        th.setData({
          foodEntries: foodEntries
        })
      }
    })
  },
  getRestaurants: utils.getRestaurants,
  toggle(e) {
    console.log(e);

    let i = e.currentTarget.dataset.index;
    let r = this.data.restaurants;
    r[i].show = !r[i].show;
    this.setData({
      restaurants: r
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const a = wx.getStorageSync('address');
    if (a) {
      this.setData({
        address: a
      });
      this.getEntries(this,a);
      this.getRestaurants(this,a)
    } else {
      utils.getAddress(
        this,
        this.getEntries,
        this.getRestaurants
      )
    }
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
    this.getRestaurants(this, {}, true)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})