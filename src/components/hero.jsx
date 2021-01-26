import React from 'react';
import './hero.css';

class Hero extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            movie: [],
            elementHeight: 0,
            heroHeight: 0
         }
    }

    componentDidMount() {
        this.setState({ elementHeight: this.elRef.getBoundingClientRect()});
        this.setState({ heroHeight: this.heroRef.getBoundingClientRect()});
    }


    render() { 

        return ( 
            <div className="hero" ref={element => this.heroRef = element}>
                <div className="image">
                <img src={
                    `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.props.image}`
                } alt="hero image"/>
                </div>
                <div className="side-panel">
                    <h1 style={this.state.elementHeight.top > this.state.heroHeight.height - 200 ? {fontSize: '2rem'} : {fontSize: '2.5vw'}}>{this.props.title}</h1>
                    <p>{this.props.description}</p>
                    <div ref={element => this.elRef = element} className="button-wrapper">
                        <button>Watch</button>
                        <p>Viewers have rated this {this.props.vote}/10</p>
                    </div>
                    {/* <img src="blur.png" className="blur" />
                    <img src="blur.png" className="blur" /> */}
                </div>
            </div>
         );
    }
}
 
export default Hero;