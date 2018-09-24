import React, { Component } from 'react'
import { connect } from 'react-redux'

import { search, setLocation, restoreResults, clearResults, } from '../actions/searchActions'

@connect((store)=> {
   return {
       search: store.search
   } 
    
}, (dispatch) => {
    return {
        clearResults: () => dispatch(clearResults()),
        search: (location) => dispatch(search(location)),
        setLocation: (location) => dispatch(setLocation(location)),
        restoreResults:() => dispatch(restoreResults()),
    }
})
export default class SearchComponent extends Component {
    constructor() {
        super()
        this.searchLocation = this.searchLocation.bind(this)
        this.clearResults = this.clearResults.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            searchTerm: '' 
        }
        
        
   } 
    
   clearResults(e) {
        this.props.clearResults()
   } 
    searchLocation(e) {
        e.preventDefault()
       
        this.props.setLocation(this.state.searchTerm)
        this.props.search(this.state.searchTerm)
        
    }
    
    handleChange(e) {
        this.setState( {
                searchTerm: e.target.value
                })
    }
    
    componentDidMount() {
     const oldSearchTerm = window.localStorage.getItem('savedSearch')    
     console.log(`Old term is ${oldSearchTerm}`)
     if(oldSearchTerm != null) {
         this.setState({
             searchTerm: oldSearchTerm
         })
         this.props.setLocation(oldSearchTerm)
     }
    } 
    
    render() {
        
        return (
        <div className="text-center">
            <form onSubmit={this.searchLocation}>
                <div className="form-group">
                    <label htmlFor="location">Show Bars Near</label>
                    <input name="location" className="form-control" value={this.state.searchTerm} onChange={this.handleChange} placeholder="Enter Search Location" />
                </div>
                <button type="button" onClick={this.searchLocation } className="btn btn-default">Search!</button>
                <button onClick= { this.clearResults } className="btn btn-default">Clear Results</button>
            </form>
        </div>
        ) 
    }
}