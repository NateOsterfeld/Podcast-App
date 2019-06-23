import React, { Component } from 'react';
import './App.css';
import Popular from './components/Popular/Popular';
import Navigation from './components/Navigation/Navigation';
import Discover from './components/Discover/Discover';
import Menu from './components/Menu/Menu';
import GenrePodcasts from './components/GenrePodcasts/GenrePodcasts';
import Episodes from './components/Episodes/Episodes';
import PlayBar from './components/PlayBar/PlayBar';
import Search from './components/Search/Search';
import CuratedPodcasts from './components/CuratedPodcasts/CuratedPodcasts';


class App extends Component {
  constructor() {
    super();
    this._refPlayBar = React.createRef();
    this.state = {
      popular: [],
      searched: [],
      searchTerm: '',
      route: 'discover',
      genresMenu: [],
      genrePodcasts: { name: '', podcasts: [] },
      GenrePodcasts: { name: '', podcasts: [] },
      // randomGenre: {},
      curatedLists: [],
      episodesObj: { id: '', title: '', image: '', publisher: '', episodes: [], website: '' },
      playBarObj: { audio: '', image: {}, enclosure: {}, title: '', publisher: '', pubdate: '' },
      hasPlayed: '',
    }
  }

  componentDidMount() {
    this.getMenuItems();
    this.state.route === 'popular' 
        ? this.getPopular() 
        : this.getDiscover()
      }
      
  getPopular = () => {
    fetch('/popular')
    .then(response1 => response1.json())
    .then(response2 => {
      this.setState({ popular: response2 })
    })
  }

  getDiscover = () => {
    this.getPopular();
    this.getCuratedLists();
    this.getRandomGenre();
  }

  getCuratedLists = (random = true) => {
    fetch(`/curatedLists`, {
      method: 'post',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ random: random })
    })
      .then(response => response.json())
      .then(response => this.setState({ curatedLists: response.curated_lists }))
  }

  getListPodcasts = (id, title, podcasts) => {
    console.log('podcastsfromapp', podcasts);
    fetch(`/podcastsFromCuratedList/${id}`)
      .then(response => response.json())
      .then(response => this.setState({ curatedListObj : { id: id, title: title, podcasts: response.podcasts },
                        route: 'curatedPodcasts' }))
  }

  

  createPlayBarObj = (audio, image, enclosure, title, hasPlayed, publisher, pubdate) => {
    this.setState({ playBarObj: { audio: audio, image: image, enclosure: enclosure, title: title, publisher: publisher, pubdate: pubdate },
                    hasPlayed: hasPlayed })
  }

  hasPlayed = (hasPlayed) => {
    this.setState({ hasPlayed: hasPlayed.className });
  }

  getGenre = (id, name, e, isFromMenu) => {
    console.log('id', id);
    const url = `https://itunes.apple.com/search?term=podcast&genreId=${id}&limit=50`;
    if (isFromMenu) {
      if (!e.target.classList.value.includes('chev') && name === e.target.innerText) {
        fetch(url)
          .then(response => response.json())
          .then(response => this.setState({ route: 'genre', genrePodcasts: { name: name, podcasts: response.results } }));
      }
    } else if (!isFromMenu) {
        fetch(url)
          .then(response => response.json())
          .then(response => this.setState({ route: 'genre', genrePodcasts: { name: name, podcasts: response.results } }));
      }

  }

  getSearchedPodcasts = (term, route) => {
    this.setState({ route: route });
    term !== '' && fetch(`/searchPodcasts/${term}`)
      .then(response => response.json())
      .then(response => this.setState({ searched: response, searchTerm: term }))
  }

  // pass "itunesid" from listennotes cl podcasts obj
  getEpisodes = (id, title, image, publisher, website) => {
    fetch(`/episodes/${id}`)
      .then(response => response.json())
      .then(response => {
        this.setState({ route: 'episodes', 
                        episodesObj: {id:id, title:title, image:image, publisher:publisher, mainDescription: response[0].mainDescription, episodes: response, website: website }});
      })
  }

  getRandomGenre = () => {
    let random = Math.floor(Math.random()*this.state.genresMenu.length);
    this.state.genresMenu.map((genre, i) => {
      if (random === i) {
        // this.setState({ randomGenre: genre });
        const url = `https://itunes.apple.com/search?term=podcast&genreId=${genre.id}&limit=10`;
        fetch(url)
          .then(response => response.json())
          .then(response => this.setState({ GenrePodcasts: { id: genre.id, name: genre.name, podcasts: response.results }}));
      }
    });
  }

  getMenuItems = () => {
    fetch('/genresMenu')
      .then(response => response.json())
      .then(response => {
      this.setState({ genresMenu: response })
      if (this.state.route === 'discover')
        this.getRandomGenre();
      })
  }

  changeRoute = (route) => {
    if (route === 'popular') {
      this.setState({ route: 'popular' });
      this.getPopular();
    } else if (route === 'discover') {
        this.setState({ route: 'discover' });
        this.getDiscover()
      }
  }

  render() {
    const { route } = this.state;
    return (
      <div className="App">
        <Navigation changeRoute={this.changeRoute} getSearchedPodcasts={this.getSearchedPodcasts} />
        <section className="section">
            {route === 'episodes' && <Episodes episodesObj={this.state.episodesObj} postPlayBarObj={this.createPlayBarObj} hasPlayed={this.hasPlayed} />}
          <div className="case">
            {route !== 'episodes' && <Menu genres={this.state.genresMenu} getGenre={this.getGenre} getSearchedPodcasts={this.getSearchedPodcasts} /> }
            {route === 'popular' && <Popular podcasts={this.state.popular} getEpisodes={this.getEpisodes} /> }
            {route === 'search' && <Search podcasts={this.state.searched} getEpisodes={this.getEpisodes} searchTerm={this.state.searchTerm} />}
            {route === 'discover' && <Discover getEpisodes={this.getEpisodes} topPodcasts={this.state.popular} getGenre={this.getGenre} getEpisodes={this.getEpisodes} 
                                               genre={this.state.GenrePodcasts} curatedLists={this.state.curatedLists} getListPodcasts={this.getListPodcasts} /> }
            {route === 'curatedPodcasts' && <CuratedPodcasts curatedListObj={this.state.curatedListObj} getEpisodes={this.getEpisodes} /> }
            {route === 'genre' && <GenrePodcasts genrePodcasts={this.state.genrePodcasts} getEpisodes={this.getEpisodes} /> }
          </div>
        </section>
            <nav className="navbar fixed-bottom navbar-light bg-light">
              <PlayBar playBarObj={this.state.playBarObj} hasPlayed={this.state.hasPlayed} />
            </nav>
      </div>
    );
  }
  
}

export default App;
