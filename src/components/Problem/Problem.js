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
    toQuery
} from '../../utils/utils';
import {
    getnote,
    addnote,
    updataproblemnote,
} from '../../actions/profile';
import {
    problemToHeader,
} from '../../actions/jumpPage';
import {
    getProblem,
    collectProblem,
} from '../../actions/problems';
import {
    hashHistory
} from 'react-router';
import CSSModules from 'react-css-modules';
import styles from './styles.scss';
import Codemirror from 'react-codemirror';
import {
    Select,
    Button,
    Tag,
    Input,
    Modal,
    message,
    Tooltip,
    Icon
} from 'antd';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import customStyles from './custom.css';
import {
    submitCode
} from '../../actions/ranklist';
const compiler = {
    'gcc': 1,
    'g++': 2,
    'java': 3,
    'Python': 4,
    'Pascal': 5
};
import {
    addTags
} from '../../actions/tags';
@connect(state => ({
    users: state.users,
    profile: state.profile,
    problem: state.problem,
    tags: state.tags,
    params: state.params,
}))
@CSSModules(styles)
export default class Problem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            mode: compiler['gcc'],
            code: props.problem.frameSource || '',
            problemId: props.problemId,
            userId: localStorage.userId,
            contestId: props.contestId,
            visible: false,
            loading: false,
            title: '',
            text: '',
            userId: '',
            tagVisible: false,
            tagstext: '',
            data: [],
            userCollect: true,
            pid:''
        };
    }
    componentDidMount() {
        this.props.dispatch(getnote(toQuery({
            rows: 10,
            page: 1,
            userId: this.state.userId,
            problemId: this.state.problemId,
            id: ''
        }))).then(() => {
            if (!!this.props.profile) {
                if(this.props.profile.data.length!=0){
                    this.setState({
                        data:this.props.profile.data,
                        title:this.props.profile.data[0].title,
                        text:this.props.profile.data[0].text,
                        pid:this.props.profile.data[0].id
                    });
                }
                
            }
        });
        this.setState({
            userId: localStorage.userId,
        });
    }
    collectThisProblem() {
        if (!!localStorage.userId) {
            const problem = {
                userId: parseInt(this.state.userId),
                problemId: parseInt(this.state.problemId)
            };

            //this.props.dispatch(collectProblem(toQuery(problem)));
            this.props.dispatch(collectProblem(problem)).then(() => {
                if (this.props.problem.collectCode === 'SUCCESS') {
                    this.setState({
                        userCollect: !this.state.userCollect
                    });
                    if (this.props.problem.userCollect === this.state.userCollect) {
                        message.success('收藏成功');
                    } else {
                        message.success('取消收藏成功');
                    }
                } else {
                    message.error("操作失败");
                }
            });
        } else {
            this.props.dispatch(problemToHeader({
                isLogin: false
            })).then(() => {});
        }
    };
    tagHandleOk(e) {
        this.setState({
            tagVisible: false
        });
        const tags = {
            name: this.state.tagstext
        }
        this.props.dispatch(addTags(toQuery({
            problemId: this.state.problemId
        }), tags)).then(() => {
            if (this.props.tags.code === 'SUCCESS') {
                message.success('添加标签成功');
            } else if (this.props.tags.code === 'REPEAT_ADD_ERROR') {
                message.warning('重复添加标签 ' + this.props.tags.code);
            } else {
                message.error('添加标签失败 ' + this.props.tags.code);
            }
        });
    };

    tagShowModal() {
        if (!!localStorage.userId) {
            this.setState({
                tagVisible: true,
            });
        } else {
            this.props.dispatch(problemToHeader({
                isLogin: false
            })).then(() => {});
        }
    };
    tagHandleCancel(e) {
        this.setState({
            tagVisible: false,
        });
    };
    tagHandleInputChange(e) {
        this.setState({
            tagstext: e.target.value
        });
    }
    onCompilerChange(value) {
        this.setState({
            ...this.state,
            mode: compiler[value]
        });
    }

    onSubmit() {
        if (!!localStorage.userId) {
            if (!!this.state.code) {
                this.props.dispatch(submitCode({
                    source: this.state.code,
                    problemId: this.state.problemId,
                    compilerId: this.state.mode,
                    contestId: this.state.contestId
                })).then(() => {
                    if (!!this.props.users.code) {
                        if (this.props.users.code == 'SUCCESS') {
                            message.success('代码提交成功！');
                            hashHistory.push(`/status`);
                        } else {
                            message.warning('哦哦～后端报错咯:' + this.props.users.code);
                        }
                    }
                });

            } else {
                message.warning('提交内容不能为空');
            }
        } else {
            this.props.dispatch(problemToHeader({
                isLogin: false
            })).then(() => {});
        }
    };

    onUpdateCode(newCode) {
        this.setState({
            ...this.state,
            code: newCode
        });
    };

    showModal() {
        if (!!localStorage.userId) {
            let Visible = true;
            this.setState({
                visible: true
            });
        } else {
            this.props.dispatch(problemToHeader({
                isLogin: false
            }));
        }
    };
    handleOk(e) {
        if(this.state.data.length==0){
            let note = {
                title: this.state.title,
                text: this.state.text,
                problemId: this.state.problemId
            }
            this.props.dispatch(addnote(note)).then(() => {
                if (!!this.props.profile.nodeCode) {
                    if (this.props.profile.nodeCode === 'SUCCESS') {
                        message.success('添加笔记成功');
                    } else {
                        message.warning('哦哦～后端报错咯:' + this.props.profile.nodeCode);
                    }
                    this.setState({
                        visible: false
                    })
                }
            });

        }else{
            let Note = {
                id: this.state.pid,
                title: this.state.title,
                text: this.state.text,
                postTime: '',
                userId: this.state.userId,
                problemId: this.state.noteid
            }
            //ProblemNote:Note


            this.props.dispatch(updataproblemnote(Note)).then(() => {
                this.props.dispatch(getnote(toQuery({
                    rows: 10,
                    page: 1,
                    userId: this.state.userId,
                    problemId: this.state.problemId,
                    id: ''
                }))).then(() => {
                    if (!!this.props.profile.code && this.props.profile.code != 'SUCCESS') {
                        var code = this.props.profile.code;
                        var warning = '';
                        message.warning('哦哦～后端报错咯:' + code);
                    };
                    if (!!this.props.profile) {
                        if(this.props.profile.data.length!=0){
                            this.setState({
                                data:this.props.profile.data,
                                title:this.props.profile.data[0].title,
                                text:this.props.profile.data[0].text,
                            });
                        }
                        
                    }
                    this.setState({
                            visible: false
                        });
                });
                
            });
        }
        
    };
    handleCancel() {
        this.setState({
            visible: false
        });
    };
    handleInputChange1(e) {
        this.setState({
            ...this.state,
            title: e.target.value,
        });
    };
    handleInputChange2(e) {
        this.setState({
            ...this.state,
            text: e.target.value,
        });
    }
    render() {
        var displayTags = () => {
            if (!!problem.tags) {
                return <div styleName="tags">Tags: {problem.tags}</div>
            }
        }
        const compilerLanguage = ['gcc', 'g++', 'Python', 'java', 'Pascal'];
        const Option = Select.Option;
        const problem = this.props.problem;
        let CompilerId = 'gcc';
        if (typeof(this.props.problem.frameSourceCompilerId) != "undefined") {
            CompilerId = compilerLanguage[this.props.problem.frameSourceCompilerId];
        }
        let options = {
            lineNumbers: true,
            mode: this.state.mode,
            theme: 'monokai',
            autoSave: true
        };
        let ActagSize = 'tagsize';
        let collectTagSize = 'tagsize';
        if (this.props.problem.userCollect === this.state.userCollect) {
            collectTagSize = 'tagsize_blue';
        } else {
            collectTagSize = 'tagsize';
        }
        if (this.props.problem.userAc) {
            ActagSize = 'tagsize_blue';
        } else {
            ActagSize = 'tagsize';
        }
        return (
            <div styleName="wrapper" className="m-problem-wrapper" style={customStyles}>
                <div className="col-1">
                    <div styleName="tag">
                        <Tooltip placement="right" title="AC"><Tag styleName="_tag" ><Icon type="check" styleName={ActagSize} /></Tag></Tooltip>
                        <Tooltip placement="right" title="addNote"><Tag styleName="_tag" onClick={this.showModal.bind(this)}><Icon type="book" styleName="tagsize"/></Tag></Tooltip>
                        <Tooltip placement="right" title="addTag"><Tag styleName="_tag" onClick={this.tagShowModal.bind(this)}><Icon type="tag-o" styleName="tagsize" /></Tag></Tooltip>
                        <Tooltip placement="right" title="Collect"><Tag styleName="_tag" onClick={this.collectThisProblem.bind(this)}><Icon type="heart" styleName={collectTagSize} /></Tag></Tooltip>
                        <Modal ref="modal"
                          visible={this.state.visible}
                          title="添加笔记" onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                          footer={[
                            <Button key="back" type="ghost" size="large" onClick={this.handleCancel.bind(this)}>close</Button>,
                            <Button key="submit" type="primary" size="large" loading={this.state.loading} onClick={this.handleOk.bind(this)}>submit </Button>,
                          ]}>
                          <p styleName="jiange">title:<Input placeholder="" onChange={this.handleInputChange1.bind(this)} value={this.state.title} /></p>

                          <p>text:<Input placeholder="" type="textarea"rows={8} onChange={this.handleInputChange2.bind(this)} value={this.state.text} /></p>
                          
                        </Modal>
                        <Modal title="添加标签" visible={this.state.tagVisible} onCancel={this.tagHandleCancel.bind(this)} onOk={this.tagHandleOk.bind(this)}>
                            <Input placeholder="添加的标签名" onChange={this.tagHandleInputChange.bind(this)}/>
                        </Modal>  
                     </div>
                </div>
                <div styleName="sidebar" className="col-8">
                    <div styleName="title">{problem.title}</div>
                    <div styleName="info" className="f-cb">
                        <div className="col-8">
                            <Tooltip title="Time limit" placement="topLeft">
                                <span><Icon type="clock-circle-o" /> {this.props.problem.timeLimit}(ms)</span>
                            </Tooltip>
                        </div>
                        <div className="col-8" >
                            <Tooltip title="Memory limit" placement="topLeft">
                                <span><Icon type="exclamation-circle-o" /> {this.props.problem.memoryLimit}(kb)</span>
                            </Tooltip>
                        </div>
                        <div className="col-8">
                            <Tooltip title="Accepted / Submission" placement="topLeft">
                                <span><Icon type="check-circle-o" /> {this.props.problem.acNum} / {this.props.problem.submitNum}</span>
                            </Tooltip>
                        </div>
                    </div>
                    <div styleName="content">
                        {displayTags()}
                        <div styleName="description" dangerouslySetInnerHTML={{__html: problem.description}}></div>
                        <div>
                            <h4>输入</h4>
                            <pre styleName="sample" dangerouslySetInnerHTML={{__html: problem.input}}></pre> 
                            <h4>输出</h4>
                            <pre styleName="sample" dangerouslySetInnerHTML={{__html: problem.output}}></pre>
                        </div>
                        <div>
                            <h4>样例输入</h4>
                            <pre styleName="sample" dangerouslySetInnerHTML={{__html: problem.sampleInput}}></pre>
                            <h4>样例输出</h4>
                            <pre styleName="sample" dangerouslySetInnerHTML={{__html: problem.sampleOutput}}></pre>
                        </div>
                    </div>
                </div>
                <div styleName="code" className="col-14">
                    <div styleName="codebar" className="f-cb">
                        <Button className="f-fr"  onClick={this.onSubmit.bind(this)}>提交</Button>
                        <Select defaultValue={CompilerId} className="f-fr"  onChange={this.onCompilerChange.bind(this)}>
                            <Option value="gcc">gcc</Option>
                            <Option value="g++">g++</Option>
                            <Option value="Python">Python</Option>
                            <Option value="java">java</Option>
                            <Option value="Pascal">Pascal</Option>
                        </Select>
                    </div>
                    <Codemirror options={options} onChange={ this.onUpdateCode.bind(this) } value={ this.state.code } />
                </div>
                
            </div>
        );
    }
}