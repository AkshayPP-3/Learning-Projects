import React, { useState } from 'react';
import { phoneData } from "./products-data";
import { Card, Button } from "react-bootstrap";

const Products = () => {
  const [items, setItems] = useState(phoneData);

  const inc = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id) {
        return { ...item, Quantity: item.Quantity + 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  const dec = (id) => {
    const updatedItems = items.map(item => {
      if (item.id === id && item.Quantity > 0) {
        return { ...item, Quantity: item.Quantity - 1 };
      }
      return item;
    });
    setItems(updatedItems);
  };

  return (
    <div>
      <h1 className="bg-info text-white">Products</h1>
      {items.map(item => (
        <div className="d-inline-flex" key={item.id}>
          <Card className="shadow p-3 mb-5 bg-body-tertiary rounded" style={{ width: '18rem' }}>
            <Card.Img variant="top" src={require(`../Assets/${item.Image}`)} />
            <Card.Body>
              <Card.Title>{item.Model}</Card.Title>
              <Card.Text>{item.Description}</Card.Text>
              <h5>₹ {item.Price}</h5>
              <div>
                <p>
                  Quantity:
                  <Button onClick={() => inc(item.id)} className="mx-2">+</Button>
                  {item.Quantity}
                  <Button onClick={() => dec(item.id)} className="mx-2">-</Button>
                </p>
              </div>
              <Button variant="primary">Add to cart</Button>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default Products;
