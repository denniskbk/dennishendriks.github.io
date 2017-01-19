import React from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import $ from 'jQuery';

const SocialList = styled.ul`
    font-size: 20px;
    list-style: none;
    position: absolute;
    right: 0;
    padding-top: 10px;

    li {
        display: inline-block;
        padding-right: 25px;
    }

    a {
        transition: all 0.3s ease-in-out;
    }
`;

let Social = React.createClass({
    render() {
        return (
            <SocialList className="social__list">
                <li>
                    <a href='https://nl.linkedin.com/in/dennis-hendriks-b0a7a228'>
                        <i className="fa fa-linkedin-square" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href='https://www.youtube.com/c/DennisHendriks2/videos'>
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                    </a>
                </li>
                <li>
                    <a href='https://github.com/dennishendriks/dennishendriks.github.io'>
                        <i className="fa fa-github" aria-hidden="true"></i>
                    </a>
                </li>
            </SocialList>
        )
    }
});

export default Social;
