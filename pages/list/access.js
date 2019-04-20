const access = {
  getStaplesList: function (params) {
    wx.request({
      url: 'http://127.0.0.1:5000/api/v1/menus/',
      data: {
        menu_type: '主食'
      },
      success: function (res) {
        var staples = res.data.menus;
        var nums = staples.length
        if (nums % 2 === 1) {
          staples.push(null);
        }
        console.log(res);
        console.log(staples);
        if (params && params.success) {
          params.success(staples)
        }
      }
    })
  },

  getSnacksList: function (params) {
    wx.request({
      url: 'http://127.0.0.1:5000/api/v1/menus/',
      data: {
        menu_type: '小食'
      },
      success: function (res) {
        var snacks = res.data.menus;
        var nums = snacks.length
        if (nums % 2 === 1) {
          snacks.push(null);
        }
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
        menu_type: '饮品'
      },
      success: function (res) {
        var drinks = res.data.menus;
        var nums = drinks.length
        if (nums % 2 === 1) {
          drinks.push(null);
        }
        if (params && params.success) {
          params.success(drinks);
        }
      }
    })
  }
}

export { access }