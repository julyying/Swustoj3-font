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
	GET_USERS_SUCCESS,
	GET_USERS_FAILURE,
	GET_USERS_BYTIME_SUCCESS,
	GET_USERS_BYTIME_FAILURE,
	SUBMIT_CODE_SUCCESS,
	SUBMIT_CODE_ERROR
} = actions;

const baseUrl = configs.baseUrl;

export function getUsers(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user.do${query}`, {
				headers: headers
			})).data;

			dispatch({
				type: GET_USERS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_USERS_FAILURE,
				error: new Error('用户列表获取失败，请稍后再试')
			});
		}
	}
}

export function getUsersByTime(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/submit/statistic.do${query}`, {
				headers: headers
			})).data;
			dispatch({
				type: GET_USERS_BYTIME_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_USERS_BYTIME_FAILURE,
				error: new Error('获取用户排名失败，请稍后再试')
			});
		}
	}
}

export function submitCode(form, query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.post(`${baseUrl}/submit.do${query}`, form, {
				headers: headers
			})).data;
			dispatch({
				type: SUBMIT_CODE_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: SUBMIT_CODE_ERROR,
				error: new Error('用户代码提交失败，请稍后再试')
			});
		}
	}
}