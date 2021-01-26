import React from 'react';
import './carousel.css';

class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            left: false,
            right: false
         }
    }



    render() { 


        return ( 
            <div className="carousel">
                <h1>{this.props.title}</h1>
                <div className="movie-wrapper">
                    {this.props.children}
                </div>
            </div>
         );
    }
}
 
export default Carousel;