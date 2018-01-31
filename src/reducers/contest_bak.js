import actions from '../constants/actions';

const {
    GET_CONTEST_SUCCESS,
    GET_CONTEST_FAILURE
} = actions;

export default (state = {
    contest: {}
}, action) => {
    switch (action.type) {
        case GET_CONTEST_SUCCESS:
            return {
                ...state,
                contest: action.data.pagingList[0]
            };

        default:
            return state;
    }
};