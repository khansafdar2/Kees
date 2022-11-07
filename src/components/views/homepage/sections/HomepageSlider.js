import React from 'react';
import Slider from "react-slick";
import { isMobileOnly } from "react-device-detect";
import { Link } from 'react-router-dom';
// import sliderImage from '../../../../assets/img/slider.png';
// import sliderImageMobile from '../../../../assets/img/sliderMobile.png'

class HomepageSlider extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.data.slides
    }
  }

  render() {
    const { data } = this.state
    const settings = {
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 3000
    };

    return (
      <div className="homepage-slider">
        {
          data.length ?
            isMobileOnly ?

              <Slider {...settings}>
                {
                  data.map((banner, key) => {
                    return <div key={key}>
                      <Link to={banner.link}>
                        <img className="slider-image" src={banner.mobile_img} alt={banner.banner_slider_alt_text} />
                      </Link>
                    </div>
                  })
                }
              </Slider>
              :

              <Slider {...settings}>
                {
                  data.map((banner, index) => {
                    return <div key={index}>
                      <Link to={banner.link}>
                        <img className="slider-image" src={banner.desktop_img} alt={banner.banner_slider_alt_text} />
                      </Link>
                    </div>
                  })
                }
              </Slider>
            : null
        }
      </div>
    );
  }
}

export default HomepageSlider;