// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/reset.css'
import '../static/js/rem'

// 把封装的axios挂载到原型上
import baseJS from './api'
Vue.prototype.baseJs = baseJS

Vue.config.productionTip = false
// 记账类别中的日期处理 只显示年月日
Vue.prototype.dateTime = function(){
	  let date = new Date();
	  let year = date.getFullYear();
	  let month = date.getMonth() + 1;
	  if (month < 10) { month = '0' + month };
	  let day = date.getDate();
	  if (date < 10) { date = '0' + date };
	  let time = year + "-" + month + "-" + day;
	  return time
};
// 处理返回来的日期格式 
Vue.prototype.formatDate = function(secs) {
    var t = new Date(secs)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
	if (month < 10) { month = '0' + month };
    var date = t.getDate()
	 if (date < 10) { date = '0' + date };
    return year + '-' + month + '-' + date;
};

//记账提醒中 处理日期 显示年月日时分
Vue.prototype.getTime = function() {
	var date = new Date()
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	var hour = date.getHours()
	var minute = date.getMinutes()
	if (minute < 10) { minute = '0' + minute }
	return year + '-' + month + '-' + day + ' ' + hour + ':' + minute 
};
// 处理返回来的日期格式
Vue.prototype.formatDateMin =function(time) {
    var t = new Date(time)
    var year = t.getFullYear()
    var month = t.getMonth() + 1
    var date = t.getDate()
    var hour = t.getHours()
    var minute = t.getMinutes()
    if (minute < 10) { minute = '0' + minute }
    return year + '-' + month + '-' + date + ' ' + hour + ':' + minute 
};
// 首页和详情页 处理返回来的日期
Vue.prototype.format = function(fmt) {
    var t = new Date(fmt.replace(/-/g, '/'));
    var year = t.getFullYear()
    var month = t.getMonth() + 1
	if (month < 10) { month = '0' + month };
    var date = t.getDate()
	 if (date < 10) { date = '0' + date };
    return year + '-' + month + '-' + date;
};

import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);

import { DatetimePicker } from 'mint-ui';
Vue.component(DatetimePicker.name, DatetimePicker);

import { Switch } from 'mint-ui';
Vue.component(Switch.name, Switch);

import { Picker } from 'mint-ui';
Vue.component(Picker.name, Picker);

import { Progress } from 'mint-ui';
Vue.component(Progress.name, Progress);

import echarts from 'echarts' //引入echarts
Vue.prototype.$echarts = echarts //引入组件

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
