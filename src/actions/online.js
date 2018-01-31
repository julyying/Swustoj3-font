import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    toQuery,
    getTokenHeader
} from '../utils/utils';
const {
    GET_ONLINE_SUCCESS,
    GET_ONLINE_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getOnline(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/online.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_ONLINE_SUCCESS,
                data: data.data,
                code:data.code
            });
        } catch (error) {
            dispatch({
                type: GET_ONLINE_FAILURE,
                error: new Error('在线数据获取失败, 请稍后再试')
            });
        }
    };
};