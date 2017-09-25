import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as R from '../actions/resultActions'

export default class Results extends Component {
    constructor(props) {
        super(props)
        this.imageStyle = {
            borderTopLeftRadius: 20 + "px",
            borderTopRightRadius: 20 + "px",
            gridColumn: "1 / 1",
            width: "100%",
            height: "auto",
            gridRow: "1 / 2",
            
        }
        this.cardStyle = {
           borderRadius: 20 + "px",
           backgroundColor: "#111",
           display: "grid",
           padding: "10px",
           gridTemplateRows: "1 fr",
           
        }
    }
   
   handleClick() {
       const { id } = this.props
       this.props.handleAttend(id)
   } 
    
    render() {
       
       const { name, image_url, location, phone, display_phone, price, rating, id, url } = this.props
       
     return (
         
         
         <div style={this.cardStyle} key={id + "card"} >
         
            <img style={this.imageStyle} key={id+"image"} src={image_url}/>
               <h4 key={id+"title"}>{ name }</h4>
                <span key={id+"address"}> { location.display_address[0]} </span>
                <span key={id+"address2"}>{location.display_address[1]}</span>
                <span key={id+"phone"}>{display_phone}</span>
                <span key={id+"price"}>
                Price: {price}</span>
                <span key={id+"rating"}>Rating: {rating} / 5</span>
                <span key={id+"going"}>3 Going</span>
                <div className="btn-group" key={id+"buttons"}>
                    <a key={id+"Imgoing"} className="btn btn-default" onClick={this.handleClick.bind(this)}>I'm Going</a>
                    <a key={id+"MoreInfo"} className="btn btn-primary" href={url}>More Info</a>
                </div>
         </div>
         
        )    
    }
}