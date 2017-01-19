import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jQuery';

export default class Video extends React.Component {
    static defaultProps = {
        poster: null,
        src: null,
        width: 640,
        height: 360,
        className: 'video-js vjs-default-skin vjs-big-play-centered',
        controls: true,
        autoplay: false,
        preload: 'auto'
    }

    componentDidMount() {
        this.loadVideo();
    }

    loadVideo = () => {
        if(this.video || !this.props.src)
            return;

        let node = ReactDOM.findDOMNode(this.refs.videoplayer);
        if(!node)
            return;

        this.video = document.createElement('video');
        if(this.props.youtube) {
            this.video.setAttribute('data-setup', `{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "src": "${this.props.src}"}] }`);
            $(this.video).css({'width':'300px', 'height':'300px'});
        }
        this.video.src = this.props.src;
        this.video.width = this.props.width;
        this.video.height = this.props.height;
        this.video.className = this.props.className;
        node.appendChild(this.video);

        const player = window.player = videojs(this.video, this.props, () => {
            window.addEventListener('resize', () => {
                const canvas = player.getChild('Canvas');
                if(canvas) canvas.handleResize();
            });
        });

        const width = this.video.offsetWidth;
        const height = this.video.offsetHeight;
        player.width(width),
        player.height(height);

        if(this.props.panorama) {
            player.panorama({
                clickAndDrag: true,
                autoMobileOrientation: true,
                initFov: 75,
                VREnable: true,
                backToVerticalCenter: false,
                backToHorizonCenter: false,
                showNotice: false
            });
        }
    }

    render() {
        return <div ref="videoplayer"  />;
    }
}


// import React, {Component, PropTypes} from 'react'
// import videojs from 'video.js';
//
//
// class VideoPlayer extends Component {
//
//   // static propTypes = {
//   //   video: PropTypes.object.isRequired,
//   // }
//
//   state = {}
//
//   componentDidMount() {
//     const {videojs} = global
//     if (!videojs) {
//       return
//     }
//     const {video} = this.props
//     this.state.player = videojs(video.id)
//   }
//
//   componentWillUnmount() {
//     if (this.state.player) {
//       this.state.player.dispose()
//     }
//   }
//
//
//   render() {
//     const {video: {id, src, poster}} = this.props
//     const videoHtml = `
//       <video id="${id}" class="video-js vjs-default-skin" controls
//        preload="auto" poster="${poster}"
//       >
//         <source src="${src}" type="video/mp4" />
//         <p class="vjs-no-js">
//           To view this video please enable JavaScript
//         </p>
//       </video>
//     `
//     return (
//       <div dangerouslySetInnerHTML={{__html: videoHtml}}></div>
//     )
//   }
// }
// export default VideoPlayer;
//
// // import React, { Component } from 'react';
// // // import ProductVideo from 'react-video-js';
// //
// // import videojs from 'video.js';
// // // import panorama from 'videojs-panorama';
// //
// // import styled, { keyframes, ThemeProvider } from 'styled-components';
// // import $ from 'jQuery';
// //
// //
// // export default class VideoPlayer extends Component {
// //   let propTypes = {
// //     video: PropTypes.object.isRequired
// //   }
// // }
// //   //
// //   // state = {}
// //   //
// //   // componentDidMount() {
// //   //   const {videojs} = global
// //   //   if (!videojs) {
// //   //     return
// //   //   }
// //   //   const {video} = this.props
// //   //   this.state.player = videojs(video.id)
// //   // }
// //   //
// //   // componentWillUnmount() {
// //   //   if (this.state.player) {
// //   //     this.state.player.dispose()
// //   //   }
// //   // }
// //   //
// //   // render() {
// //   //   const {video: {id, src, poster}} = this.props
// //   //   const videoHtml = `
// //   //     <video id="${id}" class="video-js vjs-default-skin" controls
// //   //      preload="auto" poster="${poster}"
// //   //     >
// //   //       <source src="${src}" type="video/mp4" />
// //   //       <p class="vjs-no-js">
// //   //         To view this video please enable JavaScript
// //   //       </p>
// //   //     </video>
// //   //   `
// //   //   return (
// //   //     <div dangerouslySetInnerHTML={{__html: videoHtml}}></div>
// //   //   )
// //   // }
// // // }
// //
// //
// //
// //
// // // let Video = React.createClass({
// // //     render() {
// // //         return (
// // //             <div>
// // //                 Video
// // //             </div>
// // //         )
// // //     }
// // // });
// //
// // const displayName = 'PanoramaVideoPlayer';
// // const player = null;
// //
// // // class PanoramaVideoPlayer extends Component({
// // let Video = React.createClass({
// //     // constructor(props){
// //     //     super(props);
// //     //     this.displayName = 'PanoramaVideoPlayer';
// //     //     this.player = null;
// //     // }
// //
// //     initializePlayer() {
// //         // const player = window.player = videojs( {}, () => {
// //         //     // window.addEventListener('resize', () => {
// //         //     //     const canvas = player.getChild('Canvas');
// //         //     //     if(canvas) canvas.handleResize();
// //         //     // });
// //         // });
// //         //
// //         // player.panorama({
// //         //     clickAndDrag: true,
// //         //     autoMobileOrientation: true,
// //         //     initFov: 75,
// //         //     VREnable: true,
// //         //     backToVerticalCenter: false,
// //         //     backToHorizonCenter: false,
// //         //     showNotice: false,
// //         //     callback: () => {
// //         //     }
// //         // });
// //
// //
// //         // const { videoInfo } = this.props;
// //         // const videoElement = this.player;
// //         // const isMobile = false;
// //         //
// //         // this.player = videojs(videoElement, {}, () =>{
// //         //     window.addEventListener('resize', () => {
// //         //         const canvas = this.player.getChild('Canvas');
// //         //         if(canvas) canvas.handleResize();
// //         //     });
// //         // });
// //         //
// //         // this.player.poster(videoInfo.imageUrl);
// //         // this.player.src({src: videoInfo.videoURL, type: 'video/mp4' });
// //         //
// //         // const width = videoElement.offsetWith;
// //         // const height = videoElement.offsetHeight;
// //         //
// //         // this.player.width(width), this.player.height(height);
// //         // panorama(this.player, {
// //         //     clickToToggle: (!isMobile)
// //         // });
// //         //
// //         // this.player.on('VRModeOn', function(){
// //         //     this.player.controlBar.fullscreenToggle.trigger('tap');
// //         // });
// //         //
// //
// //     },
// //
// //     componentDidMount() {
// //         this.initializePlayer();
// //     },
// //
// //     render() {
// //         return (
// //             <ProductVideo
// //                 ref={i => this.pv = 1}
// //                 source='assets/videos/360.mp4'
// //             />
// //         );
// //     }
// // });
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// // // <div className='panorama__video__player'>
// // //     <div className='panorama__video__player__wrapper'>
// // //         <div className='panorama__video__player__container'>
// // //             <video className='video-js vjs-default-skin' crossOrigin='anonymous' control>
// // //             </video>
// // //         </div>
// // //     </div>
// // // </div>
// // //
// // //
// // //
// // //
// // // let Video = React.createClass({
// // //     render() {
// // //         return (
// // //             <div>
// // //                 Video
// // //             </div>
// // //         )
// // //     }
// // // });
// // //
// // // export default Video;
