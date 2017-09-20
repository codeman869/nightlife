import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import store from './store'
import LoginPage from './pages/LoginPage'
import LoginSuccess from './pages/LoginSuccess'
import MainPage from './pages/MainPage'
import NavBar from './components/NavBar'

const routes = (
   <Router>
   <div className="container-fluid">
   <NavBar />
    <Route exact path="/" component={MainPage} />
    <Route path="/login" component={LoginPage} />
    <Route path="/loginSuccess" component={LoginSuccess} />
   </div>
   </Router> 
    )

export default class App extends Component {
    render() {
        return routes;
    }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'))
