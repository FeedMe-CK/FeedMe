import React, { Component } from "react";
import MapViewer from "./MapViewer";

export default class successpage extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    order: this.props.order,
  };

  render() {
    let duration = parseInt(localStorage.getItem("duration") / 60);
    console.log(duration);
    const time = duration + 20;
    return (
      <div>
        <MapViewer />
        <h1>
          Thanks for placing the Order!! Your order number is &nbsp;
          {this.state.order.orderId}!!
        </h1>
        <h2>The order will be delivered in approximately {time} mins 😊</h2>
      </div>
    );
  }
}
