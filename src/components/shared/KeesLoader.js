import React from 'react';
import keesLogo from '../../assets/img/keesLogo.png';
import { Loader} from 'semantic-ui-react'


class KeesLoader extends React.Component {
  // state = {  }
  render() { 
    return ( 
    <>
      <div className="homepage-loader kees-loader-wrapper">
        <div className="kees-loader">
          <img src={keesLogo} alt="Kees.qa" />
          <Loader active inline='centered' />
        </div>
      </div>
        
    </> );
  }
}
 
export default KeesLoader;