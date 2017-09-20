import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as s from '../actions/searchActions'

@connect((store)=> {
   return {
       search: store.search
   } 
    
})
export default class SearchComponent extends Component {
    constructor() {
        super()
        this.storage = window.localStorage 
        this.searchLocation = this.searchLocation.bind(this)
        this.clearResults = this.clearResults.bind(this)
        this.searchTerm = ""
        
        
   } 
    
   clearResults(e) {
        e.preventDefault()
        this.props.dispatch(s.clearResults())    
   } 
    searchLocation(e) {
        e.preventDefault()     
        
        this.searchTerm = this.refs.location.value
        
        
        this.props.dispatch(s.setLocation(this.searchTerm))
        this.props.dispatch(s.search(this.searchTerm))
        
    }
    
    componentWillMount() {
     const oldSearchTerm = this.storage.getItem('savedSearch')    
     if(oldSearchTerm != null) {
         this.searchTerm = oldSearchTerm
         this.props.dispatch(s.setLocation(oldSearchTerm))
     }
    } 
    
    render() {
        
        return (
        <div className="text-center">
            <form onSubmit={ this.searchLocation }>
                <div className="form-group">
                    <label htmlFor="location">Show Bars Near</label>
                    <input name="location" className="form-control" defaultValue={this.searchTerm} ref="location" placeholder="Enter Search Location" />
                </div>
                <button type="submit" className="btn btn-default">Search!</button>
                <button onClick= { this.clearResults } className="btn btn-default">Clear Results</button>
            </form>
        </div>
        ) 
    }
}