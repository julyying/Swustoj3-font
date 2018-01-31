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
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE
} = actions;

const baseUrl = configs.baseUrl;

export function getRoles(query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const res = (await axios.get(`${baseUrl}/user/role.do${query}`, {
                headers: headers
            })).data;

            handleError(res, (res) => {
                dispatch({
                    type: GET_ROLES_SUCCESS,
                    data: res.data
                });
            });


        } catch (error) {
            dispatch({
                type: GET_ROLES_FAILURE,
                error: new Error('角色列表获取失败，请稍后再试')
            });
        }
    }
}