import { Link } from "react-router-dom";

const Navbar = ({ setUser, user }) => {
  const handleLogout = async () => {
    localStorage.removeItem("user-info");
    setTimeout(() => {
      setUser("");
    }, 100);
  };
  return (

    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="/"> BASE <span className="badge bg-secondary">app</span>{" "}</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">



          </ul>
          <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
            <ul class="navbar-nav ">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">About</a>
              </li>

              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Course
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><a class="dropdown-item" href="/">Course 1</a></li>
                  <li><a class="dropdown-item" href="/">Course 2</a></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><a class="dropdown-item" href="/">Another course</a></li>
                </ul>
              </li>
            </ul>
          </div>

          {!user ? (
            <form className="d-flex right-nav-item">
              <Link className="nav-link" to="/login">
                LOG IN
              </Link>
              <Link
                className="nav-link btn btn-register-nav btn-sm"
                to="/register"
              >
                REGISTER
              </Link>
            </form>
          ) : (
            <form className="d-flex right-nav-item" onClick={handleLogout}>


              <span className="nav-link btn btn-register-nav btn-sm">
                LOGOUT
              </span>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
