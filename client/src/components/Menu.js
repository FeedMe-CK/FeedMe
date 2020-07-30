import React from "react";
import MenuItem from "./MenuItem";
import { getProducts } from "../services/repository";
import { Link } from "react-router-dom";

export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [],
    };
  }

  componentWillMount() {
    getProducts().then(menu => {
      this.setState({ menu });
    });
  }

  render() {
    const { menu } = this.state;
    return (
      <div className=' container'>
        <h3 className='card-title'>List of Available Products</h3>
        <hr />
        {menu.map(menuItem => (
          <MenuItem menuItem={menuItem} />
        ))}
        <hr />
        <Link to='/checkout'>
          <button className='btn btn-success float-right'>Checkout</button>
        </Link>
        <Link to='/cart'>
          <button className='btn btn-primary float-right' style={{ marginRight: '10px' }}>
            View Cart
          </button>
        </Link>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
