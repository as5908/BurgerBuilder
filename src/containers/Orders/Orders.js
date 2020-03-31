import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(
      this.props.token,
      this.props.userId
    );
  }
  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map(order => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

// This is a function, requires manual dispatching
const mapDispatchToProps = dispatch => ({
  onFetchOrders: (token, userId) =>
    dispatch(actions.fetchOrders(token, userId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
