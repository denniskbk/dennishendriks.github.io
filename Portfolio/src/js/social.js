import React from 'react';


const Social = React.createClass({
    render() {
        return (
            <ul className="social-list">
                <li>
                    <a href="https://nl.linkedin.com/in/dennis-hendriks-b0a7a228" target="_blank">
                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/c/DennisHendriks2/videos" target="_blank">
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/dennishendriks/dennishendriks.github.io" target="_blank">
                        <i className="fa fa-github" aria-hidden="true"></i>
                    </a>
                </li>
            </ul>
        );
    },
});

export default Social;
