//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    title: '简易计算器',
    userInfo: {},
    defaultSize: 'default',
    disabled: false,
    iconType: 'info_circle'
  },
  //事件处理函数
  toCalc: function() {
    wx.navigateTo({
      url: '../calc/calc',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  bindToLog: function() {
    wx.navigateTo({
      url: '../logs/logs',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onLoad: function() {
    console.log("onload");
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      });
    });
  }
})
