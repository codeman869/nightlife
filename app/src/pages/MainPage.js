import React, { Component } from 'react'
import { connect } from 'react-redux'

import SearchComponent from '../components/SearchComponent'
import ResultsComponent from '../components/ResultsComponent'
@connect((store) => {
    return {
        
    }    
    
})
export default class MainPage extends Component {
 render() {
        
        let rv2 = (
            <div className="container-fluid">
            <div className="row">
                <div className="col-xl-4 col-xl-offset-4 col-xs-12">
                    <SearchComponent />
                </div>
            <div className="row">
               <h6 style={{textAlign: "right", marginRight: "10px"}}>Search Results Courtesy of Yelp</h6>
            </div>
            </div>
                    <ResultsComponent /> 
        </div>    
             
        )
     
    return rv2
 }   
}