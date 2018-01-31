import React from 'react';
import {
	Link
} from 'react-router';
import {
	connect
} from 'react-redux';
import {
	Menu,
	Icon,
	Card,
	Modal,
	Upload,
	Button,
	message
} from 'antd';
import {
	getUser,

	updataUser,

	getchallengeproblem

} from '../../actions/users';
import CSSModules from 'react-css-modules';
import configsSource from '../../constants/configsSource';
import configs from '../../constants/configs';
import styles from './styles.scss';
import {
	toQuery
} from '../../utils/utils';
import classNames from 'classnames';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const baseUrl = configsSource.baseUrl;
const configsUrl = configs.baseUrl;
const profile = {
	'.$problems': '我的题目',
	'.$contests': '我的比赛',
	'.$collect': '我的收藏',
	'.$tags': '我的标签',
	'.$road': '我的oj历程',
	'.$discuss': '我的问题笔记',
	'.$inf': '我的基本信息',
	'.$changePW': '修改密码'
};

@connect(state => ({
	user: state.user,
}))
@CSSModules(styles)
export default class Profile extends React.Component {

	static contextTypes = {
		router: React.PropTypes.object
	};

	constructor(props, context) {
		super(props, context); //调用基类的所有的初始化方法
		this.state = {
			current: '.$problems',
			currentOpenKey: '.$sub1',
			userId: '',
			avatar: '',
			userName: '',
			accepted: 0,
			challenging: 0,
			rank: 0,
			data: '',
			visible: false,
			priviewVisible: false,
			priviewImage: '',
			acNum: '',
			rankNum: '',
			challengNum: '',
			fileList: [{
				uid: -1,
				name: 'xxx.png',
				status: 'done',
				url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
				thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
			}],
			accept: ['jpeg', 'png']
		};
	};
	componentDidMount() {
		if (!!localStorage.userId) {
			this.setState({
				userId: localStorage.userId
			});
			this.props.dispatch(getUser(toQuery({
				ids: localStorage.userId,
				page: 1,
				rows: 1
			}))).then(() => {
				if (!!this.props.user.data) {
					let fileList = [{}];
					var data = this.props.user.data;
					var url = baseUrl + data.avatar;
					fileList = this.initfileList(fileList, url);
					this.setState({
						...this.state,
						data: data,
						avatar: url,
						fileList: fileList,
						userName: data.username,
						acNum: data.acNum,
						rankNum: data.rank
					});
				}
			}).then(() => {
				if (!!this.props.user.data) {
					var data = this.props.user.data;
					this.setState({
						...this.state,
						data: data,
						avatar: baseUrl + data.avatar,
						userName: data.username,
						acNum: data.acNum,
						rankNum: data.rank,
						challengNum: data.challengeNum
					});
				}
			});
			this.props.dispatch(getchallengeproblem(toQuery({
				userId: localStorage.userId,
			}))).then(() => {
				if (!!this.props.user.data) {
					var data = this.props.user.data;
				}
			});
		}

	};
	handleClick(e) {
		var key = e.key;
		if (!!key && key.indexOf('.$') != -1) {
			key = key.substring(2);
		}
		this.context.router.push(`/profile/${key}`);
		this.setState({
			...this.state,
			current: e.key
		});
	};
	handleImg(e) {
		this.setState({
			visible: true
		});
	};
	handleOk(e) {
		this.setState({
			visible: false,
		});
	};
	handleCancel(e) {
		this.setState({
			visible: false,
		});
	};
	handleCancel1(e) {
		this.setState({
			priviewVisible: false,
			visible: true
		});
	};
	initfileList(fileList, url) {
		fileList[0].url = url;
		fileList[0].uid = this.state.fileList[0].uid;
		fileList[0].name = this.state.fileList[0].name;
		fileList[0].status = this.state.fileList[0].status;
		fileList[0].thumbUrl = url;
		return fileList;

	};
	handleChange(info) {
		let fileList = info.fileList;

		// 1. 上传列表数量的限制
		//    只显示最近上传的一个，旧的会被新的顶掉
		fileList = fileList.slice(-1);

		// 2. 读取远程路径并显示链接
		//debugger;
		fileList = fileList.map((file) => {
			if (!!file.response) {
				if (file.response.code == "SUCCESS") {
					file.url = baseUrl + file.response.data.file[0].url;
				} else {
					message.error('哦哦～后端报错咯:' + file.response.code);
					return
				}
			}
			return file;
		});
		this.setState({
			fileList: fileList
		});
	};
	handlePreserve() {
		if (!!this.state.fileList[0]) {
			if (this.state.fileList[0].uid != -1) {
				this.props.dispatch(updataUser({
					avatar: this.state.fileList[0].url.replace(baseUrl, '')
				})).then(() => {

					if (!!this.props.user.code) {
						if (this.props.user.code != 'SUCCESS') {
							var code = this.props.user.code;
							var warning = '';
							message.warning('哦哦～后端报错咯:' + code);
						} else {
							message.success('保存成功');
							this.setState({
								avatar: baseUrl + this.props.user.info.avatar,
							});
						}
					};

				});
			}
			this.setState({
				visible: false,
			});
		} else {
			message.error('请上传图片哦');
		}
	};
	render() {
		let headers = {};
		if (!!localStorage.token) {
			var token = localStorage.token;
			headers = {
				'Authorization': `Bearer ${token}`
			};
		}
		const isActive = this.context.router.isActive;
		const router = this.context.router;
		const props = {
			action: configsUrl + '/pic/upload.do',
			listType: 'picture-card',
			headers: headers,
			onChange: this.handleChange.bind(this),
			onPreview: (file) => {
				this.setState({
					priviewImage: file.url,
					priviewVisible: true,
					visible: false
				});
			},
			accept: "image/jpg,image/jpeg,image/png,image/gif,img/bmp"
		};
		const curSelect = classNames({
			problems: isActive('/profile/problems'),
			contests: isActive('/profile/contests'),
			collect: isActive('/profile/collect'),
			road: isActive('/profile/road'),
			tags: isActive('/profile/tags'),
			discuss: isActive('/profile/discuss'),
			inf: isActive('/profile/inf'),
			changePW: isActive('/profile/changePW'),
		});
		this.state.current = '.$' + curSelect;
		const currentOpen = classNames({
			sub1: isActive('/profile/problems') || isActive('/profile/contests') || isActive('/profile/collect') || isActive('/profile/road') || isActive('/profile/tags'),
			sub2: isActive('/profile/discuss'),
			sub4: isActive('/profile/inf') || isActive('/profile/changePW'),
		});
		this.state.currentOpenKey = '.$' + currentOpen;
		return (
			<div styleName='profileWrap' className="col-22 col-offset-1 ant-layout-aside2 ant-layout-aside-collapse">
				<aside styleName='aside'  className="ant-layout-sider">
					<Card styleName="card" bodyStyle={{ padding: 0 }}>
					    <div styleName="custom-image" onClick={this.handleImg.bind(this)}>
					      	<img alt="example" width="100%" src={this.state.avatar} />
					      	<p>{this.state.userName}</p>
					    </div>
				  	</Card>
				  	<Modal title="上传头像（jpg,jpeg,png,gif,bmp）" visible={this.state.visible} onOk={this.handlePreserve.bind(this)} okText='保存' onCancel={this.handleCancel.bind(this)}>
			          	<div className="clearfix" styleName="Upload">
					        <Upload {...props} fileList={this.state.fileList}>
					          	<Icon type="plus" />
					          	<div styleName="ant-upload-text">上传照片</div>
					        </Upload>
					   		
					        <Modal visible={this.state.priviewVisible} styleName="priview"  footer={null} onCancel={this.handleCancel1.bind(this)}>
					        	<div styleName="priviewImg">
					          		<img alt="example" src={this.state.priviewImage} />
					          	</div>
					        </Modal>
					    </div>
			        </Modal>
					<Menu styleName='menu' onClick={this.handleClick.bind(this)}
				        style={{ width: 240 }}
				        defaultOpenKeys={[this.state.currentOpenKey]}
				        selectedKeys={[this.state.current]}
				        mode="inline">
				        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>OJ动态</span></span>}>
				          	<MenuItemGroup title="战绩">
								<Menu.Item key="problems">题目</Menu.Item>
					            <Menu.Item key="contests">比赛</Menu.Item>
				          	</MenuItemGroup>
				          	<MenuItemGroup title="足迹">
					            <Menu.Item key="collect">收藏</Menu.Item>
					            <Menu.Item key="tags">标签</Menu.Item>
					            <Menu.Item key="road">oj历程</Menu.Item>
				          	</MenuItemGroup>
				        </SubMenu>

				        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>信息</span></span>}>

				          	<Menu.Item key="discuss">问题笔记</Menu.Item>

				        </SubMenu>
				        <SubMenu key="sub4" title={<span><Icon type="setting" /><span>设置</span></span>}>
					          <Menu.Item key="inf">基本信息</Menu.Item>
					          <Menu.Item key="changePW">修改密码</Menu.Item>
				        </SubMenu>
				    </Menu>
			    </aside>
			    <div styleName='main' className="ant-layout-main">

					<div styleName='header'>{profile[this.state.current]}</div>
				  		
				    <div>
				        {this.props.children}
				  	</div>
				  	
				</div>
			</div>
		);
	};
}