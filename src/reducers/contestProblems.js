import actions from '../constants/actions';

const {
    GET_CONTEST_PROBLEMS_SUCCESS,
    GET_CONTEST_PROBLEMS_FAILURE
} = actions;

export default (state = {
    total: 0,
    problems: [],
    code: ''
}, action) => {
    switch (action.type) {
        case GET_CONTEST_PROBLEMS_SUCCESS:
            return {
                ...state,
                problems: action.data.data.pagingList,
                total: action.data.data.total
            };
        default:
            return state;
    }
};