import React from 'react';
import Navbar from "../Navbar";
import Auth from "../../utils/Auth";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div id="home">
      <Navbar />
      <div className="mt-5">
        <Link to="/user">User page</Link>
      </div>
    </div>
  )
}

export default Home;