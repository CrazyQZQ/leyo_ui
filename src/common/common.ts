const defaultErrorImage = 'http://124.221.239.207:9000/qqcloud/common/load-fail.png';

class BasicException extends Error {
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
        // Object.setPrototypeOf(this, BasicException.prototype);
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

export { defaultErrorImage,BasicException };