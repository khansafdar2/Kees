import React from 'react';
// import { Icon } from 'semantic-ui-react';
import whatsappIcon from '../../../assets/svg/whatsappIcon.svg'

import './whatsappButton.scss';

const ScrollToTop = () => {
    let showTopBtn = true

    // const [showTopBtn, setShowTopBtn] = useState(true);
    // useEffect(() => {
    //     window.addEventListener('scroll', () => {
    //         if (window.scrollY > 230) {
    //             setShowTopBtn(true);
    //         } else {
    //             setShowTopBtn(false);
    //         }
    //     });
    // }, []);

    // const goToTop = () => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth',
    //     });
    // };

    return (
        <>
            <div className='effect'>
                {showTopBtn && (
                    <div className="scroll_btn">
                        {/* <Icon name='chevron up' onClick={goToTop} /> */}
                        <a href="https://wa.me/+97466605252" target="blank"><img width="30px" src={whatsappIcon} alt="Whatsapp" /></a>
                    </div>
                )}
            </div>
        </>
    );
};
export default ScrollToTop;