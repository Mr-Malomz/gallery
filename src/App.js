import React, { Component } from 'react'
import './App.css'
import {recipes} from './components/tempList'
import Head from './components/Head'
import Body from './components/Body'



class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       value: "",
       recipes: recipes,
       photos: '',
       url: `https://api.unsplash.com/search/photos/?client_id=1c5a749630f33aa390c741ad79be0c356b81bc65be2be5766b766e2c3035da2f&query=`,
       search_url:`https://api.unsplash.com/search/photos/?client_id=1c5a749630f33aa390c741ad79be0c356b81bc65be2be5766b766e2c3035da2f&query=`,
       error: '',
    }
  }
  
  handleChange = e => {
    this.setState({
      value: e.target.value
    })
    
  }

  async getPhotos(){
    try {
      const data = await fetch(this.state.url)
      const jsonData = await data.json()
      console.log(jsonData.results)
      if(jsonData.results.length === 0){
        this.setState(()=>{
          return({error: 'Opps!!,  your search did not return any picture'})
        })
      }else {
        this.setState(()=>{
          return{photos: jsonData.results}
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  // componentDidMount(){
  //   this.getPhotos()
  // }

  handleSubmit = e => {
    e.preventDefault()
    const {value, search_url } = this.state
    this.setState(() => {
      return {url: `${search_url}${value}`, value: ''} //second empty value returns the input field back to null and the search url is used independently of the main url
    }, () => this.getPhotos())
    
  }

  render() {
    const {photos, value, error} = this.state
    
    return (
      <div className="container-fluid">
        <Head 
          value = {value}
          handleChange = {this.handleChange}
          handleSubmit = {this.handleSubmit}
        />
        <div className="container">
          <div className="row"> 
              {error ? <h1 className="text-danger text-center">{error}</h1> : Object.values(photos).map((photo) => { //convert object to an array
                return (
                    <Body 
                      key = {photo.id}
                      img = {photo.urls.regular}
                      details = {photo.links.self}
                    />
                ) 
              })}
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
