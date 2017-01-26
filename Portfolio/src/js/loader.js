import React from 'react';


class Spinner extends React.Component {

    render() {
        return (
            <div className='loader-container'>
                <div className="loader-container__bar"></div>
                <div className="loader-container__bar"></div>
                <div className="loader-container__bar"></div>
                <div className="loader-container__bar"></div>
            </div>
        );
    }
}

export default Spinner;
