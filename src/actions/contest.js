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
    GET_CONTEST_SUCCESS,
    GET_CONTEST_FAILURE,
    ADD_CONTEST_FAILURE,
    ADD_CONTEST_SUCCESS
} = actions;
const baseUrl = configs.baseUrl;

export function getContest(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/contest.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_CONTEST_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_CONTEST_FAILURE,
                error: new Error('比赛列表获取失败, 请稍后再试')
            });
        }
    };
};

export function addContest(context, query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.post(`${baseUrl}/contest.do${query}`, contest, {
                headers: headers
            }));
            dispatch({
                type: ADD_CONTEST_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: ADD_CONTEST_FAILURE,
                error: new Error('比赛创建失败, 请稍后再试')
            });
        }
    };
};