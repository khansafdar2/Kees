import React from "react";
import cartIcon from "../../../../assets/svg/cartIcon.svg";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  Add_to_cart,
  Update_minicart,
} from "../../../../redux/slices/cartSlice";

class MiniCart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalProducts: 0,
      totalAmount: 0,
    };
  }

  updateCart = () => {
    this.props.dispatch(Update_minicart());

    // this.props.disptach(Add_to_cart())
    // let cart = JSON.parse(localStorage.getItem("cart"));
    // // let cartTotal = localStorage.getItem('cartTotal')
    // let totalCount = 0,
    //   totalprice = 0;

    // if (cart) {
    //   for (let i = 0; i < cart.length; i++) {
    //     const lineitem = cart[i];

    //     totalCount += parseInt(lineitem.detail.quantity);
    //     totalprice +=
    //       lineitem.detail.variantPrice.original_price *
    //       lineitem.detail.quantity;
    //   }
    //   this.setState({ totalProducts: totalCount, totalAmount: totalprice });
    // }
  };

  componentDidMount() {
    this.updateCart();
  }

  render() {
    return (
      <div className="micicart cart-icon k-row">
        <div className=" k-row">
          <Link className="cart-link" to="/cart">
            <img src={cartIcon} alt="Cart" />
            <span className="cart-count">{this.props.cart.totalCount}</span>
          </Link>

          <Link to="/cart">
            <p id="cart-total">
              <span>
                {" "}
                {this.props.cart.QAR}{" "}
                <span className="cart-total-quantity">
                  {/* {" "} */}

                  {this.props.cart.totalprice}
                </span>
              </span>
            </p>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps)(MiniCart);
