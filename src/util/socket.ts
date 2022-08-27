/**
 * @description 创建实例并
 * @param {*} topic topic
 * @returns websocket实例
 */
let client: WebSocket | null = null
const connectSocket = (userId: number) => {
  const baseUrl = import.meta.env.VITE_APP_WS_URL
  const wsUrl = `ws://localhost:8700/system/websocket/endpoint/${userId}`
  console.log(wsUrl);
  if (client) {
    return client
  } else {
    client = new WebSocket(wsUrl)
  }
  return client
}

export default connectSocket