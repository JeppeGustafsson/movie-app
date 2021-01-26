import React from 'react';
import history from '../history';
import './watchMovie.css';

class WatchMovie extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            movieContent: []
         }
    }

    componentDidMount() {
            const activeTitle = localStorage.getItem('title');
            const item = this.props.content.filter(item => {
                return item.title == activeTitle;
            });
            this.setState({
                movieContent: item[0]
            });
            this.checkContent();
    }

    checkContent = () => {
        this.state.movieContent.length === 0
        ? history.push('/') :
        history.push(this.state.movieContent.title)
    }

    render() { 
        
        return ( 
            <div className="watch-movie-wrapper">
                <div className="poster-image">
                <img src={
                    `https://image.tmdb.org/t/p/w600_and_h900_bestv2${this.state.movieContent.poster_path}`
                } alt="hero image"/>
                </div>
                <div className="side-panel">
                    <h1>{this.state.movieContent.title}</h1>
                    <p>{this.state.movieContent.overview}</p>
                    <div className="button-wrapper">
                        <button>Watch</button>
                        <p>Viewers have rated this {this.state.movieContent.vote_average}/10</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default WatchMovie;