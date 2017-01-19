import React from 'react';
import styled, { keyframes, ThemeProvider } from 'styled-components';
import $ from 'jQuery';

const Button = styled.button`
  font-size: 1em;
  border-radius: 3px;
  margin-top:  50px;
  outline: none;
  border: none;
  height: 40px;
  width: 80px;
  margin-left: 10px;
  margin-right: 10px;
  background-color: transparent;
  transition: all 0.3s ease-in-out;
`;

let Filter = React.createClass({
    /**
     * Show all items
     */
    showAll() {
        $('button.js-filter').removeClass('active');
        $('button.js-filter-all').addClass('active');
        $('.item__container').fadeIn('slow');
    },

    /**
     * On button click filter items
     */
    onClickFilter(filter, e) {
        e.stopPropagation();
        if(filter == 'all') {
            this.showAll();
        } else {
            $(e.currentTarget).toggleClass('active');
            /**
             * If filter all is active show all items (no filter)
             */
            if($('.js-filter-all.active').length == 1) {
                $('.js-filter-all').removeClass('active');
                $('.item__container').not(`.${filter}`).fadeOut('slow');
                $(`.${filter}`).fadeIn('slow');
            } else {
                /**
                 * Show all items when no filter is active or if all filters are active
                 */
                if($('.active').length == 0 || $('.active').length == $('.js-filter').length){
                    this.showAll();
                } else {
                    $(`.${filter}`).fadeToggle('slow');
                }
            }
        }
    },

    render() {
        return (
            <nav>
                <Button onClick={(e) => this.onClickFilter('all', e)} className='filter__all js-filter-all active' >All</Button>
                <Button className='filter__videoButton js-filter' onClick={(e) => this.onClickFilter('video', e)}>Video</Button>
                <Button className='filter__websiteButton js-filter' onClick={(e) => this.onClickFilter('website', e)}>Website</Button>
                <Button className='filter__overigButton js-filter' onClick={(e) => this.onClickFilter('overig', e)}>Overig</Button>
            </nav>
        )
    }
});

export default Filter;
