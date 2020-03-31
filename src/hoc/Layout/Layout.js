import React from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <React.Fragment>
        <Toolbar
          isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    isAuthenticated: state.auth.token !== null
  };
};

// This is a function, requires manual dispatching
// const mapDispatchToProps = dispatch => ({
//   onIngredientAdded: ingName =>
//     dispatch(actions.addIngredient(ingName)),
//   onIngredientDeleted: ingName =>
//     dispatch(actions.removeIngredient(ingName)),
//   onInitIngredients: () =>
//     dispatch(actions.initIngredients()),
//   onInitPurchase: () => dispatch(actions.purchaseInit())
// });

// // alternate
// const mapPropsToAction = {
//   personAddedHandler: () => addActionCreatorAlt(),
//   personDeletedHandler: id => deleteActionCreatorAlt(id)
// };

// export default withErrorHandler(BurgerBuilder, axios);
export default connect(mapStateToProps, null)(Layout);
