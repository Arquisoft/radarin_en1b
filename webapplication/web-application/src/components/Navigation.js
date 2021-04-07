import { Navbar, Nav, Container } from 'react-bootstrap';

const Navigation = () => {
    return(
        <>
            <Navbar collapseOnSelect sticky='top' expand='sm' bg='dark' variant='dark' padding-bottom='55px'>
            <Navbar.Brand href="#home">Radarin</Navbar.Brand>
                <Container id = "content" class = "ui-container">
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                        <Nav>
                            <Nav.Link href='/'>Home</Nav.Link>
                            <Nav.Link href='/login'>Login</Nav.Link>
                            <Nav.Link href='/map'>See Friends</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default Navigation;