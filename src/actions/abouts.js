import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    toQuery,
    getTokenHeader
} from '../utils/utils';
const {
	GET_ABOUTS_SUCCESS,
	GET_ABOUTS_FAILURE,
} = actions;
const baseUrl = configs.baseUrl;
export function getAbouts(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/about.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_ABOUTS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_ABOUTS_FAILURE,
				error: new Error('关于数据获取失败, 请稍后再试')
			});
		}
	};
};