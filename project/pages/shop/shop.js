// pages/shop/shop.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    id:'',
    active:'order',
    menu:[],
    current:0
  },
  tab(e){
    let active = e.target.dataset.active;
    this.setData({active:active})
  },
  getMenu(id){
    wx.request({
      url:`https://h5.ele.me/restapi/shopping/v2/menu?restaurant_id=${id}`,
      success:res=> {
        console.log(res);
        this.setData({menu:res.data})
      }
    })
  },
  setCurrent(e){
    console.log(e);
    
    this.setData({
      current:e.target.dataset.index
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({name:options.name})
    this.getMenu(options.id)
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