// pages/commitorder/commitorder.js

import { access } from "access.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_way: '',
    address: '',
    select_num: 1,
    can_minus: 'disabled',
    token: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
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
          select_num: options.select_num
        });
        if (that.data.select_num > 1) {
          that.setData({
            can_minus: 'normal'
          });
        }
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getaddress',
          data: {
            user_id: that.data.user_id
          },
          success: function (res) {
            console.log(res);
            if (res.data.status === 'success') {
              console.log(res.data.address);
              that.setData({
                user_address: res.data.address,
              });
            } else {
              console.log('error');
            }
          }
        });
        access.getDetail({
          success: function (item) {
            that.setData({
              menu_id: item.menu_id,
              name: item.menu_name,
              menu_type: item.menu_type,
              image_url: item.menu_image_url_2,
              price: item.menu_price,
            });
          },
          id: options.menu_id
        });
      },
    });
    console.log(options);
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

  onBuy: function (event) {
    console.log(event);
    var that = this;
    var token = that.data.token;
    var menu_id = event.currentTarget.dataset.id;
    var menu_name = event.currentTarget.dataset.name;
    var user_id = that.data.user_id;
    var num = that.data.select_num;
    var pay_way = that.data.pay_way;
    if (token === '') {
      wx.showModal({
        title: '',
        content: '请先登录',
      });
    } else {
      wx.request({
        url: 'http://127.0.0.1:5000/api/v1/createorder/',
        data: {
          token: JSON.stringify(token),
          menu_id: JSON.stringify(menu_id),
          user_id: JSON.stringify(user_id),
          num: JSON.stringify(num),
          menu_name: JSON.stringify(menu_name),
          pay_way: JSON.stringify(pay_way)
        },
        method: "POST",
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'chartset': 'utf-8'
        },
        success: function (res) {
          if (res.data.status === 'error') {
            wx.showModal({
              title: '',
              content: '发生错误',
            });
          }
          wx.switchTab({
            url: '/pages/order/order',
          });
        }
      });
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})