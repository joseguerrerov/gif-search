//Dependencies
import React, { Component } from 'react';
import {StyleRoot} from 'radium'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
}from 'react-router-dom'
import normalize from 'normalize.css'
import axios from 'axios'

//Components
import Home from './Home'
import Search from './Search'
import Gifview from './Gifview'
import Searchbar from './Searchbar'
import Lost from './Lost'


//Assets

class App extends Component {

  state ={
    gifs: [],
    title: '',
    barStatus : 'default',
    gifById: {},
  }

  //function to search
  performSearch = (query = 'cats', limit = 21) =>{
    let apiEndPoint =`https://api.giphy.com/v1/gifs/trending?api_key=1dbc2f313ec44971b8ee0815b6951dca&limit=${limit}`
    if(query === 'trending'){

    }else{
      apiEndPoint = `https://api.giphy.com/v1/gifs/search?q=${query}&limit=${limit}&lang=est&api_key=dc6zaTOxFJmzC`
    }
    axios.get(apiEndPoint)
    .then(response => {
      console.log(response);
      this.setState({
        gifs: response.data.data,
        title : query,
        barStatus : 'active'
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data');
    })
  }

  //Function to search by gifid
  getGifById = (id = '26gR0t9sNVrbVEhPO') => {
    axios.get(`https://api.giphy.com/v1/gifs/${id}?api_key=1dbc2f313ec44971b8ee0815b6951dca`)
    .then(response =>{
      this.setState({
        gifById : response.data.data,
      })
    })
    .catch(error => {
      console.log('Error fetching and parsing data')
    })
  }

  //Function to set offest for paginitation
  setOffset = (index) =>{
    console.log(index);
  }




  render() {
    return (
      <StyleRoot>
        <BrowserRouter>
          <div>
            <Route render = {()=> <Searchbar type={this.state.barStatus}/>}/>
            <Switch>
              <Route exact path="/" component = {Home}/>
              <Route exact path="/search" render={() => ( <Redirect to="/search/trending"/>)}/>
              <Route exact path="/search/:name" render = {()=>
                <Search gifs={this.state.gifs} onLoad = {this.performSearch} viewGif={this.getGifById} gifAction={this.setOffset}/>}
              />
              <Route exact path="/gif/:id" render ={ () => <Gifview gif={this.state.gifById} onLoad={this.getGifById}/>}/>
              <Route component = {Lost} />
            </Switch>
          </div>
        </BrowserRouter>
      </StyleRoot>
    );
  }
}

export default App;
