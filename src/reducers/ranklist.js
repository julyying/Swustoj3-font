import actions from '../constants/actions';

const {
	GET_USERS_SUCCESS,
	GET_USERS_FAILURE,
	GET_USERS_BYTIME_SUCCESS,
	GET_USERS_BYTIME_FAILURE,
	SUBMIT_CODE_SUCCESS,
	SUBMIT_CODE_ERROR
} = actions;

export default (state = {
	total: 0,
	users: []
}, action) => {
	switch (action.type) {
		case GET_USERS_SUCCESS:
			return {
				...state,
				users: action.data.pagingList,
				total: action.data.total
			};
		case GET_USERS_BYTIME_SUCCESS:
			return {
				...state,
				users: action.data.pagingList,
				total: action.data.total
			};
		case SUBMIT_CODE_SUCCESS:
			return {
				...state,
				code: action.data.code
			};
		default:
			return state;
	}
};