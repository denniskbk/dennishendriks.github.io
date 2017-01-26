import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeFilterIndex: 0,
        };

        this.navItems = [
            'all',
            'video',
            'website',
            'overig',
        ];
    }

    onClickFilter(index) {
        this.props.changeFilterIndex(index);
        this.setState({
            activeFilterIndex: index,
        });
    }

    render() {
        const { activeFilterIndex } = this.state;
        let activeClass = '';
        const nav = this.navItems.map((label, index) => {
            if (index === activeFilterIndex) {
                activeClass = 'active';
            } else {
                activeClass = '';
            }
            return <button key={label} onClick={() => this.onClickFilter(index)}
                className={`filter__${label}Button ${activeClass}`} >
                    {label}
                </button>;
        });
        return (
            <nav>
                {nav}
            </nav>
        );
    }
}

export default Filter;
