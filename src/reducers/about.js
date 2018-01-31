import actions from '../constants/actions';

const {
    GET_ABOUT_SUCCESS,
    GET_ABOUT_FAILURE
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ABOUT_SUCCESS:
            return {
                ...action.data.pagingList[0],
            };
        default:
            return state;
    }
};