import React from 'react';
import $ from 'jquery';

import Item from './item.js';
import Popup from './popup.js';

class Portfolio extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedBlockIndex: null,
        };

        $.ajaxSetup({
            async: false,
        });
    }

    getAllBlocks() {
        let allBlocks = '';

        $.getJSON('assets/items.json', (data) => {
            allBlocks = data.blocks.slice(0).sort((a, b) => a.year - b.year).reverse();
        });

        return allBlocks;
    }

    setBlocks(blocks) {
        this.setState({ blocks });
    }

    componentWillMount() {
        this.setBlocks(this.getAllBlocks());
    }

    componentDidUpdate(previousProps) {
        const { filterIndex } = this.props;

        if (previousProps !== this.props) {
            if (filterIndex > 0) {
                this.filterBlocks(this.getAllBlocks(), filterIndex);
            } else {
                this.setBlocks(this.getAllBlocks());
            }
        }
    }

    filterBlocks(blocks, filterIndex) {
        const navItems = [
            'all',
            'video',
            'website',
            'overig',
        ];
        const filteredBlocks = blocks.filter(item => item.type === navItems[filterIndex]);
        this.setBlocks(filteredBlocks);
    }

    handleClick(selectedBlockIndex) {
        this.setState({
            selectedBlockIndex,
        });
    }

    getSelectedBlock() {
        const { blocks, selectedBlockIndex } = this.state;
        return blocks[selectedBlockIndex];
    }

    render() {
        const { blocks, selectedBlockIndex } = this.state;
        const items = blocks.map((block, index) =>
            <Item key={index} block={block} index={index}
                handleClick={this.handleClick.bind(this)} />
        );
        const selectedBlock = this.getSelectedBlock();

        return (
            <section className='portfolio'>
                <div className={'container-fluid'}>
                    {selectedBlockIndex >= 0 && selectedBlock &&
                        <Popup block={selectedBlock} currentIndex={selectedBlockIndex}
                            blocks={blocks} />
                    }
                    {items}
                </div>
            </section>
        );
    }
}

export default Portfolio;
