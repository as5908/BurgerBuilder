import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

class BurgerBuilder extends Component {
  // construtor(props) {
  //   super(props);
  //   this.state = { ...};
  // }
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    // console.log('[componentDidMount]', this.props);
    // axios
    //   .get('/Ingredients.json')
    //   .then(response => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch(error => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.state.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ings) {
      burger = (
        <div>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={
              this.props.onIngredientDeleted
            }
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(
              this.props.ings
            )}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </div>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <React.Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

// This is a function, requires manual dispatching
const mapDispatchToProps = dispatch => ({
  onIngredientAdded: ingName =>
    dispatch({
      type: actionTypes.ADD_INGREDIENT,
      ingredientName: ingName
    }),
  onIngredientDeleted: ingName =>
    dispatch({
      type: actionTypes.REMOVE_INGREDIENT,
      ingredientName: ingName
    })
});

// // alternate
// const mapPropsToAction = {
//   personAddedHandler: () => addActionCreatorAlt(),
//   personDeletedHandler: id => deleteActionCreatorAlt(id)
// };

// export default withErrorHandler(BurgerBuilder, axios);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
