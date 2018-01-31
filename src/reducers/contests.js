import actions from '../constants/actions';

const {
    GET_CONTESTS_SUCCESS,
    GET_CONTESTS_FAILURE
} = actions;

export default (state = {
    total: 0,
    contests: []
}, action) => {
    switch (action.type) {
        case GET_CONTESTS_SUCCESS:
            return {
                ...state,
                contests: action.data.data.pagingList,
                total: action.data.data.total,
                code: action.data.code
            };
        default:
            return state;
    }
};