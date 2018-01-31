import actions from '../constants/actions';

const {
	GET_ABOUTS_SUCCESS,
	GET_ABOUTS_FAILURE
} = actions;

export default (state = {}, action) => {
	switch (action.type) {
		case GET_ABOUTS_SUCCESS:
			return {
				...state,
				about:action.data.pagingList,
				total:action.data.total,
				code: action.data.code
			};
		default:
			return state;
	}
};