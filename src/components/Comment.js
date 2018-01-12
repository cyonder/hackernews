import React, { Component } from 'react';
import moment from 'moment';

class Comment extends Component{
    constructor(){
        super();
        this.state = {
            active: true
        };
        this.toggleComment = this.toggleComment.bind(this);
    }

    toggleComment(){
        this.setState({
            active: !this.state.active
        })
    }

    render(){
        const { comment } = this.props;

        let date = moment.unix(comment.time).toDate();
        let today = moment();
        let time = today.to(date);

        const nestedComments = (comment.kids || []).map(comment => {
            if(!comment.deleted){
                return <Comment key={comment.id} comment={comment} />;
            }
        });

        return(
            <div className="comment">
                <div className="comment-header">
                    <span className="comment-toggle" onClick={ this.toggleComment }>
                        <i className={`icon icon-arrow-${!this.state.active ? 'right' : 'down' }`}></i>
                    </span>
                    <CommentBy url={`/user/${comment.by}`}>{ comment.by }</CommentBy>
                    <CommentTime>{ time }</CommentTime>
                </div>
                <div className={!this.state.active ? "d-none" : "d-block" }>
                    <CommentText>{ comment.text }</CommentText>
                    { nestedComments }
                </div>
            </div>
        );
    }
}

const CommentBy = (props) => (
    <span className="item-by">
        <a href={props.url}>{ props.children }</a>
    </span>
)

const CommentTime = (props) => (
    <span className="comment-time">{props.children}</span>
)

const CommentText = (props) => {
    return <div className="comment-text" dangerouslySetInnerHTML={{ __html: decodeHTMLEntities(props.children)}}></div>
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

export default Comment;
