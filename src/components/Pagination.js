import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Number = (props) => {
    let activeClass;
    props.active ? activeClass = "page-item active" : activeClass = "page-item";

    return(
        <li className={activeClass} key={props.counter}>
            <Link to={`/${props.pageType}/${props.counter}`} >{props.counter}</Link>
        </li>
    );
}

class Pagination extends Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, pageType, currentPage){

        if(e.target.rel === 'prev'){
            this.props.history.push(`/${pageType}/${currentPage-1}`)
        }else if(e.target.rel === 'next'){
            this.props.history.push(`/${pageType}/${currentPage+1}`)
        }
    }

    renderPagination(){
        const {
            topStoriesAmount,
            newStoriesAmount,
            showStoriesAmount,
            askStoriesAmount,
            jobStoriesAmount
        } = this.props;

        let pageNumbers = [];
        let adjacent = 2;
        let lastPage = 0;
        let storiesPerPage = 20;
        let pageType = this.props.match.params.pageType || 'top';
        let currentPage = parseInt(this.props.match.params.page, 10) || 1
        // console.log("params.page: ", this.props.match.params.page);
        // console.log("currentPage: ", currentPage);
        // console.log("params.pageType: ", this.props.match.params.pageType);
        if(pageType === 'new'){
            lastPage = Math.ceil(newStoriesAmount/storiesPerPage);
        }else if(pageType === 'show'){
            lastPage = Math.ceil(showStoriesAmount/storiesPerPage);
        }else if(pageType === 'ask'){
            lastPage = Math.ceil(askStoriesAmount/storiesPerPage);
        }else if(pageType === 'job'){
            lastPage = Math.ceil(jobStoriesAmount/storiesPerPage);
        }else if(pageType === 'item'){
            lastPage = 0;
        }else{ // For routes "/" and "/top"
            lastPage = Math.ceil(topStoriesAmount/storiesPerPage);
        }

        if(lastPage > 1){
            pageNumbers.push(
                <li className={1 === currentPage ? 'page-item disabled' : 'page-item'}>
                    <a onClick={(e) => this.handleClick(e, pageType, currentPage)} rel="prev">Previous</a>
                </li>
            );
            if(lastPage < 7 + (adjacent * 2)){ // Not enough pages to bother breaking it up
                for(let counter = 1; counter <= lastPage; counter++){
                    if(counter === currentPage){
                        pageNumbers.push( <Number pageType = {pageType} counter = {counter} active /> );
                    }else{
                        pageNumbers.push( <Number pageType = {pageType} counter = {counter} /> );
                    }
                }
            }else if(lastPage > 5 + (adjacent * 2)){ // Enough pages to hide some
                if(currentPage < 1 + (adjacent * 2)){ // Close to beginning. Only hide later pages
                    for(let counter = 1; counter < 4 + (adjacent * 2); counter++){
                        if(counter === currentPage){
                            pageNumbers.push( <Number pageType = {pageType} counter = {counter} active /> );
                        }else{
                            pageNumbers.push( <Number pageType = {pageType} counter = {counter} /> );
                        }
                    }
                    pageNumbers.push( <li className="page-item"><span>...</span></li> );
                    pageNumbers.push( <Number pageType = {pageType} counter = { lastPage-1 } /> );
                    pageNumbers.push( <Number pageType = {pageType} counter = { lastPage } /> );
                }else if(lastPage - (adjacent * 2) > currentPage && currentPage > (adjacent * 2)){ // In middle. Hide some front and some back
                    pageNumbers.push( <Number pageType = {pageType} counter = { 1 } /> );
                    pageNumbers.push( <Number pageType = {pageType} counter = { 2 } /> );
                    pageNumbers.push( <li className="page-item"><span>...</span></li> );
                    for(let counter = currentPage - adjacent; counter <= currentPage + adjacent; counter++){
                        if(counter === currentPage){
                            pageNumbers.push( <Number pageType = {pageType} counter = {counter} active /> );
                        }else{
                            pageNumbers.push( <Number pageType = {pageType} counter = {counter} /> );
                        }
                    }
                    pageNumbers.push( <li className="page-item"><span>...</span></li> );
                    pageNumbers.push( <Number pageType = {pageType} counter = { lastPage-1 } /> );
                    pageNumbers.push( <Number pageType = {pageType} counter = { lastPage } /> );
                }else{ // Close to end. Only hide early pages
                    pageNumbers.push( <Number pageType = {pageType} counter = { 1 } /> );
                    pageNumbers.push( <Number pageType = {pageType} counter = { 2 } /> );
                    pageNumbers.push( <li className="page-item"><span>...</span></li> );
                    for(let counter = lastPage - (2 + (adjacent * 2)); counter <= lastPage; counter++){
                        if(counter === currentPage){
                            pageNumbers.push( <Number pageType = {pageType} counter = {counter} active /> );
                        }else{
                            pageNumbers.push( <Number pageType = {pageType} counter = {counter} /> );
                        }
                    }
                }
            } // End else if
            pageNumbers.push(
                <li className={lastPage === currentPage ? 'page-item disabled' : 'page-item'} >
                    <a onClick={(e) => this.handleClick(e, pageType, currentPage )} rel="next">Next</a>
                </li>
            );
        } // End if

        return pageNumbers;
    }

    render(){
        console.log("Pagination-Props: ", this.props);

        return(
            <div className="sub-app-header">
                <ul className="pagination">
                    { this.renderPagination() }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        topStoriesAmount: state.topStoriesList.topStoriesAmount,
        newStoriesAmount: state.newStoriesList.newStoriesAmount,
        showStoriesAmount: state.showStoriesList.showStoriesAmount,
        askStoriesAmount: state.askStoriesList.askStoriesAmount,
        jobStoriesAmount: state.jobStoriesList.jobStoriesAmount,
    }
}

export default connect(mapStateToProps)(Pagination);
