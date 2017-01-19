import React from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';

const theme = {
  main: 'red',
};

const GreenSection = (props) => {
  return (
    <ThemeProvider theme={theme}>
      {props.children}
    </ThemeProvider>
  );
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: purple;
`;

const Wrapper = styled.section`
  padding: 4em;
  background: orange;
`;

const Wrapper2 = styled.section`
    padding: 4em;
    background: blue;
`;


function Header () {
  return (
    <Wrapper>
        <GreenSection>
        </GreenSection>
      <Title>Dit is de titel</Title>
    </Wrapper>
  );
}

export default Header;
