import React from 'react';
import { render } from 'react-dom';

import Portfolio from './portfolio.js';
import Filter from './filter.js';
import Social from './social.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterIndex: 0,
        };
    }

    changeFilterIndex(filterIndex) {
        this.setState({
            filterIndex,
        });
    }

    render() {
        return (
            <div>
                <Social />
                <Filter filterIndex={this.state.filterIndex}
                    changeFilterIndex={this.changeFilterIndex.bind(this)} />
                <Portfolio filterIndex={this.state.filterIndex} />
            </div>
        );
    }
}

render(
    <App />
, document.querySelector('#app'));
