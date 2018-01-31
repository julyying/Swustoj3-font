import React from 'react';
import styles from './styles.scss';
import CSSModules from 'react-css-modules';
@CSSModules(styles)
export default class Footer extends React.Component {
	render() {
		return (
			<footer styleName='footer'>
				<div >© Copyright 2009-2017 - 西南科技大学计算机科学与技术学院.</div>
				<div>Any problem, Please <a href='mailto:yangchunm@foxmail.com'>Contact LOCO团队</a></div>

				{/*<div >© Copyright 2009-2017 - 技术支持:知识工程实验室LOCO团队.</div>
				<div>Any problem, Please <a href='mailto:yangchunm@foxmail.com'>Contact Administrator</a></div>*/}


			</footer>
		);
	};
}