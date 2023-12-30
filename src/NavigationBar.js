import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NavigationBar.css';

function BasicExample() {
    return (
        <div style={{backgroundColor:'rgb(53, 32, 22, 0.9)'}}>
            <Navbar expand="lg"  className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand style={{ color: 'white' }} href="/">BlackBoard</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="choice">
                            <Nav.Link style={{ color: 'white' }} href="/GetPhoto">TakePhoto</Nav.Link>
                            <Nav.Link style={{ color: 'white' }} href="/CourseList">Course</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default BasicExample;