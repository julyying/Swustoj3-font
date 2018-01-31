import actions from '../constants/actions';

const {
    GET_ONLINE_SUCCESS,
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ONLINE_SUCCESS:
            return {
                ...action.data,
            };
        default:
            return state;
    }
};