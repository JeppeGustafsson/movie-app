import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import history from './history';
import Header from './components/header';
import Hero from './components/hero';
import Carousel from './components/carousel';
import CarouselItem from './components/carouselItem';
import WatchMovie from './components/watchMovie';
import './App.css';

const KEY = '634ee15d9e3096714155b88a9553fd9d';
//Popular
const popularLink = `https://api.themoviedb.org/3/movie/popular?api_key=${KEY}&language=en-US&page=1`;
//New
const topLink = `https://api.themoviedb.org/3/movie/top_rated?api_key=${KEY}&language=en-US&page=1`;
//Upcoming
const upcomingLink = `https://api.themoviedb.org/3/movie/upcoming?api_key=${KEY}&language=en-US&page=1`;
//Trending
const trendingLink = `https://api.themoviedb.org/3/trending/all/day?api_key=${KEY}`;



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popular: [],
      top: [],
      upcoming: [],
      trending: [],
      activeMovie: '',
      movieContent: {}
    }
  }

  componentDidMount() {
    fetch(popularLink)
        .then(response => response.json())
        .then(data => this.setState({popular: data.results}));
    fetch(topLink)
        .then(response => response.json())
        .then(topData => this.setState({top: topData.results}));
      fetch(upcomingLink)
        .then(response => response.json())
        .then(upcomingData => this.setState({upcoming: upcomingData.results}));
      fetch(trendingLink)
        .then(response => response.json())
        .then(trendingData => this.setState({trending: trendingData.results[Math.floor(Math.random() * trendingData.results.length)]}));
  }

  handleActiveMovieTitle = (title) => {
    this.setState({
      activeMovie: title
    });
    localStorage.setItem('title', title.replace(/-/g, ' '));
  }

  render() {

    return (
      <Router>
        <Switch>
          <Route path="/" exact>
          <div className="App">
            <Header />
            <Hero title={this.state.trending.title || this.state.trending.original_name} description={this.state.trending.overview} 
            image={this.state.trending.poster_path} vote={this.state.trending.vote_average}/>
            <Carousel title={"Popular"}>
              {
                this.state.popular.map(item => {
                return <CarouselItem 
                        key={item.id}
                        title={item.title}
                        description={item.overview}
                        vote={item.vote_average}
                        image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                        content={this.state.popular.concat(this.state.upcoming.concat(this.state.top))}
                        handleActiveMovieTitle={this.handleActiveMovieTitle}
                      />
                })
              }
            </Carousel>
            <Carousel title={"Top rated right now"}>
              {
                this.state.top.map(item => {
                return <CarouselItem 
                        key={item.id}
                        title={item.title}
                        description={item.overview}
                        vote={item.vote_average}
                        image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                        content={this.state.popular.concat(this.state.upcoming.concat(this.state.top))}
                        handleActiveMovieTitle={this.handleActiveMovieTitle}
                      />
                })
              }
            </Carousel>
            <Carousel title={"Upcoming"}>
              {
                this.state.upcoming.map(item => {
                return <CarouselItem 
                        key={item.id}
                        title={item.title}
                        description={item.overview}
                        vote={item.vote_average}
                        image={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
                        content={this.state.popular.concat(this.state.upcoming.concat(this.state.top))}
                        handleActiveMovieTitle={this.handleActiveMovieTitle}
                      />
                })
              }
            </Carousel>
            <div className="footer">
              <p>footer</p>
            </div>
          </div>
          </Route>
          <Route path={'/' + this.state.activeMovie}>
              <WatchMovie 
                content={this.state.popular.concat(this.state.upcoming.concat(this.state.top))}
                getMovieData={this.handleTitle}
              />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
