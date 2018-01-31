import actions from '../constants/actions';

const {
    GET_ROLES_SUCCESS,
    GET_ROLES_FAILURE
} = actions;

export default (state = {}, action) => {
    switch (action.type) {
        case GET_ROLES_SUCCESS:
            return {
                ...state,
                ...action.data
            };
        default:
            return state;
    }

};