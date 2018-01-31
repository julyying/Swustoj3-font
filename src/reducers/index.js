import {
	combineReducers
} from 'redux';
import problems from './problems';
import status from './status';
import problem from './problem';
import tag from './tag';
import tags from './tags';
import users from './ranklist';
import user from './user';
import contests from './contests';
import contest from './contest';
import contestProblems from './contestProblems';
import params from './jumpPage';
import profile from './profile';
import roles from './roles';
import about from './about';
import abouts from './abouts';
import news from './news';
import online from './online';

export default combineReducers({
	problems,
	problem,
	status,
	tag,
	tags,
	users,
	user,
	contests,
	contest,
	params,
	profile,
	roles,
	abouts,
	about,
	news,
	contestProblems,
	online
});