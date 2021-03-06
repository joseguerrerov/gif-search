//Dependencies
import React,{Component} from 'react'
import Radium from 'radium'
import { Link } from 'react-router-dom'

//Assets

class Emptysearch extends Component{

  render(){

    const styles = {
      holder:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        color: '#3d3d3d',
        alignSelf: 'flex-start',
        marginTop: '3em'
      },
      title:{
        fontSize: '3em',
        textAlign: 'center'
      },
      trending:{
        color: '#3d3d3d',
        display: 'flex',
        border: ' 2px solid red',
        padding: '1em',
        borderRadius: '10px',
        message:{
          margin: '0'
        }
      }
    }

    return(
      <div style={styles.holder}>
        <h1 style={styles.title}>Ups, can't find that ...</h1>
        <Link to="/search/trending" replace style={styles.trending}>
        <h2 style={styles.trending.message}>Check whats</h2>
        <i className="material-icons">whatshot</i>
      </Link>
    </div>
  )
}

}

Emptysearch = Radium(Emptysearch)
export default Emptysearch
