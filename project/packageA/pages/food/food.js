const utils = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    categories:[],
    currentIndex:0,
    restaurants:[],
    
    ids:'',
    order_by:'',
    order_by_text:'综合排序',
    vip:'',
    supports:[],
    showRank:false,
    offset:0,
    bottom:false
  },
  getCategory(id){
    const l = wx.getStorageSync('address');
    wx.request({
      url:`https://h5.ele.me/restapi/shopping/v2/foods_page/sift_factors?entry_id=${id}&longitude=${l.longitude}&latitude=${l.latitude}&terminal=h5`,
      success: res => {
        console.log(res);
        this.setData({categories:res.data});
        let ids = res.data[0].restaurant_category_ids;
        
        this.getRestaurants(this);
        this.setData({ids:ids});
      }
    })
  },
  getRestaurants:utils.getRestaurants,
  setIds(e){
    const d = e.target.dataset;
    this.setData({ids:d.ids,currentIndex:d.index});
    if(d.ids == this.data.ids){
      return
    } else {

      this.getRestaurants(this);
    }
    
  },
  showRank(){
    this.setData({showRank:!this.data.showRank})
  },
  toggle(e){
    console.log(e);
    
    let i = e.currentTarget.dataset.index;
    let r = this.data.restaurants;
    r[i].show = !r[i].show;
    this.setData({restaurants:r})
  },
  setRank(e){
    var d = e.target.dataset;
    this.setData({
      order_by:d.num,
      
      showRank:false
    })
    d.text&&this.setData({order_by_text:d.text,});
    this.getRestaurants(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({title:options.name})
    this.getCategory(options.id)
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
    this.setData({bottom:true})
    this.getRestaurants(this)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})