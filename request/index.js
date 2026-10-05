import axios from 'axios';
import {
	ElMessage,
	ElLoading
} from 'element-plus';

export default ({
	baseURL,
	tokenName = 'x-auth-token'
}) => {
	const request = axios.create({
		// 所有的请求地址前缀部分(没有后端请求不用写)
		baseURL,
		timeout: 80000, // 请求超时时间(毫秒)
		withCredentials: true, // 异步请求携带cookie
		headers: {
			// 设置后端需要的传参类型
			// 'Content-Type': 'application/json; charset=utf-8',
			// 'token': tokenName,//一开始就要token
			// 'X-Requested-With': 'XMLHttpRequest',
			// 'X-URL-PATH': location.pathname
		},
	})

	// request拦截器
	request.interceptors.request.use(
		config => {
			// 如果你要去localStor获取token,(如果你有)
			// let token = localStorage.getItem("x-auth-token");
			// if (token) {
			// 添加请求头
			//config.headers["Authorization"]="Bearer "+ token
			// }
			// config.headers.clientType = 'qywx'
			return config
		},
		error => {
			// 对请求错误做些什么
			Promise.reject(error)
		}
	)

	// response 拦截器
	request.interceptors.response.use(
		response => {
			// 对响应数据做点什么

			// if (!errorBlackList[path]) {
			//     Toast.fail(data.message || data.msg)
			// }

			return response.data
		},
		error => {
			// 对响应错误做点什么
			// if (error.response) {
			//   const data = error.response.data
			//   if (!errorBlackList[path]) {
			//     Toast.fail(data.message || data.msg)
			//   }
			//       deleteToken()
			//       window.location.href = loginUrl
			// }
			return Promise.reject(error)
		}
	)
	return request
}