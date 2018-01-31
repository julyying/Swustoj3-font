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
	GET_ROAD_SUCCESS,
	GET_ROAD_FAILURE,
	UPDATE_PASSWORD_FAILURE,
	UPDATE_PASSWORD_SUCCESS,
	GETBACK_PASSWORD_FAILURE,
	GETBACK_PASSWORD_SUCCESS,

	GET_OWN_STATUS_SUCCESS,
	GET_OWN_STATUS_FAILURE,
	GET_OWN_CONTESTS_SUCCESS,
	GET_OWN_CONTESTS_FAILURE,


	GET_OWN_CHALLENGING_SUCCESS,
	GET_OWN_CHALLENGING_FAILURE,

	GET_OWN_COLLECTION_SUCCESS,
	GET_OWN_COLLECTION_FAILURE,


	GET_OWN_TAGS_SUCCESS,
	GET_OWN_TAGS_FAILURE,
	GET_PROBLEM_ADD_NOTE_SUCCESS,
	GET_PROBLEM_ADD_NOTE_FAILURE,
	GET_PROBLEM_NOTE_SUCCESS,
	GET_PROBLEM_NOTE_FAILURE,
	GET_DELETE_PROBLEM_NOTE_SUCCESS,
	GET_DELETE_PROBLEM_NOTE_FAILURE,
	UPDATE_PROBLEM_NOTE_SUCCESS,
	UPDATE_PROBLEM_NOTE_FAILURE,

} = actions;

const baseUrl = configs.baseUrl;

export function getRoad(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/submit/milestone.do${query}`, {
				headers: headers
			})).data;

			dispatch({
				type: GET_ROAD_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_ROAD_FAILURE,
				error: new Error('用户历程获取失败，请稍后再试')
			});
		}
	}
}

export function updataPassword(form, query = '') {
	return async(dispatch) => {
		try {
			let headers = {};
			var num = location.href.indexOf("?");
			var hash = location.href.indexOf("_k=");
			if (num > -1) {
				var str = location.href.substring(num + 1, hash - 1);
				headers = {
					'Authorization': `Bearer ${str}`
				}
			}
			const data = (await axios.put(`${baseUrl}/user/resetPasswd.do${query}`, form, {
				headers: headers
			})).data;

			dispatch({
				type: UPDATE_PASSWORD_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: UPDATE_PASSWORD_FAILURE,
				error: new Error('用户修改密码失败，请稍后再试')
			});
		}
	}
}
export function getBackPassword(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/resetPasswd.do${query}`, {
                headers: headers
            })).data;

			dispatch({
				type: GETBACK_PASSWORD_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GETBACK_PASSWORD_FAILURE,
				error: new Error('用户邮箱认证身份失败，请稍后再试')
			});
		}
	}
}


export function getOwnAc(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/problem/ac.do${query}`, {
                headers: headers
            })).data;

			dispatch({
				type: GET_OWN_STATUS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_OWN_STATUS_FAILURE,
				error: new Error('个人状态列表获取失败, 请稍后再试')
			});
		}
	};
};


export function getOwnChallenging(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/problem/challenging.do${query}`, {
                headers: headers
            })).data;
			//debugger;
			dispatch({
				type: GET_OWN_CHALLENGING_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_OWN_CHALLENGING_FAILURE,
				error: new Error('个人状态列表获取失败, 请稍后再试')
			});
		}
	};
};

export function getOwnContests(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/contest/user/statistic.do${query}`, {
                headers: headers
            })).data;

			dispatch({
				type: GET_OWN_CONTESTS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			message.error('哦哦～服务器出问题咯！');
			dispatch({
				type: GET_OWN_CONTESTS_FAILURE,
				error: new Error('个人比赛获取失败, 请稍后再试')
			});
		}
	};
};

export function getOwnCollection(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/user/problem/collect.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_OWN_COLLECTION_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_OWN_COLLECTION_FAILURE,
				error: new Error('个人收藏获取失败, 请稍后再试')
			});
		}
	};
};

export function addnote(form, query = '') {
	return async(dispatch) => {
		try {
			let headers = {};
			if (!!localStorage.token) {
				var token = localStorage.token;
				headers = {
					'Authorization': `Bearer ${token}`
				};
			}
			const data = (await axios.post(`${baseUrl}/problem/note.do${query}`, form, {
				headers: headers
			})).data;
			//debugger;
			dispatch({
				type: GET_PROBLEM_ADD_NOTE_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_PROBLEM_ADD_NOTE_FAILURE,
				error: new Error('问题笔记添加失败，请稍后再试')
			});
		}
	}
};

export function getnote(query = '') {
	return async(dispatch) => {
		try {
			let headers = {};
			if (!!localStorage.token) {
				var token = localStorage.token;
				headers = {
					'Authorization': `Bearer ${token}`
				};
			}
			const data = (await axios.get(`${baseUrl}/problem/note.do${query}`, {
				headers: headers
			})).data;
			//debugger;
			dispatch({
				type: GET_PROBLEM_NOTE_SUCCESS,
				data: data.data.pagingList,
				code: data.code
			});
		} catch (error) {
			dispatch({
				type: GET_PROBLEM_NOTE_FAILURE,
				error: new Error('问题笔记获取失败, 请稍后再试')
			});
		}
	};

};

export function deteleproblemnote(query = '') {
	return async(dispatch) => {
		try {
			let headers = {};
			if (!!localStorage.token) {
				var token = localStorage.token;
				headers = {
					'Authorization': `Bearer ${token}`
				};
			}
			const data = (await axios.delete(`${baseUrl}/problem/note.do${query}`, {
				headers: headers
			})).data;
			//const data = (await axios.delete(`${baseUrl}/problem/note.do${query}`)).data;
			dispatch({
				type: GET_DELETE_PROBLEM_NOTE_SUCCESS,
				data: data
			});
		} catch (error) {
			dispatch({
				type: GET_DELETE_PROBLEM_NOTE_FAILURE,
				error: new Error('问题笔记删除失败, 请稍后再试')
			});
		}
	};
};

export function updataproblemnote(form,query = '') {
	return async(dispatch) => {
		try {
			let headers = {};
			if (!!localStorage.token) {
				var token = localStorage.token;
				headers = {
					'Authorization': `Bearer ${token}`
				};
			}
			const data = (await axios.put(`${baseUrl}/problem/note.do${query}`, form, {
				headers: headers
			})).data;

			dispatch({
				type: UPDATE_PROBLEM_NOTE_SUCCESS,
				data: data
			});
		} catch (error) {
			message.error('哦哦～服务器出aproblemnote问题咯！');
			dispatch({
				type: UPDATE_PROBLEM_NOTE_FAILURE,
				error: new Error('问题笔记更新失败，请稍后再试')
			});
		}
	}
}