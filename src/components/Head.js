import React from 'react'

export default function Head(props) {
  const {value, handleChange, handleSubmit} = props
  return (
    <div className="jumbotron p-4">
            <div className="col-12 mx-auto col-sm-6 col-md-10 col-lg-12 my-3">
              <h1 className="display-5">Top-Ranked Shots Of The Year</h1>
              <p className="lead">We Give The Best Photos Taken</p>
            </div>
            <hr className="my-4"/>
            <form onSubmit = {handleSubmit}>
              <div className="form-group">
                <input 
                  type="text" 
                  className="form-control" 
                  value = {value}
                  placeholder="Search for Photos" 
                  onChange = {handleChange}
                /> 
              </div>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick = {handleSubmit}
              >
                Search
              </button>
            </form>
            
    </div>
  )
}
