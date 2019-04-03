import React, { Component } from 'react'

class Details extends Component {
    state = {
        ph_details: ''
    }

    async componentDidMount(){
        const id = this.props.id
        const url = `https://api.unsplash.com/photos/${id}/?client_id=1c5a749630f33aa390c741ad79be0c356b81bc65be2be5766b766e2c3035da2f` 
  
        try {
            const data = await fetch(url)
            const jsonData = await data.json()
            this.setState({
                ph_details: jsonData
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        const {ph_details} = this.state
        const {handleIndex} = this.props

        if(!ph_details){ //initialize the jsondata with null
            return null
        }   
        return (
            
            <div className="container">
                <div className="row mt-5">
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <button 
                            className="btn btn-dark btn-sm mb-3"
                            onClick = {() => handleIndex(0)}
                        >Back to MainPage</button>
                        <img src={ph_details.urls.regular} style={{height:'100vh'}} alt="" className="d-block w-100"/>
                    </div>
                    
                    <div className="col-lg-6 col-md-6 col-sm-12 mt-5">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center bg-light text-dark">
                                <h6 className="text-capitalize">{ph_details.alt_description}</h6>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Author: {ph_details.user.name}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Shot with: {ph_details.exif.model}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Aperture: {ph_details.exif.aperture}
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                Download Count
                                <span className="badge badge-primary badge-pill">{ph_details.downloads}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <a href={ph_details.links.download} target="_blank"  rel="noopener noreferrer" className="btn btn-success mt-2 mx-3 text-capitalize">
                                Download    
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Details;