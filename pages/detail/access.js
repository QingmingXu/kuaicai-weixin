const access = {
  getDetail: function (params) {
    var id = params.id;
    var type = params.type;
    var url = 'http://127.0.0.1:5000/api/v1/menus/' + id;
    wx.request({
      url: url,
      success: function (res) {
        console.log(res);
        var item = res.data;
        if (params && params.success) {
          params.success(item);
        }
      }
    })
  }

}

export { access }