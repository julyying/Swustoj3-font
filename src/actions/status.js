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
	GET_STATUS_SUCCESS,
	GET_STATUS_FAILURE,

	GET_CODESOURCE_SUCCESS,
	GET_CODESOURCE_FAILURE,

	GET_DAY_SUBMIT_SUCCESS,
	GET_DAY_SUBMIT_FAILURE,
	GET_ALL_SUBMIT_SUCCESS,
	GET_ALL_SUBMIT_FAILURE,
	GET_ALL_PROBLEM_SUCCESS,
	GET_ALL_PROBLEM_FAILURE,

	GET_ONLINENUM_SUCCESS,
    GET_ONLINENUM_FAILURE,

    GET_ALL_USERNUM_SUCCESS,
    GET_ALL_USERNUM_FAILURE,


} = actions;
const baseUrl = configs.baseUrl;
export function getStatus(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/submit.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_STATUS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_STATUS_FAILURE,
				error: new Error('状态列表获取失败, 请稍后再试')
			});
		}
	};
};


export function getCode(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/submit/detail.do${query}`, {
				headers: headers
			})).data;
			dispatch({
				type: GET_CODESOURCE_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_CODESOURCE_FAILURE,
				error: new Error('状态列表获取失败, 请稍后再试')
			});
		}
	};
};

export function getDaySubmit(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/submit/todayCount.do${query}`, {
                headers: headers
            })).data;
			//debugger;
			dispatch({
				type: GET_DAY_SUBMIT_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_DAY_SUBMIT_FAILURE,
				error: new Error('今日提交量获取失败, 请稍后再试')
			});
		}
	};
};

export function getAllSubmit(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/submit/count.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_ALL_SUBMIT_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_ALL_SUBMIT_FAILURE,
				error: new Error('总提交量获取失败, 请稍后再试')
			});
		}
	};
};

export function getAllProblem(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/problem/count.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_ALL_PROBLEM_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_ALL_PROBLEM_FAILURE,
				error: new Error('题目总数获取失败, 请稍后再试')
			});
		}
	};
};

export function getallusernum(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/total.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_ALL_PROBLEM_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_ALL_PROBLEM_FAILURE,
				error: new Error('题目总数获取失败, 请稍后再试')
			});
		}
	};
};


export function getonlinenum(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/online/total.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_ONLINENUM_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_ONLINENUM_FAILURE,
				error: new Error('在线人数获取失败, 请稍后再试')
			});
		}
	};
};
