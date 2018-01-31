import actions from '../constants/actions';

const {
	TAGS_TO_ROBLEMS,
	PROBLEM_TO_HEADER,
	PWCHANGE_TO_HEADER,
} = actions;

export default (state = {
	params: null,
	isLogin:true,
	newsId:null,
	changePW:null,
	id:null,
}, action) => {
	switch (action.type) {
		case TAGS_TO_ROBLEMS:
			return {
				...state,
				params: action.data
			};
		case PROBLEM_TO_HEADER:
			return {
				...state,
				isLogin: action.data
			};
		case PWCHANGE_TO_HEADER:
			return {
				...state,
				changePW: action.data
			};
		default:
			return state;
	}
};