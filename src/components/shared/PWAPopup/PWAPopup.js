import React from 'react';
import './PWAPopup.scss';
import shareIcon from '../../../assets/svg/iphoneShare.svg';

class PWAPopup extends React.Component {
  state = {
    show: false
  }
  componentDidMount() {

    // Detects if device is on iOS 
    const isIos = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return /iphone|ipad|ipod/.test(userAgent);
    }

    // Detects if device is in standalone mode
    const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

    if (isIos() && !isInStandaloneMode()) {
      setTimeout(() => {
        this.setState({
          show: true
        });

        setTimeout(() => {
          this.setState({
            show: false
          });
        }, 10000);
      }, 10000);
    }
  }

  render() {
    return (
      <>
        <div id="ios-pwa-popup" className={this.state.show ? "show" : ""}>
          <p>Install this webapp on your iPhone: tap <img className="share-icon" src={shareIcon} alt="Share" /> and then Add to Homescreen.</p>
        </div>
      </>);
  }
}

export default PWAPopup;
