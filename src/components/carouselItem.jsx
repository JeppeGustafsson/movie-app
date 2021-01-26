import React from 'react';
import _, { indexOf } from 'lodash';
import {
    Link
  } from "react-router-dom";
import './carouselItem.css';

class CarouselItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            active: false,
            activeTitle: ''
         }
    }

    handleActive = () => {
        this.state.active === false ?
        this.setState({
            active: true
        }) : 
        this.setState({
            active: false
        });
    }

    handleActiveTitle = (e) => {
        const movie = this.props.content.filter(i => {
            return i.title == e.target.parentElement.parentElement.parentElement.querySelector('h2').innerText
         });
        this.setState({
            activeTitle: movie[0].title.replace(/ /g, '-')
        });
        
        this.props.handleActiveMovieTitle(this.state.activeTitle);
    }

    removeActiveTitle = () => {
        this.props.handleActiveTitle([]);
    }

    render() { 

        return ( 
            <div className="movie-item-wrapper">
                <div className={this.state.active === false ? "large-movie-item" : "large-movie-item active-movie"}>
                    <div className="movie-item">
                        <img src={this.props.image} />
                        <h2>{this.props.title}</h2>
                        <p>{this.props.description}</p>
                        <p className="vote">Viewers rated this {this.props.vote}/10</p>
                        <div className="button-wrapper">
                            <div className="button-wrapper">
                                <Link className="button close" onClick={this.handleActive} to={'/'}>Close</Link>
                                <Link className="button watch" onClick={this.handleActiveTitle} to={'/' + this.state.activeTitle}>Watch</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div onClick={this.handleActive} className={this.state.active === false ? "small-movie-item" : "small-movie-item inactive"}>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                    <div className="overlay"></div>
                    <img src={this.props.image} />
                </div>
            </div>
         );
    }
}
 
export default CarouselItem;