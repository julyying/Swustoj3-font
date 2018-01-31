import actions from '../constants/actions';

const {
    GET_PROBLEMS_SUCCESS,
    GET_PROBLEMS_FAILURE,
    DELETE_PROBLEMS_SUCCESS,
    DELETE_PROBLEMS_FAILURE,
} = actions;

export default (state = {
    total: 0,
    problems: [],
    code: ''
}, action) => {
    switch (action.type) {
        case GET_PROBLEMS_SUCCESS:
            return {
                ...state,
                problems: action.data.data.pagingList,
                total: action.data.data.total,
                code: action.data.code
            };
        case DELETE_PROBLEMS_SUCCESS:
        default:
            return state;
    }
};