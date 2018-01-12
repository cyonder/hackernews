import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchUser } from '../actions/user';

class User extends Component{
    componentDidMount(){
        this.props.fetchUser(this.props.match.params.id);
    }

    renderUserDetails(){
        let date = moment.unix(this.props.user.created).toDate();
        let today = moment();
        let time = today.to(date);

        return(
            <div className="user-details">
                <div className="detail-row">
                    <span className="detail-title">User: </span>
                    <span className="">{this.props.user.id}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-title">Created</span>
                    <span className="">{time}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-title">Karma: </span>
                    <span className="">{this.props.user.karma}</span>
                </div>
                <div className="detail-row">
                    <span className="detail-title">About: </span>
                    <span className="">{this.props.user.about}</span>
                </div>
            </div>
        );
    }

    render(){
        return(
            <div className="main-wrapper">
                { this.renderUserDetails() }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { fetchUser })(User);
