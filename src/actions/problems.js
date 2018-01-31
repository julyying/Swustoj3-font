import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    message,
} from 'antd';
import {
    toQuery,
    getTokenHeader
} from '../utils/utils';

const {
    GET_PROBLEMS_FAILURE,
    GET_PROBLEMS_SUCCESS,
    GET_PROBLEM_SUCCESS,
    GET_PROBLEM_FAILURE,
    UPDATE_PROBLEM_SUCCESS,
    UPDATE_PROBLEM_FAILURE,
    DELETE_PROBLEMS_SUCCESS,
    DELETE_PROBLEMS_FAILURE,
    ADD_PROBLEM_SUCCESS,
    ADD_PROBLEM_FAILURE,
    COLLECT_PROBLEM_SUCCESS,
    COLLECT_PROBLEM_FAILURE,
    GET_CONTEST_PROBLEMS_SUCCESS,
    GET_CONTEST_PROBLEMS_FAILURE
} = actions;
const baseUrl = configs.baseUrl;

export function getProblems(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/problem.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_PROBLEMS_SUCCESS,
                data: data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_PROBLEMS_FAILURE,
                error: new Error('题目列表获取失败, 请稍后再试')
            });
        }
    };
};

export function getContestProblems(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/contest/problem.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_CONTEST_PROBLEMS_SUCCESS,
                data: data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_CONTEST_PROBLEMS_FAILURE,
                error: new Error('题目列表获取失败, 请稍后再试')
            });
        }
    };
};

export function deleteProblems(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.delete(`${baseUrl}/problem.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: DELETE_PROBLEMS_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: DELETE_PROBLEMS_FAILURE,
                error: new Error('题目删除失败, 请稍后再试')
            });
        }
    };
};

export function getProblem(id) {
    return async(dispatch) => {
        try {
            let headers = {};
            if (!!localStorage.token) {
                var token = localStorage.token;
                headers = {
                    'Authorization': `Bearer ${token}`
                };
            }
            const data = (await axios.get(`${baseUrl}/problem.do?ids=${id}&tagsReturn=2&page=1&rows=1`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_PROBLEM_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_PROBLEM_FAILURE,
                error: new Error('题目获取失败, 请稍后再试')
            });
        }
    };
};

export function updateProblem(form, query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.put(`${baseUrl}/problem.do${query}`, form, {
                'headers': headers
            })).data;
            dispatch({
                type: UPDATE_PROBLEM_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: UPDATE_PROBLEM_FAILURE,
                error: new Error('题目更新失败, 请稍后再试')
            });
        }
    };
}

// 添加题目无需通过action改变试图   不dispatch action
export function addProblem(problem) {

    let headers = getTokenHeader({});
    return axios.post(`${baseUrl}/problem.do`, problem, headers);
}


export function collectProblem(ProblemCollect, query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.post(`${baseUrl}/user/problem/collect.do${query}`, ProblemCollect, {
                headers: headers
            })).data;
            dispatch({
                type: COLLECT_PROBLEM_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: COLLECT_PROBLEM_FAILURE,
                error: new Error('收藏题目失败, 请稍后再试')
            });
        }
    };
};