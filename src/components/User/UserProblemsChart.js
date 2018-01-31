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
	//require('echarts-wordcloud');
	// 引入柱状图
require('echarts/lib/chart/treemap');
require('echarts/lib/component/title') //标题插件
@CSSModules(styles)
export default class UserProblemsChart extends React.Component {
	constructor(props) {
		super(props);
		this.setPieOption = this.setPieOption.bind(this);
		this.convert = this.convert.bind(this);
		this.initPie = this.initPie.bind(this);
	};
	initPie() {
		//debugger;
		const {
			rawData
		} = this.props //外部传入的data数据
		const acNum=this.props.acNum;
		const rank=this.props.rank;
		let myChart = echarts.init(this.refs.treemapReact); //初始化echarts
		myChart.on('click', function(params) {
			//debugger
			// 控制台打印数据的名称
			if (!!params.data) {
				if (!params.data.children) {
					hashHistory.push(`/problems/${params.data.id}/${-1}`);
				}
			}


		});
		myChart.hideLoading();
		var data = {
			action: "run",
			code: ""
		};
		//debugger;
		let dadaTarget = this.convert(rawData, data, '');
		let options = this.setPieOption(dadaTarget,acNum,rank);
		//设置options
		myChart.setOption(options);
	}
	componentDidMount() {
		this.initPie();
	};

	componentDidUpdate() {
		this.initPie()
	};
	convert(source, target, basePath) {
		for (var key in source) {
			var path = basePath ? (basePath + '.' + key) : key;
			if (key.match('count') || key.match('id')) {

			} else {
				target.children = target.children || [];
				var child = {
					name: key
				};
				target.children.push(child);
				this.convert(source[key], child, path);
			}
		}

		if (!target.children) {
			target.value = source.count || 1;
			target.id = source.id || '';
		}
		return target;
	};

	//一个基本的echarts图表配置函数
	setPieOption(data,acNum,rank) {
		return {
			title: {
				text: '挑战成功的题目('+acNum+')  排名:'+rank,
				//subtext: '2016/04',
				left: 'leafDepth'
			},
			tooltip: {},
			series: [{
				name: 'option',
				type: 'treemap',
				roam: false,
				//visibleMin: 300,
				data: data.children,
				leafDepth: 1,
				levels: [{
					color: [
						'#91c7ae', '#61a0a8', '#bda29a', '#dd8668', '#314656', '#c4ccd3',
						'#6e7074', '#c23531',
						'#44525d'
					],
					//colorMappingBy: 'value',
					visualMin: 1,
					visibleMin: 1,
					itemStyle: {
						normal: {
							borderColor: '#333',
							borderWidth: 3,
							gapWidth: 4
						}
					}
				}, {
					colorSaturation: [0.3, 0.7],
					itemStyle: {
						normal: {
							borderColor: '#fff',
							borderWidth: 1
						}
					}
				}, {
					colorSaturation: [0.3, 0.8],
					itemStyle: {
						normal: {
							borderColor: '#fff',
							borderWidth: 1
						}
					}
				}]
			}]
		}
	};
	render() {
		return (
			<div>
				<div ref="treemapReact"  style={{width: "100%", height: "450px"}}></div>	
			</div>
		);
	};
}