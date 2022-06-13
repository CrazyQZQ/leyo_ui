import axios from 'axios'
import type { AxiosResponse, AxiosInstance } from 'axios'
import type { RequestInterceptors, RequestConfig, BasicException } from './type'
import { BaseResponseType } from "@src/models/common";
import { Toast,Dialog } from 'vant'
import router from '@src/router'
import store from '@src/store'

class configrequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors

  constructor(config: RequestConfig) {
    let loading = true
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    this.interceptors = config.interceptors

    // 使用拦截器
    // 1.从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

    // 所有请求的请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // 加载动画
        if (loading) {
          Toast.loading({
            message: '加载中...',
            forbidClick: true
          })
        }
        // 在此处添加请求头等，如添加 token
        if (config.url !== '/system/client_login' && store.state.auth.token) {
          config.headers['Authorization'] = `Bearer ${store.state.auth.token.access_token}`
        }
        return config
      },
      (err) => {
        return err
      }
    )
    // 所有请求的响应拦截器
    this.instance.interceptors.response.use(
      async (response: AxiosResponse) => {
        // await new Promise(resovle => setTimeout(resovle, 3000))
        Toast.clear()
        const res = response.data
        if (res.code !== 200) {
          Toast.fail(res.msg)
          // 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
          // return Promise.reject(new BasicException(res.code, res.msg || 'Error'))
          return Promise.reject(new Error(res.code || '500'))
        } else {
          // 注意返回值
          return response.data
        }
      },
      (error: any) => {
        Toast.clear()
        if (error && error.response) {
          switch (error.response.status) {
            case 400:
              error.message = '请求错误(400)'
              break
            case 401:
              error.message = '未授权,请登录(401)'
              router.push({ path: '/login' })
              break
            case 403:
              error.message = '拒绝访问(403)'
              break
            case 404:
              error.message = `请求地址出错: ${error.response.config.url}`
              break
            case 405:
              error.message = '请求方法未允许(405)'
              break
            case 408:
              error.message = '请求超时(408)'
              break
            case 500:
              error.message = '服务器内部错误(500)'
              break
            case 501:
              error.message = '服务未实现(501)'
              break
            case 502:
              error.message = '网络错误(502)'
              break
            case 503:
              error.message = '服务不可用(503)'
              break
            case 504:
              error.message = '网络超时(504)'
              break
            case 505:
              error.message = 'HTTP版本不受支持(505)'
              break
            default:
              error.message = `连接错误: ${error.message}`
          }
        } else {
          if (error.message == 'Network Error') {
            error.message == '网络异常，请检查后重试！'
          }
          error.message = '连接到服务器失败，请联系管理员'
        }
        Toast(error.message)
        store.dispatch('clearAuth')
        return Promise.reject(error)
      }
    )
  }

  request<T>(config: RequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          const data = (res as any) as BaseResponseType<T>
          if(data.code === 200){
            resolve(res)
          }else if(data.code === 1004){
            console.log(res)
            Toast.fail("用户未登录！")
            resolve(res)
            router.push({ path: '/login' })
          }else {
            Toast.fail(data.msg)
            resolve(res)
          }
        })
        // 如果有错误返回错误
        .catch((err) => {
          router.push({ path: '/login' })
          // if(err.)
          // reject(err)
          // if(data.code === 1004){
          //   console.log(res)
          //   Toast.fail("用户未登录！")
          //   resolve(err)
          //   router.push({ path: '/login' })
          // }else {
          //   // Toast.fail(data.msg)
          //   resolve(err)
          // }
          return err
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }

  put<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  post<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  patch<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default configrequest
