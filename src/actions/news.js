import axios from 'axios';
import actions from '../constants/actions';
import configs from '../constants/configs';
import {
    getTokenHeader,
    handleError,
    toQuery
} from '../utils/utils';

const {
	GET_NEWS_SUCCESS,
	GET_NEWS_FAILURE,
	GET_SCROLL_PICTURE_SUCCESS,
    GET_SCROLL_PICTURE_FAILURE,
    GET_NEWESTNEWSROLL_SUCCESS,
    GET_NEWESTNEWSROLL_FAILURE,
    UPDATE_SCROLL_PICTURE_SUCCESS,
    UPDATE_SCROLL_PICTURE_FAILURE,
    ADD_SCROLL_PICTURE_SUCCESS,
    ADD_SCROLL_PICTURE_FAILURE,
    GET_CONTEST_NEWS_SUCCESS,
    GET_CONTEST_NEWS_FAILURE,
    GET_CONTEST_TEAM_SUCCESS,
    GET_CONTEST_TEAM_FAILURE,
    ADD_CONNTESTTEAM_SUCCESS,
    ADD_CONNTESTTEAM_FAILURE,
    GET_ALL_CONTEST_SUCCESS,
    GET_ALL_CONTEST_FAILURE,
} = actions;

const baseUrl = configs.baseUrl;
export function getNews(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/news.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_NEWS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_NEWS_FAILURE,
				error: new Error('新闻数据获取失败, 请稍后再试')
			});
		}
	};
};

export function getscrollpicture(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/scrollPicture.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_SCROLL_PICTURE_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_SCROLL_PICTURE_FAILURE,
				error: new Error('滚动图片获取失败, 请稍后再试')
			});
		}
	};
};

export function addScrollPicture(picture, query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			console.log('headers', headers);
			const data = (await axios.post(`${baseUrl}/scrollPicture.do${query}`, picture, {
				headers: headers
			})).data;
			dispatch({
				type: ADD_SCROLL_PICTURE_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: ADD_SCROLL_PICTURE_FAILURE,
				error: new Error('滚动图片创建失败, 请稍后再试')
			});
		}
	};
};

export function updateScrollPicture(picture, query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			console.log('headers', headers);
			const data = (await axios.put(`${baseUrl}/scrollPicture.do${query}`, picture, {
				headers: headers
			})).data;
			dispatch({
				type: UPDATE_SCROLL_PICTURE_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: UPDATE_SCROLL_PICTURE_FAILURE,
				error: new Error('滚动图片更新失败, 请稍后再试')
			});
		}
	};
};

export function getNewestNewsroll(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/newsroll/new.do${query}`, {
                headers: headers
            })).data;
			dispatch({
				type: GET_NEWESTNEWSROLL_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_NEWESTNEWSROLL_FAILURE,
				error: new Error('最新滚动新闻获取失败, 请稍后再试')
			});
		}
	};
};

export function getContestNews(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/competition.do${query}`,{
                headers: headers
            })).data;
			dispatch({
				type: GET_CONTEST_NEWS_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_CONTEST_NEWS_FAILURE,
				error: new Error('比赛新闻获取失败, 请稍后再试')
			});
		}
	};
};

export function getContestTeam(query = '') {
	return async(dispatch) => {
		try {
			let headers = getTokenHeader({});
			const data = (await axios.get(`${baseUrl}/competition/team.do${query}`,{
                headers: headers
            })).data;
			dispatch({
				type: GET_CONTEST_TEAM_SUCCESS,
				data: data.data
			});
		} catch (error) {
			dispatch({
				type: GET_CONTEST_TEAM_FAILURE,
				error: new Error('比赛团队获取失败, 请稍后再试')
			});
		}
	};
};

export function addContestTeam(competitionTeamVO, query = '') {
    return async(dispatch) => {
        try {
            let headers = getTokenHeader({});
            const data = (await axios.post(`${baseUrl}/competition/team.do${query}`, competitionTeamVO, {
                headers: headers
            })).data;
            dispatch({
                type: ADD_CONNTESTTEAM_SUCCESS,
                data: data
            });
        } catch (error) {
            dispatch({
                type: ADD_CONNTESTTEAM_FAILURE,
                error: new Error('添加比赛团队, 请稍后再试')
            });
        }
    };
};

export function getAllContest(query=''){
	return async(dispatch) => {
		try{
			let headers=getTokenHeader({});
			const data=(await axios.get(`${baseUrl}/competition.do${query}`,{
				headers:headers
			})).data;
			dispatch({
                type: GET_ALL_CONTEST_SUCCESS,
                data: data
            });
		} catch(error){
			dispatch({
				type: GET_ALL_CONTEST_FAILURE,
				error: new Error('比赛新闻获取失败, 请稍后再试')
			});
		}
	};
}