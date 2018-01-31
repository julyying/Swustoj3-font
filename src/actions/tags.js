import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    message,
} from 'antd';
import {
    getTokenHeader,
    handleError
} from '../utils/utils';
const {
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    GET_TAGS_All_SUCCESS,
    GET_TAGS_All_FAILURE,
    ADD_TAGS_SUCCESS,
    ADD_TAGS_FAILURE,
    GET_OWN_TAGS_SUCCESS,
    GET_OWN_TAGS_FAILURE,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAILURE,
    GET_TAG_SUCCESS,
    GET_TAG_FAILURE
} = actions;
const baseUrl = configs.baseUrl;

export function getTags(query) {
    query = query ? query : '';
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/tags.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_TAGS_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_TAGS_SUCCESS,
                error: new Error('标签获取失败, 请稍后再试')
            });
        }
    };
};

export function getAdminTags(query) {
    query = query ? query : '';
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/tags/admin.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_TAGS_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_TAGS_FAILURE,
                error: new Error('标签获取失败, 请稍后再试')
            });
        }
    };
};

export function getAdminTag(query) {
    query = query ? query : '';
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/tags/admin.do${query}`, {
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

export function getTagsAll(query) {
    query = query ? query : '';
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.get(`${baseUrl}/tags.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_TAGS_All_SUCCESS,
                data: data.data
            });
        } catch (error) {
            message.error('哦哦～服务器出问题咯！');
            dispatch({
                type: GET_TAGS_All_FAILURE,
                error: new Error('标签获取失败, 请稍后再试')
            });
        }
    };
};



export function addTags(query = '', tags) {
    return async(dispatch) => {
        try {
            let headers = {};
            if (!!localStorage.token) {
                var token = localStorage.token;
                headers = {
                    'Authorization': `Bearer ${token}`
                };
            }
            const data = (await axios.post(`${baseUrl}/tags.do${query}`, tags, {
                headers: headers
            })).data;
            dispatch({
                type: ADD_TAGS_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: ADD_TAGS_FAILURE,
                error: new Error('添加标签失败, 请稍后再试')
            });
        }
    };
};

export function getOwnTag(query = '') {
    return async(dispatch) => {
        try {
            let headers = {};
            if (!!localStorage.token) {
                var token = localStorage.token;
                headers = {
                    'Authorization': `Bearer ${token}`
                };
            }
            const data = (await axios.get(`${baseUrl}/tags/user.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: GET_OWN_TAGS_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: GET_OWN_TAGS_FAILURE,
                error: new Error('个人标签获取失败, 请稍后再试')
            });
        }
    };
}
export function deleteTag(query = '') {
    return async(dispatch) => {
        try {
            let headers = {};
            if (!!localStorage.token) {
                var token = localStorage.token;
                headers = {
                    'Authorization': `Bearer ${token}`
                };
            }
            const data = (await axios.delete(`${baseUrl}/tags.do${query}`, {
                headers: headers
            })).data;
            dispatch({
                type: DELETE_TAG_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: DELETE_TAG_FAILURE,
                error: new Error('删除标签失败, 请稍后再试')
            });
        }
    };
}