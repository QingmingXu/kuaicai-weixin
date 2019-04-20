// pages/list/list.js
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
    console.log(options.type);
    var type = options.type;
    var that = this;
    var title = '';
    wx.showLoading({
      title: '拼命加载中...',
    })
    if (options.type === '主食') {
      access.getStaplesList({
        success: function (staples) {
          that.setData({
            items: staples,
            type: type
          });
          wx.hideLoading();
        }
      });
      title = '主食';
    }
    if (options.type === '小食') {
      access.getSnacksList({
        success: function (snacks) {
          that.setData({
            items: snacks,
            type: type
          });
          wx.hideLoading();
        }
      });
      title = '小食';
    }
    if (options.type === '饮品') {
      access.getDrinksList({
        success: function (drinks) {
          that.setData({
            items: drinks,
            type: type
          });
          wx.hideLoading();
        }
      });
      title = '饮品';
    }
    wx.setNavigationBarTitle({
      title: title,
    })

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