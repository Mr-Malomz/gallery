import React, { Component } from 'react'
import './App.css'
import Head from './components/Head'
import Body from './components/Body'
import Details from './components/Details'



class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       value: "",
       recipes: '',
       photos: '',
       url: `https://api.unsplash.com/search/photos/?client_id=1c5a749630f33aa390c741ad79be0c356b81bc65be2be5766b766e2c3035da2f&query=`,
       search_url:`https://api.unsplash.com/search/photos/?client_id=1c5a749630f33aa390c741ad79be0c356b81bc65be2be5766b766e2c3035da2f&query=`,
       error: '',
       pages: 0,
       det_id: ''
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

  handleSubmit = e => {
    e.preventDefault()
    const {value, search_url } = this.state
    this.setState(() => {
      return {url: `${search_url}${value}`, value: ''} //second empty value returns the input field back to null and the search url is used independently of the main url
    }, () => this.getPhotos())
    
  }

  // handling page indexes and details
  handleIndex = index => {
    this.setState({
      pages: index
    })
  }

  handleDetails = (index, id) => {
    this.setState({
      pages: index,
      det_id: id
    })
  }

  //Conditional rendering index of the main page and details page
  displayPage = index => {
    const {photos, value, error} = this.state
    switch (index) {
      default:
      case 0:
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
                        id = {photo.id}
                        img = {photo.urls.regular}
                        details = {photo.links.self}
                        handleDetails = {this.handleDetails}
                      />
                  ) 
                })}
              
            </div>
          </div>
        </div>
        )
      case 1:
        return (
          <div className="container-fluid">
            <Details 
              id= {this.state.det_id} 
              handleIndex= {this.handleIndex}
            />
          </div>
        )
    }
  }

  render() {
    //const {photos, value, error} = this.state
    return (
      <div>
        {this.displayPage(this.state.pages)}
      </div>
    );
  }
}

export default App;
