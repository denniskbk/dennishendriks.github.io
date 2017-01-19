import React from 'react';
import {render} from 'react-dom';
import styled, { keyframes, ThemeProvider } from 'styled-components';

import $ from 'jQuery';


const masonryOptions = {
    transitionDuration: '0.2s',
    initLayout: true
}

const Title = styled.h1`
font-size: 1.5em;
text-align: center;
color: purple;
z-index: 2;
position: absolute;
bottom: 25px;
left: 50%;
transform: translateX(-50%);
color: #fff;
text-transform: capitalize;
`;

const Wrapper = styled.section`
padding: 4em;
margin: 0 auto;
margin-top: 20px;
`;

const Listitem = styled.div`
list-style: none;
height: 200px;
position: relative;
transition: all 0.3s ease-in-out;
background-size: cover;
background-repeat: no-repeat;
background-position: top center;

h1 {
    z-index: 1;
    text-shadow: 0 0 55px rgba(0, 0, 0, 1);

}

div {
    transition: all 0.3s ease-in-out;
    z-index: 9;
    left: 0;
    margin-top: 130px;
}

&:hover {
    margin-top: -50px;

    div {
        margin-top: 150px;
        opacity: 100;
        visibility: visible;
    }
}
`;

const Description = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
padding: 25px;
background-color: rgb(96,96,96);
opacity: 0;
visibility: hidden;
color: #fff;

h1 {
    bottom: auto;
    top: 35px;
}

p {
    padding-top: 5px;
    padding-right: 20px;
    height: 60%;
    overflow: hidden;
    text-overflow: ellipsis;
    bottom: 10px;
    position: absolute;
}

.icon {
    border-radius: 25px;
    background-color: black;
    width: 50px;
    height: 50px;
    display: block;
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    text-decoration: none;

    > i {
        font-size: 30px;
        line-height: 50px;
        color: #fff;
    }

    &::after {
        content:'';
    }
}
`;

const Popup = styled.div`
min-width: 100vw;
min-height: 100vh;
z-index: 13;
position: fixed;
top: 0;
bottom: 0;
left: 0;
right: 0;
transition: opacity 500ms;
visibility: hidden;
opacity: 0;
overflow: scroll;

.video__wrapper {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 15px;
    top: 50%;
    transform: translateY(-50%);
    height: 0;

    .video__container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        .video__youtube-iframe {
            float: left;
            border: none;
            background-repeat: no-repeat;
            background-position: left top;
            background-size: cover;
        }
    }
}

&:target {
    visibility: visible;
    opacity: 1;
}
`;

const PopupContent = styled.div`
width: 40%;
display: block;
float: right;
padding: 25px;
padding-top: 0;
`;


let tabIndex = 0;
let Portfolio = React.createClass({
    /**
    * Get blocks from JSON and sort by year
    */
    getBlocks() {
        $.ajaxSetup({
            async: false
        });

        let blockItems;
        $.getJSON('assets/items.json', (data) => {
            blockItems = data;
        });

        return blockItems.blocks.slice(0).sort((a,b) => { return a.year - b.year; }).reverse();
    },


    /**
    * Clear popup and stop youtube video to play
    */
    closePopup(element, e) {
    $('.js-youtube-video')
    .css('background-image','none')
    .attr('src', '')
    [0].contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}', '*');
    },

    /**
    * Navigate items by click on prev or next button in popup
    */
    navigateItems(allBlocks, navItem, currentIndex, navItemIndex, e) {
        /**
        * Check if item is prev or next
        */
        if(navItemIndex > currentIndex) {
            if(navItemIndex < allBlocks.length) {
                this.setContent(navItem, e, navItemIndex);
                if(navItemIndex == (allBlocks.length - 1)) {
                    $('.js-item-nav-next').hide();
                }
            }
        } else {
            if(navItemIndex >= 0) {
                this.setContent(navItem, e, navItemIndex);
                if(navItemIndex == 0) {
                    $('.js-item-nav-prev').hide();
                }
            }
        }
    },

    /**
    * Set Content in popup
    */
    setContent(block, e, currentIndex) {
        const allBlocks = this.getBlocks();
        const prevItemIndex = currentIndex - 1;
        const nextItemIndex = currentIndex + 1;
        const prevItem = allBlocks[prevItemIndex];
        const nextItem = allBlocks[nextItemIndex];
        const combinedUrl = `https://www.youtube.com/embed/${block.videoUrl}?rel=0&amp;showinfo=0&amp;enablejsapi=1`;

        /**
        * Set video or image and clear previous
        */
        let element;
        if(block.videoType == 'youtube') {
            $('.js-youtube-video')
            .css('background-image','none')
            .attr('src', combinedUrl);
            // TODO: youtube element from iframe to react component -> rerender on click oid..
        } else {
            $('.js-youtube-video')
            .css('background-image','none')
            .attr('src', '')
            .css('background-image','url(' + block.image + ')');
        }

        /**
        * Create PopupContent, add next and prev button if no filter is used.
        * when loading of item-data is changed depending on chosen filter (see todo)
        * next and prev buttons are then always visible so this can be removed.
        */
        let PopupContent = `<h2> ${block.title} </h2><br /> ${block.description} <br /> <br /><b> Klant: </b><br /> ${block.client} <br /><br /> <b> Technologie: <br /> </b>  ${block.technology} <br />`;
        if($('.js-filter-all').hasClass('active')){
            /**
            * Hide button if item is first or last
            */
            if(currentIndex != 0) {
                PopupContent += `
                <a href='#popup' class='js-item-nav-prev item-nav prev' ></a>`;
            }
            if(currentIndex != (allBlocks.length - 1)) {
                PopupContent += `
                <a href='#popup' class='js-item-nav-next item-nav next' ></a>
                `
            }
        }

        if (block.link != '') {
            PopupContent += `<a href='${block.link}' target='_blank'> <button> Bekijk website </button> </a>`;
        }

        if (block.type == 'website' && block.videoUrl != '' || block.type == 'overig' && block.videoUrl != '') {
            PopupContent += `<a href='https://www.youtube.com/embed/${block.videoUrl}' target='_blank'> <button> Bekijk video </button> </a>`;
        }

        $('.js-popup-content').html(PopupContent);

        /**
        * Detect keydown to navigate items
        */
        $('body').off().on('keydown', (e) => {
            // Remove this hasClass check when loading of items is changed (see todo)
            if($('.js-filter-all').hasClass('active')){
                if(e.keyCode === 37) {
                    this.navigateItems(allBlocks, prevItem, currentIndex, prevItemIndex, e);
                } else if (e.keyCode === 39) {
                    this.navigateItems(allBlocks, nextItem, currentIndex, nextItemIndex, e);
                }
            }

            /**
            * Close popup on escape
            */
            if (e.keyCode === 27) {
                window.location.href = '#';
            }
        });

        $('.js-item-nav-prev').on('click', () => {
            this.navigateItems(allBlocks, prevItem, currentIndex, prevItemIndex, e);
        });
        $('.js-item-nav-next').on('click', () => {
            this.navigateItems(allBlocks, nextItem, currentIndex, nextItemIndex, e);
        });
    },

    createBlock(block, index) {
        tabIndex++;

        let divStyle;

        if(block.videoUrl != '' && block.videoType === 'youtube') {
            divStyle = {
                backgroundImage: 'url(https://img.youtube.com/vi/' + block.videoUrl + '/mqdefault.jpg)'
            }
        } else {
            divStyle = {
                backgroundImage: 'url(' + block.image + ')'
            }
        }

        /**
        *  IE Fallback for backgroundBlendMode
        */
        let divClass;
        if(window.getComputedStyle(document.body).backgroundBlendMode === undefined) {
            divClass = 'ie-fallback';
        }

        return <div key={ block.title } tabIndex={tabIndex} className={`item__container col-xs-12 col-sm-6 col-md-4 col-lg-3 ${block.type}`}>
            <Listitem style={divStyle} className={divClass} >
                <Title> { block.title } </Title>
                    <Description className='item__description'>
                        <Title>{ block.type }</Title>
                        <a className='icon' href='#popup' onClick={(e) => this.setContent(block, e, index)}>
                        <i></i>
                        </a>
                    <p>{ block.description }</p>
                </Description>
            </Listitem>
        </div>
    },

    createPopup(block, e, index) {
        return (
            <Popup id='popup'>
                <div className='video__wrapper'>
                    <div className='video__container'>
                        <a href='#' onClick={(e) => this.closePopup(this, e)} className='close-button'></a>
                        <iframe className='video__youtube-iframe js-youtube-video' src="" frameborder="0" allowfullscreen></iframe>
                        <PopupContent className='popup__content js-popup-content' />
                    </div>
                </div>
            </Popup>);
    },

    render() {
        return (
            <Wrapper className='portfolio'>
                { this.createPopup() }
                <div className={'container-fluid'}>
                    { this.getBlocks().map(this.createBlock) }
                </div>
            </Wrapper>
        )
    }
});

export default Portfolio;
