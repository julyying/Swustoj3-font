import React, {
	PropTypes
} from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Col,
	Row,
	Button,
} from 'antd';
import {
	getOnline
} from '../../actions/online';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';
var echarts = require('echarts/lib/echarts') 
require('echarts/lib/chart/line');
require('echarts/lib/component/title') //标题插件
const ButtonGroup = Button.Group;
@connect(state => ({
	abouts: state.abouts,
	online:state.online,
}))

@CSSModules(styles)

export default class Online extends React.Component {
	constructor(props) {
		super(props);
		this.setPieOption = this.setPieOption.bind(this);
		this.initPie = this.initPie.bind(this);
		this.convert = this.convert.bind(this);
		this.state = {
			btn1:'ghost',
			btn2:'primary',
			btn3:'ghost',
			data:['User','Submit(AC)','Submit(ALL)'],
			name1:'User',
			name2:'Submit(AC)',
			name3:'Submit(ALL)',
		}
	};
	convert(value,source,xAxis,totalLogin,submitAc,submitAll){
		if(value===0){
			for(var key in source){
				xAxis.splice(0,0,source[key].time);
				totalLogin.splice(0,0,source[key].totalLogin);
				source[key].submitAc/=100;
				submitAc.splice(0,0,source[key].submitAc);
				source[key].submitAll/=100;
				submitAll.splice(0,0,source[key].submitAll);
			}
		}
		else{
			for(var key in source){
				xAxis.splice(0,0,source[key].time);
				totalLogin.splice(0,0,source[key].totalLogin);
				submitAc.splice(0,0,source[key].submitAc);
				submitAll.splice(0,0,source[key].submitAll);
			}
		}
	}
	initPie(value) {
		let data=this.props.online;
		if(this.refs.linemapReact){
			let myChart = echarts.init(this.refs.linemapReact); //初始化echarts
			myChart.hideLoading();
			let xAxis=[],totalLogin=[],submitAc=[],submitAll=[];
			this.convert(value,data,xAxis,totalLogin,submitAc,submitAll);
			let options = this.setPieOption(xAxis,totalLogin,submitAc,submitAll);
			//设置options
			myChart.setOption(options);
			window.onresize = myChart.resize;
		}
	}
	//一个基本的echarts图表配置函数
	setPieOption(xAxis,totalLogin,submitAc,submitAll) {
		return {
			title: {
		        text: '在线数据'
		    },
		    tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:this.state.data
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    toolbox: {
		        feature: {
		            saveAsImage: {
		            	title:'保存'
		            }
		        }
		    },
		    xAxis: {
		        type: 'category',
		        boundaryGap: false,
		        data: xAxis,
		    },
		    yAxis: {
		        type: 'value'
		    },
		    series: [
		        {
		            name:this.state.name1,
		            type:'line',
		            stack: '总登录量',
		            data:totalLogin
		        },
		        {
		            name:this.state.name2,
		            type:'line',
		            stack: '总AC',
		            data:submitAc
		        },
		        {
		            name:this.state.name3,
		            type:'line',
		            stack: '总提交',
		            data:submitAll
		        },
		    ]
		}
	};
	handleChooseTime(value) {
		this.setState({
			btn1:'ghost',
			btn2:'ghost',
			btn3:'ghost',
		});
		switch(value){
			case 2:
			this.setState({
				btn1:'primary',
			});
			this.props.dispatch(getOnline(toQuery({
				type:2
			}))).then(()=>{
				this.setState({
					data:['User','Submit(AC)','Submit(ALL)'],
					name1:'User',
					name2:'Submit(AC)',
					name3:'Submit(ALL)',
				});
				this.initPie(2);
			});
			break;
			case 1:
			this.setState({
				btn2:'primary',
			});
			this.props.dispatch(getOnline(toQuery({
				type:1
			}))).then(()=>{
				this.setState({
					data:['User','Submit(AC)','Submit(ALL)'],
					name1:'User',
					name2:'Submit(AC)',
					name3:'Submit(ALL)',
				});
				this.initPie(1);
			});
			break;
			case 0:
			this.setState({
				btn3:'primary',
			});
			this.props.dispatch(getOnline(toQuery({
				type:0
			}))).then(()=>{
				this.setState({
					name2:'Submit(AC)/百',
					name3:'Submit(ALL)/百',
					data:['User','Submit(AC)/百','Submit(ALL)/百']
				});
				this.initPie(0);
			});
			break;
		}
	}
	componentDidMount() {
		this.props.dispatch(getOnline(toQuery({
			type:1
		}))).then(()=>{
			this.initPie(1);
		});
	};	
	render() {
		return (
			<div className="col-22 col-offset-1" styleName="wrapper">
				<Row>
					<Col offset={20}>
						<ButtonGroup style={{marginBottom:20,marginTop:10}}>
							<Button type={this.state.btn1} onClick={this.handleChooseTime.bind(this, 2)}>日</Button>
							<Button type={this.state.btn2} onClick={this.handleChooseTime.bind(this, 1)}>月</Button>
							<Button type={this.state.btn3} onClick={this.handleChooseTime.bind(this, 0)}>年</Button>
						</ButtonGroup>
					</Col>
				</Row>
				<div className="col-24" style={{overflow:"hidden"}}>
					<div ref="linemapReact" style={{width:"100%",height:"600px"}}></div>
				</div>
			</div>

		);
	};
}