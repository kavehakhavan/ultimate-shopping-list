import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  const addItem = () => {
    if (itemName.trim() !== "") {
      const newItem = {
        name: itemName,
        quantity: itemQuantity,
      };

      setItems([...items, newItem]);
      setItemName("");
      setItemQuantity(0);
    }
  };

  const startEditing = (index) => {
    setEditingIndex(index);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const saveEditing = (index, newName, newQuantity) => {
    const updatedItems = [...items];
    updatedItems[index].name = newName;
    updatedItems[index].quantity = newQuantity;
    setItems(updatedItems);
    setEditingIndex(null);
  };

  return (
    <div className="App" style={{ backgroundColor: "white", height: "100vh" }}>
      <header>
        <Navbar style={{ backgroundColor: "#562664" }}>
          <Container>
            <Navbar.Brand href="#home" style={{ color: "white" }}>
              Ultimate Shopping List
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home" style={{ color: "white" }}>
                  Home
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "60px",
          }}
        >
          <Form>
            <InputGroup
              className="mb-3 align-items-start d-flex px-4 my-5"
              style={{ width: "70%", height: "60px" }}
            >
              <Form.Control
                aria-label="Item Name"
                placeholder="Enter Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                style={{
                  width: "50%",
                  backgroundColor: "white",
                }}
              />
              <Form.Control
                type="number"
                placeholder="0"
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}
                style={{ width: "30%", backgroundColor: "white" }}
              />
              <Button
                variant="outline-secondary"
                style={{
                  width: "20%",
                  backgroundColor: "#562664",
                  color: "white",
                }}
                onClick={addItem}
              >
                Add
              </Button>
            </InputGroup>
          </Form>

          <ListGroup
            className="mb-3 px-4 my-5"
            style={{ height: "60px", width: "70%" }}
          >
            <ListGroup.Item
              className="d-flex align-items-center justify-content-center"
              style={{
                backgroundColor: "#562664",
                color: "white",
                width: "100%",
                fontSize: "24px", // Adjust the font size as needed
              }}
            >
              My Shopping List
            </ListGroup.Item>
            <ListGroup.Item
              className="d-flex"
              style={{
                backgroundColor: "#562664",
                color: "white",
                width: "100%",
              }}
            >
              <Row style={{ width: "100%" }}>
                <Col xs={6} style={{ width: "80%" }}>
                  Item
                </Col>
                <Col xs={6} style={{ width: "20%" }}>
                  Quantity
                </Col>
              </Row>
            </ListGroup.Item>

            {items.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex"
                style={{
                  backgroundColor: "#562664",
                  opacity: 0.7,
                  color: "white",
                }}
              >
                {editingIndex === index ? (
                  <>
                    <Form.Control
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      style={{ width: "80%" }}
                    />
                    <Form.Control
                      type="number"
                      value={itemQuantity}
                      onChange={(e) => setItemQuantity(e.target.value)}
                      style={{ width: "20%" }}
                    />
                    <Button
                      variant="success"
                      onClick={() => saveEditing(index, itemName, itemQuantity)}
                    >
                      Save
                    </Button>
                    <Button variant="secondary" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Row style={{ width: "100%" }}>
                      <Col
                        xs={6}
                        style={{ borderRight: "1px solid #ddd", width: "80%" }}
                      >
                        {item.name}
                      </Col>
                      <Col
                        xs={6}
                        style={{ width: "20%" }}
                      >{`${item.quantity}`}</Col>
                    </Row>
                    <Button
                      variant="outline-light"
                      onClick={() => startEditing(index)}
                      style={{
                        backgroundColor: "#e68e36",
                        color: "white",
                        opacity: 1,
                      }}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Container>
      </main>
    </div>
  );
}

export default App;
