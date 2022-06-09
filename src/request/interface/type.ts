import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface RequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (error: any) => any
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: RequestInterceptors<T>
}

export class BasicException extends Error {
  protected code: string = '';
  protected msg: string | undefined = '';

  /**
   * 构造器函数 如果子类继承了该基类，请在子类构造器中依次执行super()
   * @param code 业务状态码
   * @param msg 错误明细
   */
  constructor(code: number, msg: string) {
    super(msg);
    this.code = code;
    this.msg = msg;
  }

  /**
   * 获取错误状态码
   */
  public getCode() {
    return this.code;
  }

  //获取错误码中文描述
  public getMsg() {
    return this.msg;
  }
}

