import React from 'react'
import defaultImage from '../../assets/img/productImagePlaceholder.png'
// import { updateGlobalMinicart } from '../../services/context';
import deleteIcon from '../../assets/svg/deleteIcon.svg'
import { Input, Button } from 'semantic-ui-react'
import Axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
// import { isMobile } from "react-device-detect";
import { Helmet } from 'react-helmet'

import { connect } from 'react-redux'
import {
  // Add_to_cart,
  Remove_from_cart,
  Update_minicart,
  Update_decr_Qty,
  Update_incr_Qty,
} from '../../redux/slices/cartSlice'

class Cart extends React.Component {
  // state = {  }
  state = {
    cart: [],
    deletedLineItems: [],
    cartEmpty: false,
    allowCheckout: false,

    checkout_settings: {},

    checkoutMsg: null,
  }

  componentDidMount() {
    if (localStorage.getItem('cart')) {
      let cart = JSON.parse(localStorage.getItem('cart'))
      if (cart.length) {
        this.setState({
          allowCheckout: true,
        })
      }
      this.setState({
        cart: cart,
      })
    }

    // if (!isMobile)
    // {
    this.updateMiniCart()
    this.props.dispatch(Update_minicart())
    this.checkout_settings()
    //  this.render_cart_detail(this.props.cart.totalprice,this.props.cart.totalCount);
    // console.log('price',this.props);
    // }
  }

  checkout_settings = () => {
    Axios.get(
      process.env.REACT_APP_BACKEND_HOST +
      '/storefront/checkout_setting' +
      '?token=' +
      sessionStorage.getItem('kees-customer-token')
    ).then((response) => {
      this.setState({
        checkout_settings: response.data,
      })
    })
  }

  updateCart = (newQuantity, e) => {
    if (newQuantity !== 0) {
      let variantId = e.target
        .closest('.quantity-picker')
        .getAttribute('variantid')
      // update cart
      let cart = JSON.parse(localStorage.getItem('cart'))
      for (let i = 0; i < cart.length; i++) {
        const lineItem = cart[i]
        if (lineItem.varId === variantId) {
          lineItem.detail.quantity = newQuantity
          break
        }
      }
      this.setState({
        cart: cart,
      })
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }

  quantityDecrement = (e, id) => {
    let quantityPicker = e.target.closest('button').nextSibling

    let newQuantity = parseInt(quantityPicker.value) - 1
    if (newQuantity !== 0) {
      quantityPicker.value = newQuantity
      this.updateCart(newQuantity, e)
    }
    this.props.dispatch(Update_decr_Qty(id))
    this.props.dispatch(Update_minicart())
    // this.updateMiniCart();
  }

  quantityIncrement = (e, id) => {
    let quantityPicker = e.target.closest('button').previousSibling
    let newQuantity = parseInt(quantityPicker.value) + 1

    let maxQuantity = e.target.closest('button').getAttribute('maxinventory')
    if (newQuantity <= maxQuantity) {
      quantityPicker.value = newQuantity
      this.updateCart(newQuantity, e)
      // this.updateMiniCart();

      this.props.dispatch(Update_incr_Qty(id))
      this.props.dispatch(Update_minicart())
    }
    // window.updateGlobalMinicart()
  }
  deleteLineitem = (e) => {
    let varId = e.target.closest('.delete-button').getAttribute('variantId')

    let cart = JSON.parse(localStorage.getItem('cart'))
    // let deletedItems = JSON.parse( localStorage.getItem('deletedItems'))

    for (let i = 0; i < cart.length; i++) {
      const lineItem = cart[i]
      if (lineItem.varId === varId) {
        cart.splice(i, 1)

        this.props.dispatch(
          Remove_from_cart([
            {
              varId: lineItem.varId,
            },
          ])
        )

        if (lineItem.detail.id) {
          Axios.delete(
            process.env.REACT_APP_BACKEND_HOST +
            '/order/delete_line_item?checkout_id=' +
            localStorage.getItem('checkout_id') +
            '&line_item=' +
            lineItem.detail.id
          )
            .then((response) => {
              // document.querySelector('tr[variantid="'+ varId +'"]').remove()

              this.setState({ cart: cart })

              // let stateCart = this.state.cart
              // for (let i = 0; i < stateCart.length; i++) {
              //   const item = stateCart[i]
              //   if(varId == item.varId)
              //   {
              //     stateCart.splice(i, 1)
              //     break
              //   }

              // }
              // this.setState({cart : stateCart})
            })
            .catch((err) => {
              console.log('line item not deleted', err)
            })
        } else {
          this.setState({ cart: cart })

          // document.querySelector('tr[variantid="'+ varId +'"]').remove()
        }
        if (!cart.length) {
          this.setState({ allowCheckout: false })
        }
      }
    }
    // console.log(cart)

    // this.updateMiniCart(cart);
    this.props.dispatch(Update_minicart(cart))

    localStorage.setItem('cart', JSON.stringify(cart))
  }
  // render_cart_detail

  // render_cart_detail = (totalprice, totalCount) => {
  //   debugger;
  //   if (document.querySelector(".cart-total-quantity")) {
  //     document.querySelector(".cart-total-quantity").innerHTML = totalprice;
  //   }

  //   if (document.querySelector(".cart-count")) {
  //     document.querySelector(".cart-count").innerHTML = totalCount;
  //   }
  //   debugger;
  // document.querySelector(".subtotal h4 span").innerHTML = totalprice;
  // };

  updateMiniCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    let totalprice = 0
    let totalCount = 0
    if (cart) {
      if (!cart.length) {
        this.setState({ cartEmpty: true })
      } else {
        this.setState({ cartEmpty: false })
      }
      // this.props.dispatch(Add_to_cart(cart))
      // for (let i = 0; i < cart.length; i++) {
      //   const lineitem = cart[i];
      //   totalCount += parseInt(lineitem.detail.quantity);
      //   totalprice +=
      //     lineitem.detail.variantPrice.original_price *
      //     lineitem.detail.quantity;
      // }
      // cart = localStorage.setItem("cart", JSON.stringify(cart));

      //  this.render_cart_detail(totalprice,totalCount);
    }
  }

  checkout = () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    const cartTotal = JSON.parse(localStorage.getItem('cartTotal'))
    const cartObjLists = {
      ids: [],
    } // to be used for fbq

    if (cart != null && cart.length > 0) {
      cart.map((item) => {
        cartObjLists.ids.push(item.detail.id)
      })
    }

    window.fbq('track', 'InitiateCheckout', {
      content_type: 'product_group',
      content_ids: cartObjLists.ids,
      //product_categories: this.state.product.category,
      value: cartTotal,
      num_items: cartObjLists.ids.length,
      currency: 'QAR',
    })

    if (cart) {
      let lineItems = []
      for (let i = 0; i < cart.length; i++) {
        const lineItem = cart[i]
        let item = {
          variant_id: lineItem.detail.variantId,
          vendor: parseInt(lineItem.detail.vendor_id),
          quantity: parseInt(lineItem.detail.quantity),
        }
        if (lineItem.detail.id) {
          item.id = lineItem.detail.id
        }
        lineItems.push(item)
      }
      if (localStorage.getItem('checkout_id')) {
        let body = {
          checkout_id: localStorage.getItem('checkout_id'),
          line_items: lineItems,
        }

        if (sessionStorage.getItem('kees-customer-id')) {
          body['customer'] = sessionStorage.getItem('kees-customer-id')
        }
        Axios.put(process.env.REACT_APP_BACKEND_HOST + '/order/checkout', body)
          .then((response) => {
            // console.log(response)
            // update ids for products added to cart

            let respCart = response.data.lineItems

            for (let i = 0; i < cart.length; i++) {
              const item = cart[i]
              for (let j = 0; j < respCart.length; j++) {
                const respLineItem = respCart[j]
                if (respLineItem.variant === item.varId) {
                  item.detail.id = respLineItem.id
                }
              }
            }
            localStorage.setItem('cart', JSON.stringify(cart))
            // localStorage.removeItem('deletedItems')

            {
              this.state.checkout_settings?.customer_accounts === 'required' &&
                !sessionStorage.getItem('kees-customer-token') ? (
                <>
                  {/*(window.location.href = '/login')*/}
                  {this.props.history.push('/login')}
                </>
              ) : (
                (window.location.href = '/checkout')
                //this.props.history.push('/checkout')
              )
            }

            // window.location.href = "/checkout";
          })
          .catch((err) => {
            //     console.log(err.response)
            if (err.response.data.detail === 'lineitems length zero') {
              this.setState({
                checkoutMsg: 'You added sold out item to cart',
              })
            }
            if (err.response.status === 404) {
              let unavailableVariants = err.response.data
              for (let i = 0; i < unavailableVariants.length; i++) {
                const variant = unavailableVariants[i]
                document.querySelector(
                  'tr[variantid="' +
                  variant.variant_id +
                  '"] .quant-unavailable span'
                ).innerHTML = variant.available_quantity
                document
                  .querySelector('tr[variantid="' + variant.variant_id + '"]')
                  .classList.add('quantity-error')
              }
            }
          })
      } else {
        // console.log('checkout create')
        let body = {
          line_items: lineItems,
        }

        if (sessionStorage.getItem('kees-customer-id')) {
          body['customer'] = sessionStorage.getItem('kees-customer-id')
        }

        Axios.post(process.env.REACT_APP_BACKEND_HOST + '/order/checkout', body)
          .then((response) => {
            // console.log(response)
            localStorage.setItem('checkout_id', response.data.checkout_id)

            // update ids for products added to cart
            let respCart = response.data.lineItems
            for (let i = 0; i < cart.length; i++) {
              const item = cart[i]
              for (let j = 0; j < respCart.length; j++) {
                const respLineItem = respCart[j]
                if (respLineItem.variant === item.varId) {
                  item.detail.id = respLineItem.id
                }
              }
            }

            localStorage.setItem('cart', JSON.stringify(cart))

            window.location.href = '/checkout';
            // this.props.history.push('/checkout')
          })
          .catch((err) => {
            if (err.response.status === 404) {
              let unavailableVariants = err.response.data
              for (let i = 0; i < unavailableVariants.length; i++) {
                const variant = unavailableVariants[i]
                document.querySelector(
                  'tr[variantid="' +
                  variant.variant_id +
                  '"] .quant-unavailable span'
                ).innerHTML = variant.available_quantity
                document
                  .querySelector('tr[variantid="' + variant.variant_id + '"]')
                  .classList.add('quantity-error')
              }
            }
          })
      }
    }
  }

  emptyCart = () => {
    localStorage.removeItem('checkout_id')
    localStorage.removeItem('cart')
    localStorage.removeItem('cartTotal')
    window.location.reload()
  }

  render() {
    const { cart } = this.state

    return (
      <div className='cart-page'>
        <Helmet>
          <title>Cart | KEES</title>
          <meta name='description' content='' />
          <meta name='keyword' content='' />
        </Helmet>
        <div className='container-xl'>
          <div className='breadcrumbs'>
            <p>
              Home / <span>Your Shopping Cart</span>
            </p>
          </div>
          <div className='cart-wrapper'>
            <div>
              <table>
                <tr>
                  <th>

                    <p> Product</p>
                  </th>
                  <th>

                    <p> Price</p>
                  </th>
                  <th>

                    <p> Quantity</p>
                  </th>
                  <th>

                    <p> Total</p>
                  </th>
                  <th>

                    <p> Remove</p>
                  </th>
                </tr>

                {/* print lineitems   */}
                {cart.length && cart[0] != null
                  ? cart.map((lineItem, key) => {
                    const itemDetail = lineItem.detail
                    return (
                      <tr variantId={lineItem.varId} key={key}>
                        <td>
                          <div className='k-row'>
                            <Link to={'/product/' + itemDetail.productHandle}>
                              <div className='cart-product-img'>
                                <img
                                  className=''
                                  src={
                                    itemDetail.image
                                      ? itemDetail.image
                                      : defaultImage
                                  }
                                  alt={itemDetail.title}
                                />
                              </div>
                            </Link>
                            <div className='cart-product-title-wrap'>
                              <h5>

                                <Link
                                  to={'/product/' + itemDetail.productHandle}
                                >

                                  {itemDetail.title}
                                </Link>
                              </h5>
                              <p className='cart-item-brand'>
                                {itemDetail.brand}
                              </p>
                              <p className='variant-title'>
                                {itemDetail.variantTitle === 'Default Title'
                                  ? ''
                                  : itemDetail.variantTitle}
                              </p>
                              <p className='quant-unavailable'>
                                Quantity Unavailable. Max available inventory
                                <span></span>
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className='cart-item-price'>
                            <span>Price: </span>
                            {this.props.cart.QAR}
                            {itemDetail.variantPrice.original_price}
                          </p>
                        </td>
                        <td>
                          <div className='k-row quantity-picker-wrapper'>
                            <Input
                              variantId={lineItem.varId}
                              className='quantity-picker'
                              type='number'
                              value={itemDetail.quantity}
                            >
                              <Button
                                icon='minus'
                                onClick={(e) =>
                                  this.quantityDecrement(e, lineItem.varId)
                                }
                                basic
                              />
                              <input
                                max={itemDetail.inventoryQuantity}
                                className='quantity-picker'
                                type='number'
                                min='0'
                              />
                              <Button
                                maxinventory={itemDetail.inventoryQuantity}
                                icon='plus'
                                onClick={(e) =>
                                  this.quantityIncrement(e, lineItem.varId)
                                }
                                basic
                              />
                            </Input>
                          </div>
                        </td>
                        <td>
                          <p className='cart-item-total-price'>
                            <span>Total Price: </span>
                            {this.props?.cart?.QAR}
                            {itemDetail?.quantity *
                              itemDetail?.variantPrice?.original_price}
                          </p>
                        </td>
                        <td>
                          <button
                            variantId={lineItem.varId}
                            onClick={this.deleteLineitem}
                            className='delete-button'
                          >
                            <img src={deleteIcon} alt='' />
                          </button>
                        </td>
                      </tr>
                    )
                  })
                  : null}
                {this.state.cartEmpty ? (
                  <div className='empty-msg'>
                    <h4>Cart Empty</h4>
                  </div>
                ) : null}
              </table>
            </div>
            <div className='subtotal-wrapper k-row'>
              <div className='add-note'>
                <p>Add a note to your order</p>
              </div>
              <div className='subtotal'>
                <h4>
                  Subtotal: {this.props?.cart?.QAR}
                  <span>{this.props?.cart?.totalprice}</span>
                </h4>
                <p>Shipping, and discounts will be calculated at checkout.</p>
                <div className='k-row cart-action-btns'>
                  {/* <button className="secondary-button">Continue Shipping</button>
                  <button className="secondary-button">Update Cart</button> */}
                  <div>
                    {this.state.allowCheckout ? (
                      <button
                        onClick={this.checkout}
                        className='primary-button '
                      >
                        Checkout
                      </button>
                    ) : (
                      <button
                        onClick={this.checkout}
                        className='primary-button disabled '
                        disabled
                      >
                        Checkout
                      </button>
                    )}
                  </div>
                  {this.state.checkoutMsg !== null && (
                    <div className='checkout-msg'>
                      <p>{this.state.checkoutMsg}</p>
                      <p
                        className='empty-cart-btn'
                        onClick={() => this.emptyCart()}
                      >
                        Click Here to empty your cart
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('cart', state)
  return {
    cart: state.cart,
  }
}

export default withRouter(connect(mapStateToProps)(Cart))
