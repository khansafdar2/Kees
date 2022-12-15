// import axios from 'axios';
import React from 'react';
import { Dropdown } from 'semantic-ui-react'
/*images*/
// import keesLogo from '../assets/img/keesLogo.png';
import userIcon from '../../../assets/svg/userIcon.svg';
import walleticon from '../../../assets/svg/wallet.svg'
// import cartIcon from '../assets/svg/cartIcon.svg';
import SearchSuggestions from '../../shared/header/sections/SearchSuggestion';
// import Axios from 'axios';
import MiniCart from '../header/sections/MiniCart';
// import { keesLogoHeader } from '../../../services/context'
import { Link } from "react-router-dom";
import { connect } from "react-redux"
import { Helmet } from "react-helmet";

class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchQuery: "",
      categories: props.header.navigation_bar.category_structure,
      selectedCategory: '',
      header: props.header
    }
    // console.log("Header Props",props);
  }
  // componentDidMount() {
  //   debugger
  //   Axios.get(process.env.REACT_APP_BACKEND_HOST + '/storefront/categories_list')
  //     .then((res) => {
  //       debugger
  //       this.setState({
  //         categories: res.data
  //       })
  //     })
  //   // this.updateMiniCart()

  // }


  // header integration

  // componentDidMount() {
  //   axios.get(process.env.REACT_APP_BACKEND_HOST + '/storefront/header').then((res => {
  //     // const footer = res.data;
  //     // debugger
  //     this.setState({
  //       header: res.data.header,
  //       categories: res.data.header.navigation_bar.category_structure
  //     });
  //     // console.log("header", res.data);
  //   }))
  //     .catch((err) => {
  //       console.log("Error", err)
  //     })
  // }


  // updateSearchQuery = (query) => {
  //   
  //   this.setState({
  //     searchQuery : query      
  //   })
  // }

  // updateMiniCart = () => {
  //   let cart = JSON.parse(localStorage.getItem('cart'))
  //   if(cart)
  //   {
  //     let totalprice = 0  
  //     for (let i = 0; i < cart.length; i++) {
  //       const lineitem = cart[i];
  //       totalprice += lineitem.detail.variantPrice.original_price * lineitem.detail.quantity 

  //     }
  //     document.querySelector('.cart-total-quantity').innerHTML = totalprice
  //   }
  // }
  render() {
    const header = this.state.header;

    const categoriesOptions = [
      {
        key: 'all',
        text: 'All Categories',
        value: ''
      }
    ]

    for (let i = 0; i < this.state.categories.length; i++) {
      const category = this.state.categories[i];
      let obj = {
        key: category.handle,
        text: category.name,
        value: category.handle
      }
      categoriesOptions.push(obj)
    }

    return (
      <div className="nav-header">
        <Helmet>
          <meta name="google-site-verification" content="WdBSUpluU8GT9GxNl32laaLDt9FSu78Bul1alxqhenY" />
        </Helmet>
        <div className="container-xl">
          <div className="k-row">
            <div className="logo flex--1">
              <Link to="/">
                <div>
                  <img src={header ? header.header.logo_image : null} alt="kees.qa" />
                </div>
              </Link>
            </div>
            <div className="search-bar">
              <div className="search-bar-inner k-row">
                <div className="search-by-cat">
                  <Dropdown placeholder='All Categories' className="search-by-cat-dropdown" onChange={(e, data) => this.setState({ selectedCategory: data.value })} options={categoriesOptions} />
                </div>

                <div className="search-input">
                  {/* <Input placeholder='Search for products'  action={{ type: 'submit', content: '' , icon:'search' }} /> */}
                  <SearchSuggestions cat={this.state.selectedCategory} updateSearchQuery={this.updateSearchQuery} />
                </div>

              </div>
            </div>
            <div className="flex--1 k-row justify-content--end">

              {!!header?.header.show_vender_signup ?
                <div className="sell-with-us">
                  <Link to="/sellwithus"> <p> SELL WITH US</p></Link>
                </div>
                : null
              }
              <div className='wallet'>
                {
                  this.props.loggedIn ?
                    <>
                      <Link to="/wallet"> <img src={walleticon} alt='wallet icon' /></Link>
                    </>
                    : null
                }
              </div>
              <div className="account">
                {
                  sessionStorage.getItem('kees-customer-token') ?
                    <Link to="/account"> <img src={userIcon} alt="Account icon" /></Link>
                    : <Link to="/login"> <img src={userIcon} alt="Login icon" /></Link>
                }
              </div>
              {/* <div className="cart-icon k-row">

                <Link to="/cart"><img src={cartIcon} alt="cart-icon" /></Link>
                <Link to="/cart"><p id='cart-total'>Cart: <span> QAR <span className='cart-total-quantity'> 0.00</span></span></p></Link> 
              </div> */}
              <MiniCart />
            </div>

          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // this.setState({loggedIn :state.account.loggedIn })
  return {
    loggedIn: state.account.loggedIn,
  };
};

export default connect(mapStateToProps)(Header);
