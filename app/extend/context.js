module.exports = {
 /**
   * 返回客户端内容
   * @param status // 返回状态
   * @param message // 返回内容
   * @param data // 返回数据
   */
  returnBody (status, message, data) {
    this.status = status;
    this.body = {
      data,
      message,
      success: true,
      code: 200
    };
  },
}