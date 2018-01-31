import Simditor from 'simditor';
import React from 'react';
import ReactDOM from 'react-dom';
import 'simditor/styles/simditor.css';

// 保存不同的editor实例 editor需要有id属性且同一页面中id不能相同
let __editor = {};

export default class Editor extends React.Component {

    constructor(props) {
        super(props);
        this.value = '';
    }

    componentDidMount() {
        const editor = new Simditor({
            textarea: ReactDOM.findDOMNode(this.refs.editor)
        });
        editor.on('valuechanged', (e, src) => {
            const oldValue = this.value;
            editor.sync();
            this.value = editor.getValue();
            const value = this.value;
            // console.log(value, oldValue, oldValue !== value);
            // if (this.props.onChange && value !== oldValue) {
            //     this.props.onChange({
            //         target: {
            //             type: 'textarea',
            //             value: value
            //         }
            //     });
            // }
        });
        __editor[this.props.id] = editor;
    }

    componentDidUpdate() {
        const _editor = __editor[this.props.id];
        _editor.setValue(this.props.value);
    }

    componentWillUnmount() {
        __editor[this.props.id].destroy();
    }

    render() {
        return (
            <textarea id={this.props.id} ref="editor" key={this.props.id} />
        );
    }
};