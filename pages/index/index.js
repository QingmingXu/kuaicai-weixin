//index.js
import {access} from "access.js"
//获取应用实例
const app = getApp()

Page({
  data: {

  },

  onLoad: function() {
    var that = this;
    access.getStaplesList({
      success: function(staples){
        that.setData({
          staples: staples
        });
      }
    });
    access.getSnacksList({
      success: function (snacks) {
        that.setData({
          snacks: snacks
        });
      }
    });
    access.getDrinksList({
      success: function (drinks) {
        that.setData({
          drinks: drinks
        });
      }
    });
  }
  
})
