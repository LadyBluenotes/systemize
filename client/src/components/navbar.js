import { Navbar, Nav, Button } from 'react-bootstrap';

function AppNavbar({ isSignedIn }) {

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.reload();
    }

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Navbar.Brand href="/home">Systemize</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {!isSignedIn && (
            <>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Sign Up</Nav.Link>
            </>
          )}
          {isSignedIn && (
            <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/tasks">Tasks</Nav.Link>
                <Button variant="outline-danger" className="logout-placement" onClick={handleLogout}>Logout</Button>
              
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;