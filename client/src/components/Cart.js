import React, { Children } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { getCartData } from "../services/repository";

export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
      total: 0,
    };
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

  removeFromCart = (menuItem) => {
    let menu = this.state.menu.filter(
      (item) => item.itemNo !== menuItem.itemNo
    );
    let cart = JSON.parse(localStorage.getItem("cart"));
    delete cart[menuItem.itemNo];
    localStorage.setItem("cart", JSON.stringify(cart));
    let total = this.state.total - menuItem.qty * menuItem.price;
    this.setState({ menu, total });
  };

  clearCart = () => {
    localStorage.removeItem("cart");
    this.setState({ menu: [] });
  };

  render() {
    const { menu, total } = this.state;
    return (
      <div className=" container">
        <h3 className="card-title">Cart</h3>
        <hr />
        {menu.map((menuItem, index) => (
          <CartItem
            menuItem={menuItem}
            remove={this.removeFromCart}
            key={index}
          />
        ))}
        <hr />
        {menu.length ? (
          <div>
            <h4>
              <small>Total Amount:</small>
              <span className="float-right text-primary">€{total}</span>
            </h4>
            <hr />
          </div>
        ) : (
          ""
        )}

        {!menu.length ? (
          <h3 className="text-warning">No item on the cart</h3>
        ) : (
          ""
        )}
        <Link to={{ pathname: "/checkout", query: { ...this.state.menu } }}>
          <button className="btn btn-success float-right">Checkout</button>
        </Link>
        <button
          className="btn btn-danger float-right"
          onClick={this.clearCart}
          style={{ marginRight: "10px" }}
        >
          Clear Cart
        </button>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
