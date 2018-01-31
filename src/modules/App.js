import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import RollNews from './RollNews/RollNews';
import Head from './Head/Head';
import 'antd/dist/antd.css';
import '../scss/global.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }
    static childContextTypes = {
        location: React.PropTypes.object,
        route: React.PropTypes.object
    };
    static contextTypes = {
        router: React.PropTypes.object
    };
    getChildContext() {
        return {
            location: this.props.location,
            route: this.props.route
        }
    }
    render() {
        return (
            <div>
              <Head />
				<Header router={this.context.router}/>
                <RollNews />
                { this.props.children }
                <Footer />
			</div>
        );
    }
}