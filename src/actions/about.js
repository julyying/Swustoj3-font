import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    toQuery,
    getTokenHeader
} from '../utils/utils';
const {
    GET_ABOUT_SUCCESS,
    GET_ABOUT_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getAbout(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/about.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_ABOUT_SUCCESS,
                data: data.data,
                code:data.code
            });
        } catch (error) {
            dispatch({
                type: GET_ABOUT_FAILURE,
                error: new Error('关于数据获取失败, 请稍后再试')
            });
        }
    };
};