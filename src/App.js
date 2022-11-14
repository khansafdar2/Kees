import React from "react";
// import ReactDOM from 'react-dom';
import Axios from "axios";
import keesLogo from "./assets/img/keesLogo.png";
import "./App.css";
import { isMobile } from "react-device-detect";
import Announcement from "./components/shared/header/sections/Announcement";
import Header from "./components/shared/header/Header";
import Navbar from "./components/shared/header/sections/Navbar";
import Homepage from "./components/views/homepage/Homepage";
import Footer from "./components//shared/footer/Footer";
// import CategoriesPage from './components/CategoriesPage'
// import CategoryPageWrapper from './components/CategoryPageWrapper'
import BrandsPage from "./components/views/BrandsPage";
import VendorsPage from "./components/views/venders/VendorsPage";
import CollectionPage from "./components/views/productsView/CollectionPage";
// import ProductPage from './components/ProductPage'
import Cart from "./components/views/Cart";
import Checkout from "./components/views/checkout/Checkout";
import Login from "./components/views/customer/Login";
import Signup from "./components/views/customer/Signup";
import Account from "./components/views/customer/userAccount/Account";
import Search from "./components/views/Search";
import Deals from "./components/views/Deals";
import PasswordPage from "./components/views/PasswordPage";
import ForgotPassword from "./components/views/customer/ForgotPassword";
import ContactUs from "./components/views/ContactUs";
import OrderDetailPage from "./components/views/customer/userAccount/OrderDetailPage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import ProductPageWrapper from "./components/views/productPage/ProductPageWrapper";
import MobileHeader from "./components/shared/header/MobileHeader";
import { Loader } from "semantic-ui-react";
// import MiniCart from './components/MiniCart';
import CustomPage from "../src/components/views/CustomPage";
import CategoriesPage from "../src/components/views/categoriesPage/CategoriesPage";
import AboutUs from "./components/views/AboutUs";
import Careers from "../src/components/views/Career";
import TrackOrder from "../src/components/views/TrackOrder";
import ThankyouPage from "./components/views/checkout/sections/ThankyouPage";
import VenderPage from "./components/views/venders/VenderPage";
import wallet from "./components/views/wallet/wallet";
import Protected from "./authentication/Protected";
import ProtectedCheckout from "./authentication/ProtectedCheckout";
import { notify } from "./firebase";
import PWAPopup from "./components/shared/PWAPopup/PWAPopup";
import WhatsappButton from "./components/shared/whatsappButton/whatsappButton";
import Helmet from "react-helmet";
import Blog from "./components/views/blog/Blog";
import SingleBlog from "./components/views/blog/SingleBlog";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordChecked: false, //if password enabled api is checked
      passwordEnabled: false, //if passowrd enabled api returns true
      seotitle: "",
      showHeaderFooter:
        window.location.href.includes("checkout") ||
        window.location.href.includes("thankyou")
          ? false
          : true,
      header: null,
    };
    this.changePasswordEnabledState =
      this.changePasswordEnabledState.bind(this);
  }

  changePasswordEnabledState = () => {
    this.setState({
      passwordEnabled: false,
    });
  };

  componentDidMount() {
    // console.log('REACT_APP_BACKEND_HOST', process.env.REACT_APP_BACKEND_HOST)

    this.getHeader();

    if (sessionStorage.getItem("passwordMatched") === "true") {
      this.setState({
        passwordEnabled: false,
        passwordChecked: true,
      });
    } else {
      Axios.get(
        process.env.REACT_APP_BACKEND_HOST +
          "/storefront/check_protect_password"
      )
        .then((response) => {
          // handle success
          // console.log(response)
          this.setState({
            seotitle: response.data,
            passwordChecked: true,
            passwordEnabled: response.data.enable_password,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //firebase function call
    notify();
  }

  componentDidUpdate() {
    window.scrollTo(0, 0);
  }

  async getHeader() {
    await Axios.get(process.env.REACT_APP_BACKEND_HOST + "/storefront/header")
      .then((res) => {
        // const footer = res.data;
        // debugger
        this.setState({
          header: res.data.header,
          categories: res.data.header.navigation_bar.category_structure,
        });
        // console.log("header", res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  render() {
    return (
      <div className="App">
        <Helmet>
          <title>
            {this.state.seotitle.seo_title
              ? this.state.seotitle.seo_title
              : this.state.seotitle?.title
              ? this.state.seotitle.title
              : "KEES | Best Online Shopping in Qatars"}
          </title>
          <meta
            name="description"
            content={this.state.seotitle.seo_description}
          />
          <meta name="keyword" content={this.state.seotitle.seo_keywords} />
        </Helmet>

        {this.state.passwordChecked ? (
          <header className="App-header">
            {this.state.passwordEnabled ? (
              <PasswordPage
                changePasswordEnabledState={this.changePasswordEnabledState}
              />
            ) : (
              <Router>
                {this.state.showHeaderFooter ? (
                  isMobile ? (
                    <>
                      <Announcement announcement={this.state.header} />
                      <MobileHeader />
                      <WhatsappButton />
                    </>
                  ) : (
                    <>
                      {this.state.header ? (
                        <>
                          <Announcement announcement={this.state.header} />
                          <Header header={this.state.header} />
                          <Navbar navbar={this.state.header} />
                          <WhatsappButton />
                        </>
                      ) : null}
                    </>
                  )
                ) : null}
                <Switch>
                  <Route exact path="/">
                    <Homepage />
                  </Route>

                  {/* <Route path="/categories/:catId" component={CategoryPageWrapper} / > */}
                  <Route
                    path="/categories/:catHandle"
                    component={CategoriesPage}
                  />

                  <Route path="/brands/all">
                    <BrandsPage />
                  </Route>

                  <Route path="/vendors/all">
                    <VendorsPage />
                  </Route>

                  <Route
                    exact
                    path="/collection/:handle"
                    component={CollectionPage}
                  />
                  <Route
                    exact
                    path="/brand/:handle"
                    component={CollectionPage}
                  />
                  <Route
                    exact
                    path="/promotions/:handle"
                    component={CollectionPage}
                  />
                  <Route
                    exact
                    path="/vendor/:handle"
                    component={CollectionPage}
                  />

                  <Route
                    path="/product/:handle"
                    component={ProductPageWrapper}
                  />

                  <Route path="/cart">
                    <Cart />
                  </Route>

                  <Route path="/trackyourorder" component={TrackOrder} />
                  <Route path="/trackyourorder/error" component={TrackOrder} />
                  <Route path="/orderDetail/:id" component={OrderDetailPage} />
                  <Route
                    path="/forgotPassword/:token"
                    component={ForgotPassword}
                  />
                  <Route path="/page/contactus" component={ContactUs} />
                  <Route path="/page/aboutus" component={AboutUs} />
                  <Route path="/page/careers" component={Careers} />
                  <Route path="/sellwithus" component={VenderPage} />
                  {/* <Route path="/wallet" component={wallet} /> */}
                  <Route
                    exact
                    path="/page/:pageHandle"
                    component={CustomPage}
                  />

                  <Route path="/login">
                    <Login />
                  </Route>

                  <Route path="/signup">
                    <Signup />
                  </Route>

                  <Route path="/blog">
                    <Blog />
                  </Route>

                  <Route path="/blogs/:id" component={() => <SingleBlog />} />

                  {/* <Route path="/account">
                      <Account />
                    </Route> */}

                  <Protected path="/account" component={() => <Account />} />

                  <Protected path="/wallet" component={wallet} />

                  <Route path="/search/:q" component={Search}>
                    {/* <Search /> */}
                  </Route>

                  <Route path="/deals">
                    <Deals />
                  </Route>

                  <ProtectedCheckout
                    path="/checkout"
                    component={() => <Checkout />}
                  />

                  {/* <Route exact path="/checkout">
                      <Checkout />
                    </Route> */}

                  <Route
                    path="/thankyou/:id"
                    exact
                    component={ThankyouPage}
                  ></Route>

                  <Route>
                    <div className="page-notfound">
                      <div className="container-xl">
                        <h3>404 Not Found</h3>
                      </div>
                    </div>
                  </Route>
                </Switch>
                {this.state.showHeaderFooter ? <Footer /> : null}
              </Router>
            )}
            <PWAPopup />
          </header>
        ) : (
          <div className="homepage-loader">
            <div className="kees-loader">
              <img src={keesLogo} alt="Kees.qa" />
              <Loader active inline="centered" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
