import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Tabs,
	Icon
} from 'antd';
import {
	getAbouts
} from '../../actions/abouts';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
const TabPane = Tabs.TabPane;

@connect(state => ({
	abouts: state.abouts
}))

@CSSModules(styles)

export default class About extends React.Component {
	constructor() {
		super();
		this.state = {
			//tabb:[],
			aboutName: [],
			aboutTitle: [],
			aboutIcon: [],
			aboutId: [],
			isShow: [],
			total: '',
			aboutContent: ''
		}
	};
	componentDidMount() {
		this.props.dispatch(getAbouts(toQuery({
			rows: 20,
			page: 1,
			aboutName: ''
		})));
	};

	render() {
		let Road = () => {
			if (!!this.props.abouts.about) {
				let road = [];
				//debugger;
				this.props.abouts.about.map((item, index) => {
						road.push(
							<TabPane tab={<span><Icon type={item.aboutIcon} /> {
								item.aboutName
							} < /span>} key={index+1}> < div styleName = "block" > < p styleName = "tittle" > {
							item.aboutTitle
						} < /p> < p styleName = "content" > {
						item.aboutContent
					} < /p> < /div > < /TabPane>)
				});
			return (
				<Tabs tabPosition="left">
        				{road}
        			</Tabs>

			);
		}
	};
	return (
		<div className="col-22 col-offset-1" styleName="nav">
			
					<div styleName="tab-top"></div>
					{Road()}
				</div>

	);
};
}