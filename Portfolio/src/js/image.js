import React from 'react';
import Loader from './loader.js';


class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            opacity: 0,
            backgroundImage: '',
            isLoading: true,
        };
        this.fadeIn = () => this.setState({
            opacity: 1,
            backgroundImage: `url('${this.props.src}')`,
            isLoading: false,
        });
    }

    componentDidMount() {
        const img = this.img = document.createElement('img');
        img.src = this.props.src;
        img.addEventListener('load', this.fadeIn);
    }

    componentWillUnmount() {
        this.img.removeEventListener('load', this.fadeIn);
    }

    render() {
        const { opacity, backgroundImage, isLoading } = this.state;
        const { src, title, type, description, classNames } = this.props;

        if (isLoading) {
            return (
                <Loader />
            );
        }

        return (
            <div className={classNames} src={src}
                style={{ opacity, backgroundImage }} >
                <h1> {title} </h1>
                <div className='item__description'>
                    <h1>{type}</h1>
                    <i className='icon'></i>
                    <p>{description}</p>
                </div>
            </div>
        );
    }
}

export default Image;
