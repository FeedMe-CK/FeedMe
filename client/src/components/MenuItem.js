import React from "react";

export default class MenuItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
    };
  }

  handleInputChange = event => this.setState({ [event.target.name]: event.target.value });

  addToCart = () => {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
    let id = this.props.menuItem.itemNo;
    cart[id] = cart[id] ? cart[id] : 0;
    let qty = cart[id] + parseInt(this.state.quantity);
    cart[id] = qty;
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  render() {
    const { menuItem } = this.props;
    return (
      <div
        className="card"
        style={{ marginBottom: "10px", borderRadius: `1.25rem` }}
        key={menuItem._id}
      >
        <div className="card-body">
          <h4 className="card-title">{menuItem.name}</h4>
          <h6 className="card-text">{menuItem.description}</h6>
          <h6 className="card-text">
            <small>price: </small>€{menuItem.price}
          </h6>

          <div>
            <button
              className="btn btn-sm btn-warning float-right"
              onClick={this.addToCart}
            >
              Add to cart
            </button>
            <input
              type="number"
              value={this.state.quantity}
              name="quantity"
              onChange={this.handleInputChange}
              className="float-right"
              style={{
                width: "60px",
                marginRight: "10px",
                borderRadius: "3px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
