import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    message,
} from 'antd';
import {
    getTokenHeader
} from '../utils/utils';
const {
    GET_TAG_SUCCESS,
    GET_TAG_FAILURE
} = actions;
const baseUrl = configs.baseUrl;

export function getTag(query) {
    query = query ? query : '';
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/tags/tags.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_TAG_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_TAG_FAILURE,
                error: new Error('标签获取失败, 请稍后再试')
            });
        }
    };
};