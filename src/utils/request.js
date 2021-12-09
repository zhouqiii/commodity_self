import axios from 'axios';
import { Message } from 'element-ui';

const request = axios.create({
  baseURL: '', // process.env.NODE_ENV === 'development' ? 'http://22.187.19.164:9081' : 'http://22.187.19.164:9081', // http://21.123.75.119:9080
  timeout: 15000,
  withCredentials: true,
  // async: false
});
// 请求拦截函数
function interceptorsRequest(config) {
  return config;
}
// 响应拦截函数
function interceptorsResponse(res) {
  if (res.status === 200) {
    if (res.data.stat) {
      if (res.data.stat === '00') {
        return res.data;
      }
      Message({
        message: res.data.result,
        type: 'error',
      });
    }
  } else {
    Message({
      message: '连接服务器出错了',
      type: 'error',
    });
  }
  return res;// Promise.reject(res.data.message);
}
// 请求异常处理
const errHandlerRequest = (error) => {
  Message({
    message: '连接服务器出错了',
    type: 'error',
  });
  return Promise.reject(error);
};
// 响应异常处理
const errHandlerResponse = (error) => {
  Message({
    message: '连接服务器出错了',
    type: 'error',
  });
  return Promise.reject(error);
};
request.interceptors.request.use(interceptorsRequest, errHandlerRequest);
request.interceptors.response.use(interceptorsResponse, errHandlerResponse);

function get(url, params) {
  return request({
    url,
    method: 'get',
    params,
  });
}
function post(url, data) {
  return request({
    url,
    method: 'post',
    data,
  });
}

export default request;
export {
  post,
  get,
};
