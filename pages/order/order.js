// pages/order/order.js

import { access } from "access.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    access.getOrderList({
      success: function(orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '全部订单',
        })
      }
    });
  },

  onWaitConfirm: function (event) {
    var that = this;
    access.getWaitConfirmOrderList({
      success: function (orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '待收货',
        });
      }
    });
  },

  onWaitPay: function (event) {
    var that = this;
    access.getWaitPayOrderList({
      success: function (orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '待支付',
        });
      }
    });
  },

  onFinish: function (event) {
    var that = this;
    access.getFinishOrderList({
      success: function (orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '已完成',
        });
      }
    });
  },

  onCancel: function (event) {
    var that = this;
    access.getCancelOrderList({
      success: function (orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '已取消',
        });
      }
    });
  },

  onAll: function (event) {
    var that = this;
    access.getOrderList({
      success: function (orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '全部订单',
        });
      }
    });
  },

  onCancelOrder: function (event) {
    var that = this;
    var order_id = event.currentTarget.dataset.id;
    console.log(event);
    wx.showModal({
      title: '',
      content: '确认取消？',
      success: function (res) {
        if (res.confirm) {
          console.log('yes');
          wx.request({
            url: 'http://127.0.0.1:5000/api/v1/cancelorder/',
            data: {
              order_id: JSON.stringify(order_id)
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'chartset': 'utf-8'
            },
            success: function (res) {
              if (res.data.status === 'success') {
                wx.showModal({
                  title: '',
                  content: '成功取消订单',
                });
                that.onShow();
              } else {
                wx.showModal({
                  title: '',
                  content: '发生了错误',
                });
              }
            }
          });
        } else {
          console.log('no');
        }
      }
    });
  },

  onConfrimOrder: function (event) {
    var that = this;
    var order_id = event.currentTarget.dataset.id;
    console.log(event);
    wx.showModal({
      title: '',
      content: '确认收货？',
      success: function (res) {
        if (res.confirm) {
          console.log('yes');
          wx.request({
            url: 'http://127.0.0.1:5000/api/v1/confrimorder/',
            data: {
              order_id: JSON.stringify(order_id)
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              'chartset': 'utf-8'
            },
            success: function (res) {
              if (res.data.status === 'success') {
                that.onShow();
              } else {
                wx.showModal({
                  title: '',
                  content: '发生了错误',
                });
              }
            }
          });
        } else {
          console.log('no');
        }
      }
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
    var that = this;
    access.getOrderList({
      success: function (orders) {
        console.log(orders);
        that.setData({
          orders: orders
        });
        wx.setNavigationBarTitle({
          title: '全部订单',
        });
      }
    });


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