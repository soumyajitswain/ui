import { Navbar, Container, Nav } from "react-bootstrap"
export const Navigation = (props) => {
  return (
   
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">EVViron</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   
  )
}
