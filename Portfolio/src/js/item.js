import React from 'react';
import Image from './image.js';


class Item extends React.Component {
    render() {
        const { block, handleClick, index } = this.props;
        let imageSrc;
        if (block.videoUrl !== '' && block.videoType === 'youtube') {
            imageSrc = `https://img.youtube.com/vi/${block.videoUrl}/mqdefault.jpg`;
        } else {
            imageSrc = block.image;
        }

        /**
        *  IE Fallback for backgroundBlendMode
        */
        let divClass = '';
        if (window.getComputedStyle(document.body).backgroundBlendMode === undefined) {
            divClass = 'ie-fallback';
        }

        return (
            <a href='#popup'>
                <div key={ block.title }
                    className={`item-container col-xs-12 col-sm-6 col-md-4 col-lg-3 ${block.type}`}
                    onClick={() => handleClick(index)}>
                    <Image src={imageSrc} classNames={`list__item ${divClass}`}
                        title={block.title}
                        type={block.type}
                        description={block.description}
                        year={block.year}/>
                </div>
            </a>
        );
    }
}

export default Item;
