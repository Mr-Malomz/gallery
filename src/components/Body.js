import React from 'react'

export default function Body(props) {
  const {img, details, id, handleDetails} = props
  return (  
    <div className="col-sm-12 col-md-4 col-lg-3">
    <div className="card-group col">
          <div className="card">
              <img 
                style={{height:'13rem'}} 
                src= {img} 
                className="card-img-top" 
                alt= {details} 
              />
              <div className="card-body text-center">
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick= {() => handleDetails(1, id)}
                  >View Details</button>
              </div>
          </div>
    </div>
    </div> 
  )
}
