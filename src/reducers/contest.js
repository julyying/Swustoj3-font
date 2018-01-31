import actions from '../constants/actions';

const {
    GET_CONTESTS_PROBLEMS_SUCCESS,
    GET_CONTESTS_PROBLEMS_FAILURE,
    GET_CONTESTS_STATISTICS_SUCCESS,
    GET_CONTESTS_STATISTICS_FAILURE,
    GET_CONTESTS_RANKLIST_SUCCESS,
    GET_CONTESTS_RANKLIST_FAILURE,
    GET_CONTEST_SUCCESS,
    GET_CONTEST_FAILURE,
        ADD_CONTEST_FAILURE,
    ADD_CONTEST_SUCCESS
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
        case GET_CONTESTS_PROBLEMS_SUCCESS:
            return {
                ...state,
                problems: action.data.data.pagingList,
                problemsTotal: action.data.data.total,
                code: action.data.code
            };
        case GET_CONTESTS_STATISTICS_SUCCESS:
            return {
                ...state,
                statistics: action.data.data.pagingList,
                statisticsTotal: action.data.data.total,
                code: action.data.code
            };
        case GET_CONTESTS_RANKLIST_SUCCESS:
            return {
                ...state,
                ranklist: action.data.data.pagingList,
                ranklistTotal: action.data.data.total,
                code: action.data.code
            };
        case GET_CONTEST_SUCCESS:
            return {
                ...state,
                contest: action.data.pagingList[0]
            };
        case ADD_CONTEST_FAILURE:
        case ADD_CONTEST_SUCCESS:
        default:
            return state;
    }
};