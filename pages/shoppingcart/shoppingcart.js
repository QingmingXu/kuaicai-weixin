// pages/shoppingcart/shoppingcart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_way: '',
    address: '',
    token: '',
    select_num_group: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'token',
      success: function (res) {
        that.setData({
          token: res.data
        });
      },
    });
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        that.setData({
          user_id: res.data,
        });
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getshoppingcart/',
          data: {
            user_id: that.data.user_id
          },
          success: function (res) {
            if (res.data.status === 'success') {
              var cart_list = res.data.data;
              that.setData({
                cart_list: cart_list
              });
              for (var i = 0; i < cart_list.length; i++) {
                that.data.select_num_group.push(cart_list[i].select_num);
              }
              console.log(that.data.cart_list);
            } else {
              console.log(res.data);
            }
          }
        });
      },
    });
    wx.setNavigationBarTitle({
      title: '购物车',
    })

  },

  onBindMinus: function () {
    var that = this;
    var select_num = that.data.select_num;
    if (select_num > 1) {
      select_num--;
    }
    var can_minus = select_num <= 1 ? 'disabled' : 'normal';
    that.setData({
      select_num: select_num,
      can_minus: can_minus
    });
  },

  onBindPlus: function () {
    var that = this;
    var select_num = that.data.select_num;
    select_num++;
    var can_minus = select_num <= 1 ? 'disabled' : 'normal';
    that.setData({
      select_num: select_num,
      can_minus: can_minus
    });
  },

  onBindManual: function (event) {
    var that = this;
    var select_num = event.detail.value;
    var can_minus = select_num <= 1 ? 'disabled' : 'normal';
    that.setData({
      select_num: select_num,
      can_minus: can_minus
    });
  },

  radioChange: function (event) {
    console.log(event.detail.value);
    var that = this;
    that.setData({
      pay_way: event.detail.value
    });
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