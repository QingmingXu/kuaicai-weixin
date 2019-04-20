const access = {
  getStaplesList: function(params){
    wx.request({
      url: 'http://127.0.0.1:5000/api/v1/menus/',
      data: {
        count: 5,
        menu_type: '主食'
      },
      success: function(res){
        var staples = res.data.menus;
        console.log(staples);
        if (params && params.success){
          params.success(staples);
        }
      }
    })
  },
  getSnacksList: function (params) {
    wx.request({
      url: 'http://127.0.0.1:5000/api/v1/menus/',
      data: {
        count: 5,
        menu_type: '小食'
      },
      success: function (res) {
        var snacks = res.data.menus;
        console.log(snacks);
        if (params && params.success) {
          params.success(snacks);
        }
      }
    })
  },
  getDrinksList: function (params) {
    wx.request({
      url: 'http://127.0.0.1:5000/api/v1/menus/',
      data: {
        count: 5,
        menu_type: '饮品'
      },
      success: function (res) {
        var drinks = res.data.menus;
        console.log(drinks);
        if (params && params.success) {
          params.success(drinks);
        }
      }
    })
  }
}

export {access}