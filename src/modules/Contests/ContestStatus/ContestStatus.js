import React from 'react';
import CSSModules from 'react-css-modules';
import CoStatus from '../../../components/Status/CoStatus';
import styles from './styles.scss';
@CSSModules(styles)
export default class ContestStatus extends React.Component {
    constructor() {
        super();
    };

    render() {
        return (
            <div>
                <CoStatus contestId={this.props.contestId}/>
            </div>
        );
    };
}