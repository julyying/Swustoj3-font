import actions from '../constants/actions';

const {
    GET_PROBLEM_SUCCESS,
    GET_PROBLEM_FAILURE,
    UPDATE_PROBLEM_SUCCESS,
    UPDATE_PROBLEM_FAILURE,
    COLLECT_PROBLEM_SUCCESS
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
        case GET_PROBLEM_SUCCESS:
            return {
                ...state,
                ...action.data.pagingList[0]
            };
        case UPDATE_PROBLEM_SUCCESS:
            return {
                ...state,
                ...action.data.obj
            };
        case COLLECT_PROBLEM_SUCCESS:
            return {
                ...state,
                collectCode:action.data.code
            };
        default:
            return state;
    }

};