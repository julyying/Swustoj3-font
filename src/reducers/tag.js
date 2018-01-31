import actions from '../constants/actions';

const {
    GET_TAG_SUCCESS,
    GET_TAG_FAILURE,
} = actions;

export default (state = {
    total: 0,
    tag: {}
}, action) => {
    switch (action.type) {
        case GET_TAG_SUCCESS:
            return {
                ...state,
                total: action.data.total,
                tag: action.data.pagingList[0]
            };
        default:
            return state;
    }
};