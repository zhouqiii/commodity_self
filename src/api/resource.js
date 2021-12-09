import axios from 'axios';
import { get, post } from '@/utils/request';
// 饮品页获取所有种类数据
export const getAllList = () => post('/dsmsmqsc/cgi');

export const getList = (params) => get('/dsmsmqsc/cgi', params);
// 本地mock数据先看一下需求是否满足
export const getAllListMock = () => axios.get('/mock/index.json');
