import React, {
	PropTypes
} from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import styles from './styles.scss';
import CSSModules from 'react-css-modules';
import classNames from 'classnames';
import {
	Col,
	Row,
} from 'antd';
import {
	hashHistory
} from 'react-router';
import {
	toQuery
} from '../../utils/utils';
import {
	getNewestNewsroll,
	getNews
} from '../../actions/news';
@connect(state => ({
	news: state.news,
	params: state.params,
}))
@CSSModules(styles)
export default class RollNews extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newestNews: '',
			newsId: '',
		}
	};
	componentDidMount() {
		//debugger;
		this.props.dispatch(getNewestNewsroll(toQuery({}))).then(() => {
			//debugger;
			if (!!this.props.news.newestNews) {
				this.setState({
					newestNews: this.props.news.newestNews.content,
					newsId: this.props.news.newestNews.id,
				});
				var fdiv = this.refs.fdiv;
				var sdiv = this.refs.sdiv;
				var pdiv = this.refs.pdiv;
				var road = fdiv.offsetWidth,
					length = pdiv.offsetWidth;
				var index = road,
					speed = 1;
				var MyMar = setInterval(Marquee, speed);
				sdiv.onmouseover = function() {
					clearInterval(MyMar)
				};
				sdiv.onmouseout = function() {
					MyMar = setInterval(Marquee, speed)
				};

				function Marquee() {
					if (index <= -length) {
						index = road;
						sdiv.style.left = index + 'px';
					} else {
						index -= 0.5;
						sdiv.style.left = index + 'px';
					}
				}
			}
		});
	};
	render() {
		return (
			<div className="col-22 col-offset-1" styleName="roll_news">
	            <div styleName="fdiv" ref="fdiv">
	            	<div styleName="sdiv" ref="sdiv">
		            		<div styleName="pdiv" ref="pdiv">{this.state.newestNews}</div>
	            	</div>
	            </div>
	        </div>
		);
	};
}