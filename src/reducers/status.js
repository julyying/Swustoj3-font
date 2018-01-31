import actions from '../constants/actions';

const {
    GET_STATUS_SUCCESS,
    GET_STATUS_FAILURE,

    GET_CODESOURCE_SUCCESS,
    GET_CODESOURCE_FAILURE,

    GET_DAY_SUBMIT_SUCCESS,
    GET_DAY_SUBMIT_FAILURE,
    GET_ALL_SUBMIT_SUCCESS,
    GET_ALL_SUBMIT_FAILURE,
    GET_ALL_PROBLEM_SUCCESS,
    GET_ALL_PROBLEM_FAILURE,
    GET_ONLINENUM_SUCCESS
} = actions;

export default (state = {
    total: 0,
    status: [],
    data: 0,
}, action) => {
    //console.log('action', action);
    switch (action.type) {
        case GET_STATUS_SUCCESS:
            return {
                ...state,
                status: action.data.pagingList,
                total: action.data.total
            };

        case GET_CODESOURCE_SUCCESS:
            return {
                ...state,
                source: action.data.obj
            };


        case GET_DAY_SUBMIT_SUCCESS:
            return {
                ...state,
                data: action.data,
                code: action.data.code
            }

        case GET_ALL_SUBMIT_SUCCESS:
            return {
                ...state,
                data: action.data,
                code: action.data.code
            }

        case GET_ALL_PROBLEM_SUCCESS:
            return {
                ...state,
                data: action.data,
                code: action.data.code
            }
        case GET_ONLINENUM_SUCCESS:
            return {
                ...state,
                data: action.data.obj,
                code: action.data.code
            }
        default:
            return state;
    }
};