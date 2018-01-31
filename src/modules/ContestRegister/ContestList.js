import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	hashHistory
} from 'react-router';
import {
	Tag,
	Col,
	Row,
	Menu,
	Breadcrumb,
	Icon,
	Tabs,
	Button,
	Table
} from 'antd';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import {
	toQuery,
	timeFormat
} from '../../utils/utils';
import {
	getContestTeam,
} from '../../actions/news';
import classNames from 'classnames';
const rows = 10;
@connect(state => ({
	news:state.news,
}))
@CSSModules(styles)
export default class ContestList extends React.Component {
	constructor(props){
		super(props);
		this.state={
			total:''
		}
	};
    componentWillMount(){
    	this.props.dispatch(getContestTeam(toQuery({
			competitionId:this.props.params.id,
			page:1,
			rows:10,
			}))).then(() => {
    		this.setState({
    			total:this.props.news.contestTeams.total
    		});
		});
    };
	render(){
		const columns = [{
		  title: 'ID',
		  dataIndex: 'id',
		  key: 'id',
		}, {
		  title: '队名',
		  dataIndex: 'teamName',
		  key: 'teamName',
		}, {
		  title: '队员一',
		  dataIndex: 'stuName1',
		  key: 'stuName1',
		}, {
		  title: '学号',
		  dataIndex: 'stuNum1',
		  key: 'stuNum1',
		}, {
		  title: '班级',
		  dataIndex: 'stuClass1',
		  key: 'stuClass1',
		}, {
		  title: '队员二',
		  dataIndex: 'stuName2',
		  key: 'stuName2',
		}, {
		  title: '学号',
		  dataIndex: 'stuNum2',
		  key: 'stuNum2',
		}, {
		  title: '班级',
		  dataIndex: 'stuClass2',
		  key: 'stuClass2',
		}, {
		  title: '队员三',
		  dataIndex: 'stuName3',
		  key: 'stuName3',
		}, {
		  title: '学号',
		  dataIndex: 'stuNum3',
		  key: 'stuNum3',
		}, {
		  title: '班级',
		  dataIndex: 'stuClass3',
		  key: 'stuClass3',
		}, {
		  title: '状态',
		  dataIndex: 'status',
		  key: 'status',
		  render: (text, record) => {
		  	if(record.status==0){
		  		return 	<p style={{color:'#d9534f'}}>Reject</p>
		  	}
		  	else if(record.status==1){
		  		return 	<p style={{color:'#999'}}>Pending</p>
		  	}
		  	else if(record.status==2){
		  		return 	<p style={{color:'#5cb85c'}}>Accept</p>
		  	}
		  }
		}];
		let pageConfig = {
			competitionId:this.props.params.id,
            rows: rows,
            page: 1
        };
        const pagination = {
            total: this.state.total,
            onChange: function(cur) {
                pageConfig.page = cur;
                this.props.dispatch(getContestTeam(toQuery(pageConfig)));
            }.bind(this)
        };
		let data = [];
		if(!!this.props.news.contestTeams){
			this.props.news.contestTeams.pagingList.map((item, index) => {
				if(item.members.length===2){
					let dataTeam={
					id:item.competitionTeam.id,
					teamName:item.competitionTeam.teamName,
					stuName1:item.members[0].stuName,
					stuNum1:item.members[0].stuNum,
					stuClass1:item.members[0].stuClass,
					stuName2:item.members[1].stuName,
					stuNum2:item.members[1].stuNum,
					stuClass2:item.members[1].stuClass,
					status:item.competitionTeam.status,
					key:item.competitionTeam.id,
					}
					data.push(dataTeam);	
				}
				else if(item.members.length===3){
					let dataTeam={
					id:item.competitionTeam.id,
					teamName:item.competitionTeam.teamName,
					stuName1:item.members[0].stuName,
					stuNum1:item.members[0].stuNum,
					stuClass1:item.members[0].stuClass,
					stuName2:item.members[1].stuName,
					stuNum2:item.members[1].stuNum,
					stuClass2:item.members[1].stuClass,
					stuName3:item.members[2].stuName,
					stuNum3:item.members[2].stuNum,
					stuClass3:item.members[2].stuClass,
					status:item.competitionTeam.status,
					key:item.competitionTeam.id,
					}
					data.push(dataTeam);
				}
			});
		}
		return(
			<div className="col-20 col-offset-2" ref="myRef">
				<Table dataSource={data} columns={columns} pagination={pagination}/>
			</div>
			);
	};
}