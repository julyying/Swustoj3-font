import actions from '../constants/actions';

const {
	TAGS_TO_ROBLEMS,
	PROBLEM_TO_HEADER,
	PWCHANGE_TO_HEADER,
	ARTICLE_TO_REGISTER,
} = actions;

export function tagsToProblems(query) {
	return async(dispatch) => {
		dispatch({
			type: TAGS_TO_ROBLEMS,
			data: query
		});
	};
};

export function problemToHeader(query) {
	return async(dispatch) => {
		dispatch({
			type: PROBLEM_TO_HEADER,
			data: query
		});
	};
};

export function PWchangeToHeader(query) {
	return async(dispatch) => {
		dispatch({
			type: PWCHANGE_TO_HEADER,
			data: query
		});
	};
};