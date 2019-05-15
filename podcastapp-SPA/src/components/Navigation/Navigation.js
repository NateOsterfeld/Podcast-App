import React from 'react';
import './Navigation.css';

const Navigation = ({ changeRoute }) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-primary">
      <a className="navbar-brand" href="">Godcast</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarsExample04">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a 
                onClick = {() => changeRoute('discover') }
                className="nav-link" href="">Discover <span className="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <div 
                onClick = {() => changeRoute('popular') }
                className="nav-link" href="/popular">Popular</div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">About</a>
          </li>
        </ul>
        <form className="form-inline my-2 my-md-0">
          <input className="form-control" type="text" placeholder="Search" />
        </form>
      </div>
        <div className="nav-item dropdown">
            <a className="nav-link dropdown-toggle dropdown" href="http://example.com" id="dropdown04" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-user-circle"></i></a>
            <div className="dropdown-menu" aria-labelledby="dropdown04">
              <a className="dropdown-item dim" href="">Log in</a>
              <a className="dropdown-item dim" href="">Sign up</a>
            </div>
          </div>
    </nav>
    )
}

export default Navigation;