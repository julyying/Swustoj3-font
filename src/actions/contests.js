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
    GET_CONTESTS_SUCCESS,
    GET_CONTESTS_FAILURE,
    GET_CONTESTS_PROBLEMS_SUCCESS,
    GET_CONTESTS_PROBLEMS_FAILURE,
    GET_CONTESTS_STATISTICS_SUCCESS,
    GET_CONTESTS_STATISTICS_FAILURE,
    GET_CONTESTS_RANKLIST_SUCCESS,
    GET_CONTESTS_RANKLIST_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;

export function getContests(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/contest.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_CONTESTS_SUCCESS,
                data: data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_CONTESTS_FAILURE,
                error: new Error('比赛列表获取失败, 请稍后再试')
            });
        }
    };
};


export function getContestsProblems(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/contest/problem.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_CONTESTS_PROBLEMS_SUCCESS,
                data: data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_CONTESTS_PROBLEMS_FAILURE,
                error: new Error('比赛题目列表获取失败, 请稍后再试')
            });
        }
    };
};

export function getContestsStatistics(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/contest/statistic.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_CONTESTS_STATISTICS_SUCCESS,
                data: data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_CONTESTS_STATISTICS_FAILURE,
                error: new Error('比赛统计获取失败, 请稍后再试')
            });
        }
    };
};



export function getContestsRanklist(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/contest/ranklist.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_CONTESTS_RANKLIST_SUCCESS,
                data: data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_CONTESTS_RANKLIST_FAILURE,
                error: new Error('比赛统计获取失败, 请稍后再试')
            });
        }
    };
};