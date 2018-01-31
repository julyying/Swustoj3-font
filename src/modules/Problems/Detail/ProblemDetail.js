import React, {
  PropTypes
} from 'react';
import {
  Link
} from 'react-router';
import {
  Tag,
  Icon,
  Button,
  Input,
  Modal,
  Tooltip,
} from 'antd';
import {
  connect
} from 'react-redux';
import {
  toQuery
} from '../../../utils/utils';
import {
  getProblem,
} from '../../../actions/problems';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Problem from '../../../components/Problem/Problem';
const confirm = Modal.confirm;
@connect(state => ({
  problem: state.problem
}))
@CSSModules(styles)
export default class ProblemDetail extends React.Component {


  constructor() {
    super();
    this.state = {
      userId: '',
      problemId: '',
      visible: false,
      tags: '',
    };
  };
  componentDidMount() {
    this.setState({
      userId: localStorage.userId,
      problemId: this.props.params.id,
    });
  }

  static fillStore(redux, props) {
    redux.dispatch(getProblem(props.params.id));
  };
  render() {

    return (
      <div className="col-24" styleName="container">
                  
            <Problem problemId={this.props.params.id} contestId={this.props.params.contestId}  problem={this.props.problem}/>
      </div>
    );
  };

}