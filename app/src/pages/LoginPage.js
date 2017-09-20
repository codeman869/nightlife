import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as A from '../actions/authActions'

@connect((store) => {
    return {
        auth: store.auth
    }    
})
export default class LoginPage extends Component {
    logIn(e) {
        this.props.dispatch(A.reqLogin())
    }
 render() {
     const { username } = this.props.auth
    return (
        <div>
            <h1>Login! {username }</h1> 
            <button className="btn btn-default" onClick={this.logIn.bind(this)}>Log in</button>
        </div>
        )
 }   
}