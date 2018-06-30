const formatHash = hash => {

  return `//fuss10.elemecdn.com/${hash.slice(0, 1)}/${hash.slice(1, 3)}/${hash.slice(3)}${hash.slice(-3) === 'png'?'.png':'.jpeg'}`
}
const getAddress = (th,fn,fun) => {
  wx.getLocation({
    success: res => {
      //console.log(res);
      const data = {
        latitude: res.latitude,
        longitude: res.longitude
      }
      wx.request({
        url: 'https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding',
        data: data,
        success: res => {
          console.log(res);
          wx.setStorageSync('address', res.data);
          
          if (th) {
            th.setData({
              address: res.data
            })
          }
          console.log(fn);
          
          fn&&fn(th,res.data);
          
          fun&&fun(th,res.data)
        }
      })

    }
  })
}
const getRestaurants = (th, data,bottom = false) => {
  let latLong = wx.getStorageSync('address');
  let i = '',offset=th.data.offset;
  if (data.ids) {
    data.ids.forEach(function (item, index) {
      i += `&restaurant_category_ids[]=${item}`
    })
  }
  if (data.supports) {
    data.supports.forEach(function (item, index) {
      i += `&support_ids[]=${item}`
    })
  }

  i += `${data.order_by?'&order_by='+data.order_by:''}${data.vip?'&super_vip='+data.vip:''}`;
  wx.request({
    url: `https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=${latLong.latitude}&longitude=${latLong.longitude}&offset=${offset}&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5${i}`,

    success: res => {
      let items = res.data.items;
      items.forEach(function (item) {
        item.restaurant.image_path = formatHash(item.restaurant.image_path);


        item.show = false;
      })

      if (bottom) {
        th.setData({
          loadMore: true
        })
        items = th.data.restaurants.concat(items)
        th.setData({
          offset: offset + 8
        })
      }
      th.setData({
        restaurants: items,
      });
      th.setData({
        loadMore: false
      })
    }
  })
}
module.exports = {
  formatHash: formatHash,
  getAddress: getAddress,
  getRestaurants:getRestaurants
}