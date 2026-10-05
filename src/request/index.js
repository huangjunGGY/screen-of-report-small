import axios from 'axios';
import {
	ElMessage,
	ElLoading
} from 'element-plus';
import { getMockFallback } from './mockFallback';

export default ({
	baseURL,
	tokenName = 'x-auth-token'
}) => {
	const request = axios.create({
		baseURL,
		timeout: 80000,
		withCredentials: true,
		headers: {}
	});

	// request拦截器
	request.interceptors.request.use(
		config => {
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	// response 拦截器
	request.interceptors.response.use(
		response => {
			return response.data;
		},
		error => {
			// 在生产纯静态环境（如 GitHub Pages 无 Node 后台托管）网络 404 时自动无感兜底
			const fallbackData = getMockFallback(error.config);
			if (fallbackData) {
				return Promise.resolve(fallbackData);
			}
			return Promise.reject(error);
		}
	);
	return request;
};