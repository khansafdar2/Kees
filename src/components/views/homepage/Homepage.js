import React from 'react';
import HomepageSlider from './sections/HomepageSlider'
import CollectionTabs from './sections/CollectionTabs'
import BrandsSlider from './sections/BrandsSlider'
import CollectionSlider from './sections/CollectionSlider'
import StaticBanner from './sections/StaticBanner'
import CategoriesTabs from './sections/CategoriesTabs'
import TwoBannerSection from './sections/TwoBannerSection'
import BadgesSection from './sections/BadgesSection'
import { Loader } from 'semantic-ui-react'
import Axios from 'axios';

class Homepage extends React.Component {
  // state = {  }

  constructor(props) {
    super(props)
    this.state = {
      homepage: {}
    }
  }

  componentDidMount() {
    Axios.get(process.env.REACT_APP_BACKEND_HOST + '/storefront/homepage')
      .then((response) => {
        this.setState({ homepage: response.data.homepage })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { homepage } = this.state
    return (
      <>
        <div className="page-height homepage">
          {
            homepage.length ?
              homepage.map((section, index) => {
                return <div key={index}>
                  {
                    section.type === "banner_slider" ?
                      <HomepageSlider data={section} /> : null
                  }
                  {
                    section.type === "categories_carousel" ?
                      <CollectionTabs data={section} /> : null
                  }
                  {
                    section.type === "brands_slider" ?
                      <BrandsSlider data={section} /> : null
                  }
                  {
                    section.type === "products_carousel" ?
                      <CollectionSlider data={section} /> : null
                  }
                  {
                    section.type === "single_banner" ?
                      <StaticBanner data={section} /> : null
                  }
                  {
                    section.type === "categories_tabs" ?
                      <CategoriesTabs data={section} /> : null
                  }
                  {
                    section.type === "two_banners" ?
                      <TwoBannerSection data={section} /> : null
                  }
                  {
                    section.type === "features_icons" ?
                      <BadgesSection data={section} /> : null
                  }

                </div>
              })
              :

              <div className="home-loader">
                <Loader active inline='centered' />
              </div>

          }
        </div>
        {/* <HomepageSlider /> */}
        {/* <CollectionTabs /> */}
        {/* <BrandsSlider /> */}
        {/* <CollectionSlider /> */}
        {/* <CollectionTabs /> */}
        {/* <StaticBanner  /> */}
        {/* <CategoriesTabs />  */}
        {/* <TwoBannerSection /> */}
        {/* <StaticBanner /> */}
        {/* <BadgesSection/> */}
      </>
    );
  }
}

export default Homepage;