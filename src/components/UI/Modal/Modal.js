import React, { Component } from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

// class Modal extends Component {
//   shouldComponentUpdate(nextProps, nextState) {
//     return nextProps.show !== this.props.show;
//   }

//   componentWillUpdate() {
//     console.log('Component will update');
//   }
//   render() {
//     return (
//       <>
//         <Backdrop
//           show={this.props.show}
//           clicked={this.props.modalClosed}
//         />
//         <div
//           className={classes.Modal}
//           style={{
//             transform: this.props.show
//               ? 'translateY(0)'
//               : 'translateY(-100vh)',
//             opacity: this.props.show ? '1' : '0'
//           }}
//         >
//           {this.props.children}
//         </div>
//       </>
//     );
//   }
// }
// export default Modal;

const memoDependencyFunction = (prevProps, nextProps) =>
  prevProps.show === nextProps.show;

const Modal = props => {
  console.log(props);
  return (
    <>
      <Backdrop
        show={props.show}
        clicked={props.modalClosed}
      />
      <div
        className={classes.Modal}
        style={{
          transform: props.show
            ? 'translateY(0)'
            : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default React.memo(Modal, memoDependencyFunction);
