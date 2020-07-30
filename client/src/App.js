import React from "react";
import "./App.css";
import { googleLogin as Google } from "./services/auth";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Route, Redirect } from "react-router-dom";
import EmployeeLogin from "./components/employeeLogin";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import OrdersView from "./components/OrdersView";
import Checkout from "./components/Checkout";
import { SearchLocationInput } from "./SearchLocationInput";
import Navbar from "./components/Navbar";
import SuccessPage from "./components/successpage";

export default class App extends React.Component {
  state = {
    user: this.props.user,
    message: "",
    order: "",
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  setOrder = (order) => {
    this.setState({ order: order });
    console.log(this.state.order);
  };

  render = () => {
    return (
      <div className="App">
        <Navbar user={this.state.user} setUser={this.setUser} />
        <Route
          exact
          path="/"
          render={(props) => (
            <OrdersView
              setUser={this.setUser}
              user={this.state.user}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/employee/login"
          render={(props) => (
            <EmployeeLogin setUser={this.setUser} {...props} />
          )}
        />
        <Route exact path="/menu" component={Menu} />
        <Route exact path="/cart" component={Cart} />
        <Route
          exact
          path="/checkout"
          render={(props) => (
            <Checkout user={this.state.user} order={this.setOrder} {...props} />
          )}
        />
        <Route
          exact
          path="/success"
          render={(props) => (
            <SuccessPage
              user={this.state.user}
              order={this.state.order}
              {...props}
            />
          )}
        />
        <Route
          exact
          path="/employee/orders"
          render={(props) => (
            <OrdersView
              setUser={this.setUser}
              user={this.state.user}
              {...props}
            />
          )}
        />
      </div>
    );
  };
}
