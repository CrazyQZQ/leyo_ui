import axios from 'axios'
import type { AxiosResponse, AxiosInstance } from 'axios'
import type { RequestInterceptors, RequestConfig } from './type'
import { BaseResponseType } from "@src/models/common";
import { Toast,Dialog } from 'vant'
import router from '@src/router'
import store from '@src/store'
import * as Types from '@src/store/modules/login/types'
import { BasicException } from '@src/common/common'

class configrequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors

  constructor(config: RequestConfig) {
    // let loading = true
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
        if (store.state.cacheInfo.loading) {
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
        if(!store.state.cacheInfo.loading){
          Toast.clear()
        }
        // Some example codes here:
        // code == 200: success
        // code == 1000：业务异常
        // code == 1001：客户端认证失败
        // code == 1002：用户名或密码错误
        // code == 1003：不支持的认证模式
        // code == 1004: token失效、过期
        // code == 1005：无权限访问
        const res = response.data
        if (res.code !== 200) {
          if (res.code === 1004) {
            store.dispatch('auth/LOGOUT')
            Dialog.alert({
              title: '提醒',
              message: '登录已过期，请重新登录',
              theme: 'round-button',
            }).then(() => {
              router.push('/login')
            });
          }
          // 若后台返回错误值，此处返回对应错误对象，下面 error 就会接收
          return Promise.reject(new BasicException(res.code, res.msg || 'Error'))
        } else {
          // 注意返回值
          return response.data
        }
      },
      (error: any) => {
        Toast.clear()
        Toast(error.msg)
        store.dispatch('auth/LOGOUT')
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
          } else {
            Toast.fail(data.msg)
            resolve(res)
          }
        })
        // 如果有错误返回错误
        .catch((err) => {
          Toast.fail(err.getMsg())
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
