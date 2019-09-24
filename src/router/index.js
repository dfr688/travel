import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home'
import Detail from '@/components/detail/Detail'
import Addcontent from '@/components/home/Addcontent'
import ChooseType from '@/components/detail/ChooseType'
import My from '@/components/my/My'
import Remind from '@/components/my/Remind'
import Feedback from '@/components/my/Feedback'
import ModifyPsd from '@/components/my/ModifyPsd'
import Login from '@/components/login/Login'
import Register from '@/components/login/Register'
import Stats from '@/components/stats/Stats'
import TypeDetail from '@/components/stats/TypeDetail'
import PayDetail from '@/components/stats/PayDetail'
import Privacy from '@/components/login/Privacy'
import { Toast } from 'mint-ui'

Vue.use(Router)

const router = new Router({
  routes: [
		{
		  path: '/',
		  redirect: '/home'
		},
		{
			path: '/home',
			component: Home
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: Detail
		},
		{
			path: '/addcontent',
			component: Addcontent,
			meta: {
			 	requiresAuth: true
			}
		},
		{
			path: '/choosetype/:id',
			name: 'choosetype',
			component: ChooseType
		},
		{
			path: '/my',
			component: My
		},
		{
			path: '/remind',
			component: Remind
		},
		{
			path: '/feedback',
			component: Feedback
		},
		{
			path: '/modifypsd',
			component: ModifyPsd
		},
		{
			path: '/login',
			component: Login
		},
		{
			path: '/register',
			component: Register
		},
		{
			path: '/stats',
			component: Stats,
			meta: {
			 	requiresAuth: true
			}
		},
		{
			path: '/privacy',
			component: Privacy
		}
  ]
});
//  路由权限控制 进入Detail组件时候 需要登录状态
    	router.beforeEach((to,from,next) => {
 		// console.log(to.meta.requiresAuth)
 		if(to.meta.requiresAuth){
 			// 如果不为空 说明已经登录 直接放行
 			if(localStorage.getItem("token") != null){
 				next();
 			}else{
				Toast('请先登录!');
 				next({path: "/login"});
 			}
 		}else{
 			next();
 		}
    	});
		
export default router;