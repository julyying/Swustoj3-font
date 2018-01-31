import actions from '../constants/actions';

const {
    GET_TAGS_SUCCESS,
    GET_TAGS_FAILURE,
    GET_TAGS_All_SUCCESS,
    GET_TAGS_All_FAILURE,
    ADD_TAGS_SUCCESS,
    ADD_TAGS_FAILURE,
    GET_OWN_TAGS_SUCCESS,
    DELETE_TAG_SUCCESS,
    DELETE_TAG_FAILURE
} = actions;

export default (state = {
    total: 0,
    tagss: [],
    owntags:'',
    code:'',
    delecode:'',
}, action) => {
    //console.log('action', action);
    switch (action.type) {
        case GET_TAGS_SUCCESS:
            return {
                ...state,
                total: action.data.total,
                tagss: action.data.pagingList
            };
        case GET_TAGS_All_SUCCESS:
            return {
                ...state,
                total: action.data.total,
                tagss: action.data.pagingList
            };
        case ADD_TAGS_SUCCESS:
            return {
                ...state,
                code:action.data.code,
            };
        case GET_OWN_TAGS_SUCCESS:
            return {
                ...state,
                owntags: action.data.data,
                code:action.data.code
            };
        case DELETE_TAG_SUCCESS:
            return {
                ...state,
                delecode:action.data.code
            };
        default:
            return state;
    }
};