const utils = require('../../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    hots: [],
    orderBy: 0,
    showWords: true,
    loading: false,
    keyword: '',
    offset: 0,
    bottom: false,
    showOrderBy:false,
		haha:false,
    orderByText:'综合排序'
  },
  getHots() {
    var a = wx.getStorageSync('address');
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v3/hot_search_words?latitude=${a.latitude}&longitude=${a.longitude}`,
      success: res => {
        console.log(res);
        this.setData({
          hots: res.data
        })
      }
    })
  },
  setKeyword(e) {
    var k = e.detail.value ? e.detail.value : e.target.dataset.word;
    console.log(k);
    if (k) {
      this.setData({
        keyword: k
      });
      var a = wx.getStorageSync('address');
      var h = this.data.history;
      if (!h.includes(k)) {
        h.push(k);
        this.setData({
          history: h

        });
        wx.setStorageSync('searchHistory', h)
      }
    } else {
      return;
    }
    console.log(k);
    this.search()
  },
  search() {
    // console.log(e)
    var k = this.data.keyword,
      o = this.data.offset,
      bottom = this.data.bottom,
      a = wx.getStorageSync('address');
    console.log(k);
    this.setData({
      showWords: false
    });
    !bottom && this.setData({
      loading: true
    });
    wx.request({
      url: `https://h5.ele.me/restapi/shopping/v2/restaurants/search?offset=${o}&limit=15&keyword=${k}&latitude=${a.latitude}&longitude=${a.longitude}&search_item_type=3&is_rewrite=1&extras[]=activities&extras[]=coupon&terminal=h5`,
      data: {
        order_by: this.data.orderBy
      },
      success: res => {
        // console.log(res.data.inside);
        var data = res.data.inside;
        if(!data['3']){
          this.setData({foods:[],loading:false});
          return;
        }
        for (var k in data) {
          var foods = data[k].restaurant_with_foods;
          console.log(foods)
        }
        foods.forEach(function (item) {
          item.restaurant.image_path = utils.formatHash(item.restaurant.image_path);
          item.show = false;
          item.foods.forEach(function (ite) {
            ite.image_path = utils.formatHash(ite.image_path);

          })
        })
        if (bottom) {

          foods = this.data.foods.concat(foods)
          this.setData({
            offset: o + 15,
            bottom: false
          })
        }
        this.setData({
          foods: foods,

          loading: false
        });

      }
    })
  },
  loadMore() {
    this.search()
  },
  clear() {
    this.setData({
      history: []
    });
    wx.setStorageSync('searchHistory', []);
  },
  setShow(e) {
    var v = e.detail.value;
    console.log(v);
    var showWords = v.length ? false : true;
    console.log(showWords);
    this.setData({
      showWords: showWords
    })
  },
  showMore(e) {
    var i = e.currentTarget.dataset.index,
      foods = this.data.foods;
    console.log(i);
    foods[i].show = !(foods[i].show);
    this.setData({
      foods: foods
    })
  },
  switchOrderBy(){
    this.setData({showOrderBy:!this.data.showOrderBy})
  },
  setOrderBy(e){
    var d = e.target.dataset;
    this.setData({
      orderBy:d.num,
      
      showOrderBy:false
    })
    d.text&&this.setData({orderByText:d.text,});
    this.search(this)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var s = wx.getStorageSync('searchHistory');
    s = s ? s : [];
    //console.log(s);
    this.setData({
      history: s
    });
    this.getHots()
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
    this.setData({
      bottom: true
    });
    this.loadMore()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})