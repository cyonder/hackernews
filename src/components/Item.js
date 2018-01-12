import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchItem } from '../actions/items';

import Comments from './Comments';

class Item extends Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    renderItem(){
        const { story, comments } = this.props.item;

        let url = story.url ? story.url.replace('www.','').split("/")[2] : '';

        let date = moment.unix(story.time).toDate();
        let today = moment();
        let time = today.to(date);

        return(
            <div className="item-details">
                <StoryTitle url={ story.url }>{ story.title }</StoryTitle>
                <StoryURL url={ story.url }>{ url }</StoryURL>
                <div className="item-meta h6">
                    <StoryScore>{ story.score }</StoryScore>
                    <StoryTime>{ time }</StoryTime>
                    <StoryBy url={`/user/${story.by}`}>{ story.by }</StoryBy>
                </div>
                <StoryText active={ story.text } >{ story.text }</StoryText>
                { story.kids ? <Comments comments={ comments } item = { this.props.item }/> : false }
            </div>
        );
    }

    renderLoading(){
        return(
            <div className="loading-indicator">
                <img src="/images/react-spinner.svg" alt="loading" className="indicator"/>
            </div>
        );
    }

    render(){
        console.log("Item-Props: ", this.props);
        const { story, comments } = this.props.item;

        return(
            <div className="main-wrapper">
                { story ? this.renderItem() : this.renderLoading() }
            </div>
        );
    }
}

const StoryTitle = (props) => {
    if(props.url){
        return(
            <a href={ props.url }
                target="_blank"
                className="item-title h4">{ props.children }
            </a>
        );
    }else{
        return(
            <span className="item-title h4">{ props.children }</span>
        );
    }
};

const StoryURL = (props) => (
    <span className="item-url">{ props.children }</span>
);

const StoryScore = (props) => (
    <div className="item-score">
        { `${props.children} points` }
    </div>
);

const StoryTime = (props) => (
    <div className="item-time">
        <span>{props.children}</span>
    </div>
);

const StoryBy = (props) => (
    <div className="item-by">
        posted by&nbsp;
        <a href={props.url}>
            <span>{ props.children }</span>
        </a>
    </div>
);

const StoryText = (props) => {
    if(props.active){
        return(
            <div className="item-text">
                <div dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(props.children)}}></div>
            </div>
        );
    }
    return false
}

var entities = {
    'amp': '&',
    'apos': '\'',
    '#x27': '\'',
    '#x2F': '/',
    '#39': '\'',
    '#47': '/',
    'lt': '<',
    'gt': '>',
    'nbsp': ' ',
    'quot': '"'
}

const decodeHTMLEntities = (text) => {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
        return entities[entity] || match
    })
}

const mapStateToProps = (state) => {
    return {
        item: state.item
    };
}

export default connect(mapStateToProps, { fetchItem })(Item);
