const VerticalNav = ({ onClick, isAdmin , userId, isLoggedIn, clearToken, isSubscribed }) => {
    return (
      <div className=" vertical-nav" style={{ marginTop: '57px'}}>
        <ul className="nav flex-column">
          <li className="nav-item d-flex align-items-center ">
            <span className ="bi bi-question-circle me-2"></span>
            <a className=" nav-link" href="/subscription">Subscribe Now</a>
          </li>
          <li className="nav-item d-flex align-items-center">
          <span className="bi bi-gear-fill me-2"></span>
            <a className="nav-link " href="/">Solutions</a>
          </li>
          <li className="nav-item dropdown d-flex align-items-center">
              <span className="bi bi-book me-2"></span>
              <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Resources
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/school/resources">School Resources</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">Job Opportunities</a>
                </li>
              </ul>
            </li>

          <li className="nav-item d-flex align-items-center">
          <span className="bi bi-info-circle me-2"></span>
            <a className="nav-link" href="/">About</a>
          </li>

          <li className="nav-item dropdown d-flex align-items-center">
          <span className="bi bi-envelope me-2"></span>
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Contact Us
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="/">Email: info@elimufiti.co.ke</a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">Tel: 0716880637</a>
                </li>
              </ul>
          </li>
          
          
          <li className="d-flex align-items-center">
          {isLoggedIn ? (
            <div className="justify-center">
              <span 
                className="btn btn-outline-success btn-sm" 
                onClick={() => clearToken()} 
                style={{ whiteSpace: 'nowrap' }}
              >
                <li>
                  Logout
                </li>
              </span>
            </div>
          ) : (
            <li className="nav-item d-flex align-items-center">
          <span className="bi bi-person-circle me-2"></span>
            <a className="nav-link" href="/signup">Sign In</a>
          </li>
          )}
        </li>
        </ul>
      </div>
    );
  };
export default VerticalNav  