//Dependencies
import React, { Component } from 'react'
import Radium from 'radium'
import {withRouter} from 'react-router-dom'


//Components
import Gifbox from './Gifbox'
import Emptysearch from './Emptysearch'


class Search extends Component {

  state = {
    result: true
  }

  componentDidMount(){
    this.props.onLoad(this.props.match.params.name)
  }

  componentWillReceiveProps(nextProps){
    //Cehck if the next gif array is empty or not
    if(nextProps.gifs.length > 0){
      this.setState({
        result: true
      })
    }else{
      this.setState({
        result: false
      })
    }
    //Check if a new search must start
    if(this.props.match.params.name !== nextProps.match.params.name ){
      console.log('tenemos que hacer algo');
      this.props.onLoad(nextProps.match.params.name)
      console.log('true')
    }
  }




  getGifs = () =>{
    const results = this.props.gifs
    if(this.state.result){
      return(
        results.map(gif=>
          <Gifbox
            fondoGif={gif.images.preview_gif.url}
            embed={gif.images.fixed_height.url}
            show={gif.id}
            key={gif.id}
            user={gif.user}
            width="33.33%"
            height= '40vh'
            instant
          />
        )
      )
    }else if (!this.state.result){
      console.log('hola');
      return(
        <Emptysearch />
      )
    }
  }

  render() {


    const styles = {
      searchResults: {
        minHeight: 'calc(100vh - 76px)',
        maxWidth: '100%',
        padding: '0 0.5em',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginTop: '1em',
      },
    }

    return (
      <div style = {styles.searchResults}>
        {this.getGifs()}
      </div>
    );
  }

}

Search = withRouter(Search)
Search = Radium(Search)
export default Search;
