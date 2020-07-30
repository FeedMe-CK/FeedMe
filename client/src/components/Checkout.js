import React from "react";
import { Redirect, Link } from "react-router-dom";
import { getCartData, placeOrder } from "../services/repository";
import SearchLocationInput from "./SearchLocationInput";
import { Form, Button, Alert } from "react-bootstrap";

export default class Checkout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      total: 0,
      deliveryAddress: this.props.user.address,
      placeId: this.props.user.placeId,
    };
  }

  updateAddress = (deliveryAddress, placeId) => {
    console.log("Got here!");
    this.setState({ deliveryAddress, placeId });
  };

  checkout() {
    let order = this.state.menu;
    let total = this.state.total;
    let deliveryAddress = this.state.deliveryAddress;
    let place_id = this.state.placeId;
    placeOrder(order, total, deliveryAddress, place_id)
      .then((response) => {
        console.log("I am the order placed", response);
        let place_id = response.place_id;
        console.log(place_id);
        localStorage.setItem("placeId", place_id);
        this.props.order(response);
        this.props.history.push("/success");
        localStorage.removeItem("cart");
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    let cart = localStorage.getItem("cart");
    if (!cart) return;
    getCartData(cart).then((cartItem) => {
      const parsedCart = JSON.parse(cart);
      const newCart = cartItem.map((el) => ({
        ...el,
        qty: parsedCart[el.itemNo],
      }));

      const total = newCart.reduce((acc, val) => acc + val.qty * val.price, 0);
      this.setState({ menu: newCart, total });
    });
  }

  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    const { menu, total } = this.state;
    return (
      <div className=" container">
        <h3 className="card-title">Checkout</h3>
        <hr />
        {menu.map((menuItem, index) => (
          <div key={index}>
            <p>
              {menuItem.name}
              <small> (quantity: {menuItem.qty})</small>
              <span className="float-right text-primary">
                ${menuItem.qty * menuItem.price}
              </span>
            </p>
            <hr />
          </div>
        ))}
        <hr />
        {menu.length ? (
          <div>
            <h4>
              <small>Total Amount:</small>
              <span className="float-right text-primary">${total}</span>
            </h4>
            <hr />
          </div>
        ) : (
          ""
        )}
        {menu.length ? (
          <div>
            <h4>
              The delivery address is {this.props.user.address} , if you need to
              change the address , please select the address below:
            </h4>
            {
              <SearchLocationInput
                place_id={this.place_id}
                onChange={() => null}
                value={this.state.address}
                updateAddress={this.updateAddress}
              />
            }
          </div>
        ) : (
          ""
        )}

        {!menu.length ? (
          <h3 className="text-warning">No item on the cart</h3>
        ) : (
          ""
        )}
        {menu.length ? (
          <button
            className="btn btn-success float-right"
            onClick={() => this.checkout()}
          >
            Confirm
          </button>
        ) : (
          ""
        )}
        <Link to="/cart">
          <button
            className="btn btn-danger float-right"
            style={{ marginRight: "10px" }}
          >
            Cancel
          </button>
        </Link>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
