const access = {
  getLoginState: function(params) {
    wx.getStorage({
      key: 'token',
      success: function (res) {
        console.log(res.data);
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/wxloginstate',
          data: {
            token: res.data
          },
          success: function(res) {
            if (res.data.loginstate ==='login') {
              var loginstate = 'login';
            } else {
              var loginstate = 'nologin';
            }
            if (params && params.success) {
              params.success(loginstate);
            }
          }
        })
      },
    });
  },

  toLogout: function(params) {
    wx.getStorage({
      key: 'token',
      success: function(res) {
        wx.request({
          url: 'http://127.0.0.1:5000/api/v1/wxloginout',
          data: {
            token: res.data
          },
          success: function(res) {
            if (params && params.success) {
              var status = res.data.status;
              params.success(status);
            }
          }
        })
      },
    })
  },
}

export {access}

