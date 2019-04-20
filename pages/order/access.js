const access = {
  getOrderList: function(params) {
    wx.getStorage({
      key: 'user_id',
      success: function(res) {
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getuserorders',
          data: {
            user_id: res.data
          },
          success: function (res) {
            var orders = res.data.orders;
            if (params && params.success) {
              params.success(orders);
            }
          }
        })
      },
    });
  },

  getWaitPayOrderList: function(params) {
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getwaitpayorders',
          data: {
            user_id: res.data,
            status: '未支付'
          },
          success: function (res) {
            var orders = res.data.orders;
            if (params && params.success) {
              params.success(orders);
            }
          }
        })
      },
    });
  },

  getWaitConfirmOrderList: function (params) {
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getwaitconfrimorders',
          data: {
            user_id: res.data,
            status: '已支付'
          },
          success: function (res) {
            var orders = res.data.orders;
            if (params && params.success) {
              params.success(orders);
            }
          }
        })
      },
    });
  },

  getFinishOrderList: function (params) {
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getfinishorders',
          data: {
            user_id: res.data,
            status: '配送成功'
          },
          success: function (res) {
            var orders = res.data.orders;
            if (params && params.success) {
              params.success(orders);
            }
          }
        })
      },
    });
  },

  getCancelOrderList: function (params) {
    wx.getStorage({
      key: 'user_id',
      success: function (res) {
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/getcancelorders',
          data: {
            user_id: res.data,
            status: '已取消'
          },
          success: function (res) {
            var orders = res.data.orders;
            if (params && params.success) {
              params.success(orders);
            }
          }
        })
      },
    });
  },
}

export {access}