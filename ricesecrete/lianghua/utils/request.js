// src/utils/request.js
import config from './config';
import { login } from '@/permission';

class Request {
	constructor() {
		this.baseUrl = config.baseUrl;
		this.timeout = config.timeout;
		this.tokenKey = config.tokenKey;
		this.requestInterceptors = []; // 请求拦截器数组
		this.responseInterceptors = []; // 响应拦截器数组
	}

	// 添加请求拦截器
	addRequestInterceptor(interceptor) {
		this.requestInterceptors.push(interceptor);
		return this;
	}

	// 添加响应拦截器
	addResponseInterceptor(interceptor) {
		this.responseInterceptors.push(interceptor);
		return this;
	}

	// 执行请求拦截器
	async runRequestInterceptors(options) {
		let newOptions = {
			...options
		};
		for (const interceptor of this.requestInterceptors) {
			newOptions = await interceptor(newOptions);
		}
		return newOptions;
	}

	// 执行响应拦截器
	async runResponseInterceptors(response) {
		let newResponse = {
			...response
		};
		for (const interceptor of this.responseInterceptors) {
			newResponse = await interceptor(newResponse);
		}
		return newResponse;
	}

	// 基础请求方法
	async request(options) {
		try {
			// 应用请求拦截器
			const interceptedOptions = await this.runRequestInterceptors({
				...options,
				url: options.url.startsWith('http') ? options.url : this.baseUrl + options.url
			});

			// 执行请求
			const response = await new Promise((resolve, reject) => {
				// uni.showLoading({
				// 	title: '加载中...',
				// });
				uni.request({
					...interceptedOptions,
					success: (res) => resolve(res),
					fail: (err) => reject(err),
					complete: (com) => { }
				});
			});
			// uni.hideLoading();
			// 应用响应拦截器
			const interceptedResponse = await this.runResponseInterceptors(response);
			// console.log('响应结果:', interceptedResponse);
			// uni.hideLoading();
			return interceptedResponse;
		} catch (error) {
			// uni.hideLoading();
			// 统一错误处理
			this.handleError(error);
			throw error;
		}
	}

	// 处理错误
	async handleError(error) {
		console.log('请求错误:', error);
		if (error.statusCode == 401 || error.statusCode == 402) {
			return;
		}
		if (error.message) {
			// 网络错误
			uni.showToast({
				title: error.message,
				icon: 'none', // 不使用图标，因为数字无法用图标表示
				duration: 2000
			})
		} else {
			// 未知错误
			uni.showToast({
				title: '未知错误，请重试',
				icon: 'none', // 不使用图标，因为数字无法用图标表示
				duration: 2000
			})
		}
	}

	// 便捷方法: GET请求
	get(url, data = {}, options = {}) {
		return this.request({
			url,
			data,
			method: 'GET',
			...options
		});
	}

	// 便捷方法: POST请求
	post(url, data = {}, options = {}) {

		return this.request({
			url,
			data,
			method: 'POST',
			...options
		});
	}

	// 便捷方法: PUT请求
	put(url, data = {}, options = {}) {
		return this.request({
			url,
			data,
			method: 'PUT',
			...options
		});
	}

	// 便捷方法: DELETE请求
	delete(url, data = {}, options = {}) {
		// 如果有数据，将其作为查询参数附加到URL上
		let fullUrl = url;
		if (data && Object.keys(data).length > 0) {
			const queryParams = new URLSearchParams(data).toString();
			fullUrl += (url.includes('?') ? '&' : '?') + queryParams;
		}
		
		return this.request({
			url: fullUrl,
			method: 'DELETE',
			...options
		});
	}
}

// 创建单例实例
const request = new Request();

// 添加默认请求拦截器 - 处理Token
request.addRequestInterceptor((options) => {
	const token = uni.getStorageSync('token');
	if (token) {
		options.header = {
			...options.header,
			// [request.tokenKey]:  'Bearer '+ 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJvTHdaYjdNRjZ4TGN4WDZPWlREWDBnTU1wMnVNIiwidW5pb25pZCI6bnVsbCwib3BlbmlkIjoib0x3WmI3TUY2eExjeFg2T1pURFgwZ01NcDJ1TSIsImV4cCI6MTc1MDMzMTM5OCwiaWF0IjoxNzUwMzI3Nzk4LCJqdGkiOiI5ZmZiZjVlYS1jNGY1LTRjZWMtYTI4OC02MzkyN2MzN2FmMGYiLCJsb2dpbl91c2VyX2tleSI6IjlmZmJmNWVhLWM0ZjUtNGNlYy1hMjg4LTYzOTI3YzM3YWYwZiJ9.8j9OonnYeRtfCL1NgNWLRheXh-0Q9nahjzlurt_cOyd5NFkWJDhFyGGtwzi6nui_lYsaOjE56yj2n58kv1t6pA'
			[request.tokenKey]: 'Bearer ' + token
		};
	}
	return options;
});

// 添加默认响应拦截器 - 处理状态码
request.addResponseInterceptor(async (response) => {
	// console.log('响应拦截器', response);

	const {
		statusCode,
		data
	} = response;
	if (statusCode === 401 || statusCode === 402) {
		// 清除token
		if (uni.getStorageSync('token')) {
			uni.removeStorageSync('token');
			console.log('清除token',uni.getStorageSync('token'));
			uni.showModal({
				title: '提示',
				content: '登录已过期，请重新登录',
				confirmText: '立即登录',
				success: async (res) => {
					if (res.confirm) {
						try {
							const loginResult = await login();
							if (loginResult.success) {
								const pages = getCurrentPages();
								const currentPage = pages[pages.length - 1];
								const options = currentPage.options || {};

								if (currentPage.route) {
									uni.redirectTo({
										url: `/${currentPage.route}?${Object.entries(options)
											.map(([key, val]) => `${key}=${val}`)
											.join('&')}`
									});
								}
							}
						} catch (err) {
							console.error('登录失败:', err);
						}
					}
				}
			});
		}

		return
	}

	// HTTP状态码处理
	if (statusCode !== 200) {
		throw {
			statusCode,
			message: `HTTP错误 ${statusCode}`
		};
	}

	// 业务状态码处理 (根据后端约定)
	if (data.code && data.code !== 200) {
		throw {
			code: data.code,
			message: data.msg || '业务错误',
			data: data.data
		};
	}



	return data.data || data; // 返回实际数据部分
});

export default request;