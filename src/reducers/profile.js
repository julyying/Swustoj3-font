import actions from '../constants/actions';

const {
    GET_ROAD_SUCCESS,
    GET_ROAD_FAILURE,
    UPDATE_PASSWORD_FAILURE,
    UPDATE_PASSWORD_SUCCESS,
    GETBACK_PASSWORD_FAILURE,
    GETBACK_PASSWORD_SUCCESS,

    GET_OWN_STATUS_SUCCESS,
    GET_OWN_STATUS_FAILURE,

    GET_OWN_CONTESTS_SUCCESS,
    GET_OWN_CONTESTS_FAILURE,


    GET_OWN_CHALLENGING_SUCCESS,
    GET_OWN_CHALLENGING_FAILURE,

    GET_OWN_COLLECTION_SUCCESS,
    GET_OWN_COLLECTION_FAILURE,

    GET_PROBLEM_ADD_NOTE_SUCCESS,
    GET_PROBLEM_ADD_NOTE_FAILURE,

    GET_PROBLEM_NOTE_SUCCESS,
    GET_PROBLEM_NOTE_FAILURE,
    GET_DELETE_PROBLEM_NOTE_SUCCESS,
    GET_DELETE_PROBLEM_NOTE_FAILURE,

    UPDATE_PROBLEM_NOTE_SUCCESS,
    UPDATE_PROBLEM_NOTE_FAILURE,

} = actions;

export default (state = {}, action) => {
    //console.log('action', action);
    switch (action.type) {
        case GET_ROAD_SUCCESS:
            return {
                ...state,
                road: action.data.data,
                code: action.data.code
            };
        case UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                code: action.data.code
            };
        case GETBACK_PASSWORD_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                code: action.data.code
            };
        case GET_OWN_STATUS_SUCCESS:
            return {
                ...state,
                ac: action.data.obj
            };
        case GET_OWN_CHALLENGING_SUCCESS:
            return {
                ...state,
                challenging: action.data.pagingList
            };
        case GET_OWN_CONTESTS_SUCCESS:
            return {
                ...state,
                contests: action.data.pagingList,
                code:action.data.code
            };

        case GET_OWN_COLLECTION_SUCCESS:
            return {
                ...state,
                collections: action.data.data
                
            };

        case GET_PROBLEM_ADD_NOTE_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                nodeCode: action.data.code
            };

        case GET_PROBLEM_NOTE_SUCCESS:
            return {
                ...state,
                data: action.data,
                code: action.code
            };
        case GET_DELETE_PROBLEM_NOTE_SUCCESS:
            return {
                ...state,
                data: action.data,
                code: action.data.data.code
            };
        case UPDATE_PROBLEM_NOTE_SUCCESS:
            return {
                ...state,
                data: action.data.data,
                code: action.data.code
            };
        default:
            return state;
    }
};