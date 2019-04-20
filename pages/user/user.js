// pages/user/user.js
import { access } from "access.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isshow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              that.setData({
                user_name: res.userInfo.nickName,
                user_image_url: res.userInfo.avatarUrl
              });
            }
          });
        }
      }
    });
    access.getLoginState({
      success: function (loginstate) {
        that.setData({
          loginstate: loginstate
        });
        console.log(that.data.loginstate);
        if (that.data.loginstate === 'login') {
          wx.getStorage({
            key: 'isshow',
            success: function (res) {
              that.setData({
                isshow: res.data,
              });
            },
          });
          wx.getStorage({
            key: 'user_id',
            success: function (res) {
              that.setData({
                user_id: res.data,
              });
            },
          });
        } else {
          that.setData({
            isshow: false
          });
          wx.removeStorage({
            key: 'isshow',
            success: function(res) {
              console.log(res);
            },
          });
          wx.removeStorage({
            key: 'token',
            success: function(res) {
              console.log(res);
            },
          });
          wx.removeStorage({
            key: 'user_id',
            success: function (res) {
              that.setData({
                user_id: 0
              });
            },
          });
        }
      }
    });
  },
  
  onSpecialLogin: function(event) {
    var that = this;
    wx.login({
      success(res) {
        if (res.code){
          wx.request({
            url: 'http://127.0.0.1:5000/api/v1/wxlogin',
            data: {
              code:res.code,
              user_name: that.data.user_name,
              user_image_url: that.data.user_image_url
            },
            success: function(res) {
              console.log(res);
              if (res.statusCode === 200 && res.data.is_show === true) {
                var is_show = res.data.is_show;
                var token = res.data.token;
                var user_id = res.data.user_id;
                that.setData({
                  user_id: user_id
                });
                wx.setStorage({
                  key: 'user_id',
                  data: user_id,
                });
                wx.setStorage({
                  key: 'isshow',
                  data: is_show,
                });
                wx.setStorage({
                  key: 'token',
                  data: token,
                });
                wx.getStorage({
                  key: 'isshow',
                  success: function (res) {
                    that.setData({
                      isshow: res.data,
                    });
                  },
                });
              } else {
                wx.showModal({
                  title: '错误',
                  content: '登录失败！',
                });
              }
            }
          });
        } else {
          wx.showModal({
            title: '错误',
            content: '登录失败！' + res.errMsg,
          });
        }
      }
    });
    
  },

  onLogout: function(event){
    var that = this;
    wx.showModal({
      title: '',
      content: '确认退出账号？',
      success: function(res){
        if (res.confirm) {
          console.log('yes');
          access.toLogout({
            success: function (status) {
              console.log(status);
            }
          });
          wx.removeStorage({
            key: 'isshow',
            success: function(res) {
              that.setData({
                isshow: false,
              });
            },
          });
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              that.setData({
                isshow: false,
              });
            },
          });
          wx.removeStorage({
            key: 'user_id',
            success: function(res) {
              that.setData({
                user_id: 0
              });
            },
          });
        } else {
          console.log('no');
        }
      }
    });
  },
  onSetAddress: function(event) {
    console.log(event);
    wx.navigateTo({
      url: '/pages/setaddress/setaddress',
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
    var that = this;
    access.getLoginState({
      success: function (loginstate) {
        that.setData({
          loginstate: loginstate
        });
        console.log(that.data.loginstate);
        if (that.data.loginstate === 'login') {
          wx.getStorage({
            key: 'isshow',
            success: function (res) {
              that.setData({
                isshow: res.data,
              });
            },
          });
          wx.getStorage({
            key: 'user_id',
            success: function (res) {
              that.setData({
                user_id: res.data,
              });
            },
          });
        } else {
          that.setData({
            isshow: false
          });
          wx.removeStorage({
            key: 'isshow',
            success: function (res) {
              console.log(res);
            },
          });
          wx.removeStorage({
            key: 'token',
            success: function (res) {
              console.log(res);
            },
          });
          wx.removeStorage({
            key: 'user_id',
            success: function (res) {
              that.setData({
                user_id: 0
              });
            },
          });
        }
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