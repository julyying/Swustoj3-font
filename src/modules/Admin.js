import React from 'react';
import {
  Menu,
  Icon,
  Breadcrumb
} from 'antd';
import classNames from 'classnames';
import {
  Link
} from 'react-router';

const SubMenu = Menu.SubMenu;

export default class Admin extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      collapse: true,
      lfIcon: props.location.pathname.split('/').length >= 4
    };
  }

  onCollapseChange() {
    this.setState({
      ...this.state,
      collapse: !this.state.collapse
    });
  }

  onSelect(item) {
    this.context.router.push(`/admin/${item.key}`);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname.split('/').length >= 4) {
      this.setState({
        ...this.state,
        lfIcon: true
      });
    } else {
      this.setState({
        ...this.state,
        lfIcon: false
      });
    }
  }

  render() {
    const isActive = this.context.router.isActive;
    const router = this.context.router;
    const curSelect = classNames({
      user: isActive('/admin/user'),
      problem: isActive('/admin/problem'),
      tag: isActive('/admin/tag')
    });
    const collapse = this.state.collapse;
    const lfIcon = this.state.lfIcon;
    return (
      <div className={collapse ? "ant-layout-aside ant-layout-aside-collapse" : "ant-layout-aside"}>
            <aside className="ant-layout-sider">
              <div className="ant-layout-logo">
                <Link to="/">{collapse ? "S" : "SWUST OJ"}</Link>
              </div>
              <Menu mode="inline" theme="dark" defaultSelectedKeys={[curSelect]} onClick={this.onSelect.bind(this)} >
                <Menu.Item key="user">
                    <Icon type="user" />
                    <span className="nav-text">用户管理</span>
                </Menu.Item>
                <Menu.Item key="problem">
                    <Icon type="book" />
                    <span className="nav-text">题目管理</span>
                </Menu.Item>
                <Menu.Item key="tag">
                    <Icon type="tag-o" />
                    <span className="nav-text">标签管理</span>
                </Menu.Item>
                <Menu.Item key="contest">
                    <Icon type="book" />
                    <span className="nav-text">比赛管理</span>
                </Menu.Item>
                <Menu.Item key="classes">
                    <Icon type="team" />
                    <span className="nav-text">班级管理</span>
                </Menu.Item>
                <Menu.Item key="picture">
                    <Icon type="picture" />
                    <span className="nav-text">轮播图管理</span>
                </Menu.Item>
                <Menu.Item key="news">
                    <Icon type="save" />
                    <span className="nav-text">新闻管理</span>
                </Menu.Item>
                <Menu.Item key="about">
                    <Icon type="info-circle-o" />
                    <span className="nav-text">关于</span>
                </Menu.Item>
              </Menu>
              <div className="ant-aside-action" onClick={this.onCollapseChange.bind(this)}>
                {collapse ? <Icon type="right" /> : <Icon type="left" />}
              </div>
            </aside>
            <div className="ant-layout-main">
              <div className="ant-layout-header"></div>
              <div className="ant-layout-goback">
                {
                  this.state.lfIcon
                    ? <Icon type="left" onClick={ router.goBack }/>
                    : null
                }
              </div>
              <div className="ant-layout-container">
                    {this.props.children}
              </div>
              <div className="ant-layout-footer">
                    ©2009-2017  西南科技大学计算机科学与技术学院
              </div>
            </div>
          </div>
    );
  }
}