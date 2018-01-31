import React, {
	PropTypes
} from 'react';
import {
	hashHistory
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	tagsToProblems
} from '../../actions/jumpPage';
import {
	Tag,
	Col,
	Row,
} from 'antd';

import CSSModules from 'react-css-modules';
import styles from './styles.scss';

import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
//导入echarts
var echarts = require('echarts/lib/echarts') //必须
	//require('echarts/lib/chart/wordCloud') //图表类型
require('echarts-wordcloud');
require('echarts/lib/component/title') //标题插件
import configs from '../../constants/configs';
@connect(state => ({
	params: state.params
}))
@CSSModules(styles)
export default class TagChart extends React.Component {

	constructor(props) {
		super(props);
		//this.handleClick = this.handleClick.bind(this);
		this.setPieOption = this.setPieOption.bind(this);
		this.initPie = this.initPie.bind(this);
		this.state = {
			tagName: ''
		}
	};
	initPie() {
		const {
			data
		} = this.props

		let myChart = echarts.init(this.refs.pieReact) //初始化echarts
		var that = this;
		myChart.on('click', function(params) {
			that.props.dispatch(tagsToProblems({
				tagName: params.name
			})).then(() => {
				hashHistory.push(`/problems`);
			});
		});

		let options = this.setPieOption(data)
			//设置options
		myChart.setOption(options)


	}
	componentDidMount() {
		this.initPie()
	};

	componentDidUpdate() {
		this.initPie()
	};
	//一个基本的echarts图表配置函数
	setPieOption(data) {
		return {
			title: {
				text: "标签云",
				//link: 'https://github.com/ecomfe/echarts-wordcloud',
				subtext: 'oj题目标签云',
				//sublink: 'http://data-visual.cn',
			},
			tooltip: {},
			series: [{
				type: 'wordCloud',
				gridSize: 20,
				sizeRange: [12, 50],
				rotationRange: [0, 0],
				shape: 'circle',
				textStyle: {
					normal: {
						color: function() {
							return 'rgb(' + [
								Math.round(Math.random() * 160),
								Math.round(Math.random() * 160),
								Math.round(Math.random() * 160)
							].join(',') + ')';
						}
					},
					emphasis: {
						shadowBlur: 10,
						shadowColor: '#333'
					}
				},
				data: data,
			}]
		}
	};
	render() {
		return (
			<div><div ref="pieReact"style={{width: "100%", height: "400px"} }></div> < /div>
		);
	};
}