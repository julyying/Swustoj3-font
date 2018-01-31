import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import classNames from 'classnames';
import CoStatus from '../../components/Status/CoStatus';
const contestId = -1;
@CSSModules(styles)
export default class Status extends React.Component {
	constructor() {
		super();
	};
	render() {
		return (
			<div styleName='wrapper' className='col-22 col-offset-1'>
				<CoStatus contestId={contestId}/>
			</div>
		);
	};
}