import axios from 'axios';
import React from 'react';
import pageBanner from '../../assets/img/pageBanner.png';
import { Helmet } from "react-helmet";

class PageBanner extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      bannerTitle: this.props.bannerTitle,
      seo_details: null,
      bannerLink: '',
      handle: props.handle,
      productsFrom: props.productsFrom,
    }
  }
  debugger

  fetchBanner() {

    axios.get(process.env.REACT_APP_BACKEND_HOST + "/storefront/productlistbanner?" + this.state.productsFrom + "=" + this.state.handle)
      .then((response) => {
        // console.log("product list banner", response)
        this.setState({
          bannerLink: response.data.cdn_link,
          seo_details: response.data.seo_details
        });
      })
      .catch((err) => {

        console.log(err)
        this.setState({
          bannerLink: null
        })

      })
  }

  componentDidMount() {
    if (this.state.handle) {
      this.fetchBanner()
    }
  }
  componentDidUpdate() {
    // debugger
    // if (window.location.href.includes('promotions') && this.state.productsFrom != "promotions")
    // {
    //   this.setState({ productsFrom : 'promotions' })
    // }
    if (this.props.handle !== this.state.handle || this.props.productsFrom !== this.state.productsFrom) {
      this.setState({
        handle: this.props.handle,
        productsFrom: this.props.productsFrom
      }, () => {
        this.fetchBanner()
      })
    }
  }

  render() {
    const { bannerLink } = this.state
    // let heading
    // if(bannerTitle)
    // {
    //    heading = bannerTitle.split(' ')
    // }

    return (
      <div className="page-banner">
        <Helmet>
          <title>{this.state.seo_details?.seo_title ? (this.state.seo_details.seo_title + " | KEES") : (this.state.seo_details?.title ? (this.state.seo_details.title + " | KEES") : ("KEES | Best Online Shopping in Qatar"))}</title>
          <meta
            name="description"
            content={this.state.seo_details?.seo_description}
          />
          <meta name="keyword" content={this.state.seo_details?.seo_keywords} />
        </Helmet>
        {
          bannerLink ?
            <>
              <img src={bannerLink ? bannerLink : pageBanner} alt="banner" />
              {/* <div className="banner-content-wrapper"> */}

              {/* <h1 className="banner-heading">{heading[0]} <span>{ bannerTitle.replace(heading[0], '') }</span></h1> */}

              {/* <p className="banner-para">{  } </p> */}
              {/* </div> */}
            </>
            : null
        }
      </div>
    )
  }

}
export default PageBanner;