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
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	UPDATE_USER_FAILURE,
	UPDATE_USER_SUCCESS,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,
	CODE_SUCCESS,
	CODE_ERROR,
	GET_CHALLENGE_PROBLEM_SUCCESS,
	GET_CHALLENGE_PROBLEM_FAILURE,
} = actions;

const baseUrl = configs.baseUrl;

export function userRegister(form, query = '') {
	return async(dispatch) => {
		try {
            let headers = getTokenHeader({});
			const data = (await axios.post(`${baseUrl}/user.do${query}`, form, {
                headers: headers
            })).data;
			if (data.code == 'SUCCESS') {
				if (!!data.access_token) {
					localStorage.setItem('token', data.access_token);
				}
			}

			dispatch({
				type: USER_REGISTER_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: USER_REGISTER_FAILURE,
				error: new Error('用户注册失败，请稍后再试')
			});
		}
	}
}

export function userLogin(query = '') {
	return async(dispatch) => {
		try {
            let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/login.do${query}`, {
                headers: headers
            })).data;
			if (data.code == 'LOGIN_SUCCESS') {
				if (!!data.access_token) {
					localStorage.setItem('token', data.access_token);
				}
			}

			dispatch({
				type: USER_LOGIN_SUCCESS,
				data: data

			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: USER_LOGIN_FAILURE,
				error: new Error('用户登录失败，请稍后再试')
			});
		}
	}
}

export function updataUser(form, query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.put(`${baseUrl}/user.do${query}`, form, {
				headers: headers
			})).data;
			dispatch({
				type: UPDATE_USER_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: UPDATE_USER_FAILURE,
				error: new Error('用户更新失败，请稍后再试')
			});
		}
	}
}

export function getUser(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user.do${query}`, {
				headers: headers
			})).data;
			dispatch({
				type: GET_USER_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_USER_FAILURE,
				error: new Error('用户查询失败，请稍后再试')
			});
		}
	}
}

export function getchallengeproblem(query = '') {
	return async(dispatch) => {
		try {
			/*let headers = {};
			if (!!localStorage.token) {
				var token = localStorage.token;
				headers = {
					'Authorization': `Bearer ${token}`
				};
			}
			const data = (await axios.get(`${baseUrl}/user/problem/challenging.do${query}`, {
				headers: headers
			})).data;*/
            let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/problem/challenging.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_CHALLENGE_PROBLEM_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_CHALLENGE_PROBLEM_FAILURE,
				error: new Error('正在挑战的题目获取失败, 请稍后再试')
			});
		}
	};
};