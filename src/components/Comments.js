import React, { Component } from 'react';

import Comment from './Comment';

class Comments extends Component{
    renderLoading(){
        return(
            <span className="comment-loading-indicator">
                <img src="/images/react-spinner.svg" alt="loading" className="comment-indicator"/>
                Comments
            </span>
        );
    }

    renderComments(){
        const { comments, story } = this.props.item;

        return comments.map(comment => {
            if(!comment.deleted){
                return <Comment key={comment.id} comment={comment} />;
            }
        });
    }

    render(){
        const { comments, item } = this.props;
        console.log("Comments-Props: ", this.props);

        return(
            <div className="comments-wrapper">
                <div className="comments-header">
                    { !item.commentsAmount ? this.renderLoading() : `${item.commentsAmount} Comments` }
                </div>
                <div className="comments">
                    { comments.length > 0 ? this.renderComments() : null }
                </div>
            </div>
        )
    }
}

export default Comments;
