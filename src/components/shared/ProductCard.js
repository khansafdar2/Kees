import React from 'react';
import { Link } from 'react-router-dom'
// import defaultImage from '../assets/img/product1.png';
import defaultImage from '../../assets/img/productImagePlaceholder.png';
// import {productClicks} from '../services/GAEvents'

class ProductCard extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.product) {
      this.state = {
        product: this.props.product
      }
    }

    else {
      //dummy data
      this.state = {
        product: {
          title: 'Product Name Here',
          price: '600.00',
          image: defaultImage
        }
      }
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.product) {
      if (this.props.product.id !== prevProps.product.id) {
        this.setState({
          product: this.props.product
        })
      }
    }
  }
  componentDidMount() {
    // debugger
  }

  productClicks = (productObj) => {

    window.dataLayer = window.dataLayer || [];

    // window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    // window.dataLayer.push({
    //   'event': 'select_item',
    //   'ecommerce': {
    //      'items': [{
    //       item_name: productObj.name, // Name or ID is required.
    //       item_id: 1,
    //       item_brand: productObj.brand,
    //       item_category: productObj.category,
    //       item_category2: productObj.category_2,
    //       item_category3: productObj.category_3,
    //       item_category4: productObj.category_4,
    //       item_variant: productObj.variant,
    //       item_list_name: productObj.list_name,
    //       item_list_id: productObj.list_id,
    //       index: productObj.index,
    //       quantity: productObj.quantity,
    //       price: productObj.price
    //     }]
    //    }
    //   //  ,
    //   //  'eventCallback': function() {
    //   //    document.location = productObj.url
    //   //  }
    // });
    // debugger

    window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
    window.dataLayer.push({
      'event': 'productClick',
      'ecommerce': {
        'click': {
          'products': [{
            'name': productObj.name,                      // Name or ID is required.
            'id': productObj.id,
            'price': productObj.price,
            'brand': productObj.brand,
            'category': productObj.cat,
            'variant': productObj.variant,
            'position': productObj.position
          }]
        }
      }
      // ,
      // 'eventCallback': function() {
      //   document.location = productObj.url
      // }
    });
  }

  render() {

    let { product } = this.state
    let saleTag = null;
    let price = <p className="product-price">QAR: {product.price.original_price}</p>;
    if (product.price.original_price < product.price.compare_price) {
      saleTag = (
        <div className="saleTag">Sale</div>
      )
      price = (
        <p className="product-price sale-price"> <span className="original-price">QAR: {product.price.compare_price} </span> QAR: {product.price.original_price} </p>
      )
    }
    // if(product.sold_out == true) {
    //   soldTag = (
    //     <div className="soldTag">sold</div>
    //   )
    // }

    let productObjectGA = {
      'name': product.title,                      // Name or ID is required.
      'id': product.id,
      'price': product.price.original_price,
      // 'brand': ,
      // 'category': productObj.cat,
      // 'variant': productObj.variant,
      // 'position': productObj.position
    }

    return (



      <div className="product-wrapper product-grid-item">
        <Link to={'/product/' + product.handle}>
          <div onClick={() => { this.productClicks(productObjectGA) }} className='product-card-inner-wrapper'>
            {saleTag}
            {
              product.sold_out === true ?
                <div className="soldTag">
                  <span>
                    sold out
                  </span>
                </div>
                : null
            }


            <div className="grid-item-image">

              <img className="product-img" src={product.image ? product.image : defaultImage} alt={product.title} />
            </div>

            <p className="product-title">{product.title}</p>
            {price}
            <button className="btn-1">Buy It Now</button>
          </div>
        </Link>
      </div>
    )
  }

}

export default ProductCard;
