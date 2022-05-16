import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { RequestInterceptors, RequestConfig, BaseResponseType } from './type'
import { Toast } from 'vant'
import router from '@src/router'

class configrequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors

  constructor(config: RequestConfig) {
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
        console.log('30',config)
        return config
      },
      (err) => {
        return err
      }
    )
    // 所有请求的响应拦截器
    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        return data
      },
      (err) => {
        return err
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
          console.log("63",res)
          const data = (res as any) as BaseResponseType
          if(data.code === 200){
            Toast.success(data.msg)
            resolve(res)
            router.push({ path: '/' })
          }else if(data.code === 401){
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
          reject(err)
          return err
        })
    })
  }

  get<T>(config: RequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
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
