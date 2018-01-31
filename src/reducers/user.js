import actions from '../constants/actions';

const {
	USER_REGISTER_SUCCESS,
	USER_REGISTER_FAILURE,
	USER_LOGIN_SUCCESS,
	USER_LOGIN_FAILURE,
	UPDATE_USER_FAILURE,
	UPDATE_USER_SUCCESS,
	GET_USER_SUCCESS,
	GET_USER_FAILURE,
	GET_CHALLENGE_PROBLEM_SUCCESS,
    GET_CHALLENGE_PROBLEM_FAILURE,
} = actions;

export default (state = {
	data: null,
	code: ''
}, action) => {
	switch (action.type) {
		case USER_REGISTER_SUCCESS:
			return {
				...state,
				data: action.data.data,
				code: action.data.code
			}
		case USER_LOGIN_SUCCESS:
			return {
				...state,
				data: action.data.data,
				code: action.data.code
			}
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				info: action.data.data.obj,
				code: action.data.code
			}
		case GET_USER_SUCCESS:
			return {
				...state,
				data: action.data.pagingList[0]
			}
		case GET_CHALLENGE_PROBLEM_SUCCESS:
			return {
				...state,
				data: action.data
			}
		default:
			return state;
	}

};