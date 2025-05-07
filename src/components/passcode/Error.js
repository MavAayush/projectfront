import React from 'react'
import { NavLink } from 'react-router-dom'

const BASE_URL = process.env.REACT_APP_BACKEND_URL;

const Error = () => {
  return (
    <>
      <div className="container">
        <div style={{ minHeight: "85vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <img src={`${BASE_URL}/images/card5.jpg`} alt="error" style={{ width: "500px", marginBottom: 20 }} />
          <h2 className="mb-6">PAGE NOT FOUND</h2>
          <NavLink to="/" className="btn btn-primary" style={{ fontSize: 18, color:"#d7a86e",marginTop: 10 }}> Back To Home Page </NavLink>
        </div>
      </div>
    </>
  )
}

export default Error