import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import { fetchStories } from '../actions/stories';

class Stories extends Component{
    componentDidMount(){
        // console.log("here");
        let pageType = this.props.match.params[0] || 'top';
        let currentPage = this.props.match.params.page || '1'
        this.props.fetchStories(pageType, currentPage);
    }

    componentWillReceiveProps(nextProps){
        let pageType = this.props.match.params[0] || 'top';
        let currentPage = this.props.match.params.page || '1';

        let nextPageType = nextProps.match.params[0] || 'top';
        let nextCurrentPage = nextProps.match.params.page || '1';

        // console.log(`${pageType} !== ${nextPageType} || ${currentPage} !== ${nextCurrentPage}`);
        if(pageType !== nextPageType || currentPage !== nextCurrentPage){
            this.props.fetchStories(nextPageType, nextCurrentPage);
            // console.log("hello 2");
        }
    }

    renderStories(){
        let pageType = this.props.match.params[0] || 'top';
        let stories;

        if(pageType === 'new'){
            stories = this.props.newStories;
        }else if(pageType === 'show'){
            stories = this.props.showStories;
        }else if(pageType === 'ask'){
            stories = this.props.askStories;
        }else if(pageType === 'job'){
            stories = this.props.jobStories;
        }else{ // For routes "/" and "/top"
            stories = this.props.topStories;
        }

        return Object.keys(stories).map((key, index) => {
            let url = stories[key].url ? stories[key].url.replace('www.','').split("/")[2] : '';
            let commentsLength = Object(stories[key].kids).length !== undefined ? Object(stories[key].kids).length : '0';

            let date = moment.unix(stories[key].time).toDate();
            let today = moment();
            let time = today.to(date);

            return(
                <div key={ index } className="story">
                    <StoryScore>{ stories[key].score }</StoryScore>
                    <div className="story-body">
                        <div className="story-title-wrapper">
                            <StoryTitle url={stories[key].url} id={stories[key].id}>
                                {stories[key].title}
                            </StoryTitle>
                            <StoryURL>{ url }</StoryURL>
                        </div>
                        <div className="story-meta">
                            <StoryTime>{ time }</StoryTime>
                            <StoryBy url={`/user/${stories[key].by}`}>{ stories[key].by }</StoryBy>
                            <StoryComments id={stories[key].id} active={pageType !== 'job' ? true : false }>{ commentsLength }</StoryComments>
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderLoading(){
        return(
            <div className="loading-indicator">
                <img src="/images/react-spinner.svg" alt="loading" className="indicator"/>
            </div>
        );
    }

    render(){
        console.log("Stories-Props: ", this.props);
        const {
            topStoriesLoading,
            newStoriesLoading,
            showStoriesLoading,
            askStoriesLoading,
            jobStoriesLoading
        } = this.props;

        let loading;

        if(topStoriesLoading){
            loading = topStoriesLoading;
        }else if(newStoriesLoading){
            loading = newStoriesLoading;
        }else if(showStoriesLoading){
            loading = showStoriesLoading;
        }else if(askStoriesLoading){
            loading = askStoriesLoading;
        }else if(jobStoriesLoading){
            loading = jobStoriesLoading;
        }

        return(
            <div className="main-wrapper">
                { !loading ? this.renderStories() : this.renderLoading() }
            </div>
        );
    }
}

const StoryScore = (props) => (
    <div className="story-score">
        { props.children }
    </div>
);

const StoryTitle = (props) => {
    if(props.url){
        return(
            <a href={ props.url }
                target="_blank"
                className="story-title">{ props.children }
            </a>
        );
    }else{
        return(
            <Link to={`/item/${props.id}`}
                className="story-title">{ props.children }
            </Link>
        );
    }
};

const StoryURL = (props) => (
    <span className="story-url">{ props.children }</span>
);

const StoryTime = (props) => (
    <div className="story-time">
        <span>{props.children}</span>
    </div>
);

const StoryBy = (props) => (
    <div className="story-by">
        posted by&nbsp;
        <a href={props.url}>
            <span>{ props.children }</span>
        </a>
    </div>
);

const StoryComments = (props) => {
    if(props.active){
        return(
            <div className="story-comments">
                <Link to={`/item/${props.id}`}>
                    <i className="icon icon-message"></i>
                    <span>{`${props.children} comments`}</span>
                </Link>
            </div>
        );
    }
    return false;
};

const mapStateToProps = (state) => {
    return {
        topStories: state.topStoriesList.topStories,
        topStoriesLoading: state.topStoriesList.loading,
        topStoriesAmount: state.topStoriesList.topStoriesAmount,
        newStories: state.newStoriesList.newStories,
        newStoriesLoading: state.newStoriesList.loading,
        newStoriesAmount: state.newStoriesList.newStoriesAmount,
        showStories: state.showStoriesList.showStories,
        showStoriesLoading: state.showStoriesList.loading,
        showStoriesAmount: state.showStoriesList.showStoriesAmount,
        askStories: state.askStoriesList.askStories,
        askStoriesLoading: state.askStoriesList.loading,
        askStoriesAmount: state.askStoriesList.askStoriesAmount,
        jobStories: state.jobStoriesList.jobStories,
        jobStoriesLoading: state.jobStoriesList.loading,
        jobStoriesAmount: state.jobStoriesList.jobStoriesAmount,
    };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchStories: fetchStories
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Stories);
