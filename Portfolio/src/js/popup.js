import React from 'react';
import $ from 'jquery';


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: this.props.currentIndex,
        };
    }

    /**
     * Close and reset popup
     */
    closePopup() {
        window.location.href = '#';
        this.setState({
            currentIndex: 0,
        });
    }

    /**
     * Set currentIndex from clicked item
     */
    componentDidUpdate(previousProps) {
        if (previousProps !== this.props) {
            this.setState({
                currentIndex: this.props.currentIndex,
            });
        }
    }

    /**
     * Navigate to item
     */
    navigateItems(navIndex) {
        this.setState({
            currentIndex: navIndex,
        });
    }

    render() {
        const { currentIndex } = this.state;
        const { blocks } = this.props;
        const block = blocks[currentIndex];
        const videoUrl = `https://www.youtube.com/embed/${block.videoUrl}`;

        let videoButton = null;
        if (block.type === 'website' && block.videoUrl !== '' ||
        block.type === 'overig' && block.videoUrl !== '') {
            videoButton =
            <a href={videoUrl} target='_blank' className='external-link'>
                <button> Bekijk video </button>
            </a>;
        }

        $('body').off().on('keydown', (e) => {
            /**
             * Detect key left/right to navigate
             */
            if (e.keyCode === 37) {
                if (currentIndex > 0) {
                    $('.item-nav.prev').trigger('focus');
                    this.navigateItems(currentIndex - 1);
                }
            }

            if (e.keyCode === 39) {
                if (currentIndex < blocks.length - 1) {
                    $('.item-nav.next').trigger('focus');
                    this.navigateItems(currentIndex + 1);
                }
            }

            /**
            * Detect key escape to close popup
            */
            if (e.keyCode === 27) {
                this.closePopup();
            }
        })
        .on('keyup', () => {
            $('.item-nav').trigger('blur');
        });

        let style = null;
        let videoSrc = null;
        /**
         * Set youtube video if element contains video else set background image
         */
        if (block.videoType === 'youtube') {
            videoSrc = `https://www.youtube.com/embed/${block.videoUrl}?rel=0&amp;showinfo=0&amp;enablejsapi=1`;
        } else {
            style = {
                backgroundImage: `url('${block.image}')`,
            };
        }

        return (
            <div id='popup'>
                <div className='popup__wrapper'>
                    <div className='popup-content__container'>
                        <a href='#' onClick={() => this.closePopup(this)}
                            className='close-button'>
                        </a>
                        <iframe className='popup-video' src={videoSrc} frameborder='0'
                            style={style} allowfullscreen>
                        </iframe>
                        <div className='popup-content'>
                            <h2> {block.title} </h2>
                            {block.description} <br /> <br />
                            <b> Klant: </b> <br />
                            {block.client} <br /> <br />
                            <b> Technologie: </b> <br />
                            {block.technology} <br />
                            {currentIndex > 0 &&
                                <a href='#popup' className='item-nav prev'
                                    onClick={() => this.navigateItems(currentIndex - 1)} >
                                </a>
                            }
                            {currentIndex < blocks.length - 1 &&
                                <a href='#popup' className='item-nav next'
                                    onClick={() => this.navigateItems(currentIndex + 1)} >
                                </a>
                            }
                            {block.link !== '' &&
                                <a href={block.link} target='_blank' className='external-link'>
                                    <button> Bekijk website </button>
                                </a>
                            }
                            {videoButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Popup;
