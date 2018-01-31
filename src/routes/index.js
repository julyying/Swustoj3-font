import React from 'react';
import {
    Router,
    Route,
    IndexRoute
} from 'react-router';
import App from '../modules/App';
import Home from '../modules/Home/Home';
import News from '../modules/Home/News';
import Article from '../modules/Home/Article'
import ContestRegister from '../modules/ContestRegister/ContestRegister'
import ContestReg from '../modules/ContestRegister/ContestReg'
import ContestList from '../modules/ContestRegister/ContestList'
import * as Problem from '../modules/Problems';
import Status from '../modules/Status/Status';
import Source from '../modules/Source/Source';
import * as RankList from '../modules/RankList';
import Contests from '../modules/Contests/Contests/Contests';
import ContestHeader from '../modules/Contests/ContestHeader/ContestHeader';
import Tags from '../modules/Tags/Tags';
import Activity from '../modules/Activity/Activity';
import About from '../modules/About/About';
import Online from '../modules/Online/Online';
import Profile from '../modules/Profile/Profile';
import ProfileProblems from '../modules/Profile/ProfileProblems';
import ProfileContests from '../modules/Profile/ProfileContests';
import ProfileCollections from '../modules/Profile/ProfileCollections';
import ProfileTags from '../modules/Profile/ProfileTags';
import ProfileRoad from '../modules/Profile/ProfileRoad';
import ProfileDiscuss from '../modules/Profile/ProfileDiscuss';
import ProfileInfo from '../modules/Profile/ProfileInfo';
import ProfileChangePW from '../modules/Profile/ProfileChangePW';
import PwChange from '../modules/PwChange/PwChange';
import Admin from '../modules/Admin';
import AdminHome from '../modules/Admin/Home/Home';
import * as AdminProblem from '../modules/Admin/Problem';
import * as AdminUser from '../modules/Admin/User';
import AdminTag from '../modules/Admin/Tag/Tag';
import AdminAbout from '../modules/Admin/About/About';
import AdminContest from '../modules/Admin/Contest/Contest';
import AdminPicture from '../modules/Admin/Picture/Picture';
import AdminNews from '../modules/Admin/News/News';
import AdminClasses from '../modules/Admin/Classes/Classes';

import {
    fillStore
} from '../utils/utils';

const routes = (
    <Route>
        <Route component={App}>
            <Route component={Home} path='/' />
            <Route component={News} path='/news' />
            <Route component={Article} path='/article/:id' />
            <Route component={ContestRegister} path='/register/:id' />
            <Route component={ContestReg} path='/register/reg/:id' />
            <Route component={ContestList} path='/register/list/:id' />
            <Route component={Problem.List} path='/problems' />
            <Route component={Problem.Detail} path='/problems/:id/:contestId' />
            <Route component={Status} path='/status' />
            <Route component={Source} path='/source/:id/:params/:contestId' />
            <Route component={RankList.List} path='/ranklist' />
            <Route component={RankList.Detail} path='/ranklist/:id/:username' />
            <Route component={Contests} path='/contests' />
            <Route component={ContestHeader} path='/contests/detail/:id' />
            <Route component={Tags} path='/tags' />
            <Route component={Online} path='/online' />
            <Route component={Activity} path='/activity' />
            <Route component={Profile}>
                <Route component={ProfileProblems} path='/profile/problems' />
                <Route component={ProfileContests} path='/profile/contests' />
                <Route component={ProfileCollections} path='/profile/collect' />
                <Route component={ProfileTags} path='/profile/tags' />
                <Route component={ProfileRoad} path='/profile/road' />
                <Route component={ProfileDiscuss} path='/profile/discuss' />
                <Route component={ProfileInfo} path='/profile/inf' />
                <Route component={ProfileChangePW} path='/profile/changePW' />
            </Route>
            <Route component={About} path='/about' />
            <Route component={PwChange} path='/resetPasswd' />
        </Route>
        <Route component={Admin}>
            <Route component={ AdminHome } path='/admin' />
            <Route component={ AdminProblem.List } path='/admin/problem' />
            <Route component={ AdminProblem.Edit } path='/admin/problem/:id' />
            <Route component={ AdminUser.List } path='/admin/user' />
            <Route component={ AdminTag } path='/admin/tag' />
            <Route component={ AdminAbout } path='/admin/about' />
            <Route component={ AdminContest } path='/admin/contest' />
            <Route component={ AdminPicture } path='/admin/picture' />
            <Route component={ AdminNews } path='/admin/news' />
            <Route component={ AdminClasses } path='/admin/classes' />
        </Route>
    </Route>
);

function walk(routes, cb) {
    cb(routes);

    if (routes.childRoutes) {
        routes.childRoutes.forEach(route => walk(route, cb));
    }

    return routes;
}

export default (store) => {
    return walk(Route.createRouteFromReactElement(routes), route => {
        route.onEnter = (nextState) => {
            fillStore(store, nextState, [route.component]);
        };
    });
};