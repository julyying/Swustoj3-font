import actions from '../constants/actions';

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
    GET_CONTEST_TEAM_SUCCESS,
    GET_CONTEST_TEAM_FAILURE,
    ADD_CONNTESTTEAM_SUCCESS,
    GET_ALL_CONTEST_SUCCESS,
} = actions;

export default (state = {}, action) => {
	switch (action.type) {
		case GET_NEWS_SUCCESS:
			return {
				...state,
				news:action.data.pagingList,
				total:action.data.total
			};
		case GET_SCROLL_PICTURE_SUCCESS:
			return {
				...state,
				picture:action.data.pagingList,
				total:action.data.total
			};
		case GET_NEWESTNEWSROLL_SUCCESS:
			return {
				...state,
				newestNews:action.data,
			};
		case GET_CONTEST_NEWS_SUCCESS:
			return {
				...state,
				contestNews:action.data,
			};
		case GET_CONTEST_TEAM_SUCCESS:
			return {
				...state,
				contestTeams:action.data,
			};
		case ADD_CONNTESTTEAM_SUCCESS:
            return {
                ...state,
                code:action.data.code
            };
		case GET_ALL_CONTEST_SUCCESS:
            return {
                ...state,
                data:action.data.data
            };
        case ADD_SCROLL_PICTURE_SUCCESS:
        case UPDATE_SCROLL_PICTURE_SUCCESS:
		default:
			return state;
	}
};