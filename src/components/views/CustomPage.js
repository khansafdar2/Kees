import axios from "axios";
import React, { Component } from "react";
import DOMPurify from "dompurify";
import { Loader } from "semantic-ui-react";
import { Helmet } from "react-helmet";

export class CustomPage extends Component {
  constructor(props) {
    super(props);
    // debugger
    this.state = {
      handle: this.props.match.params.pageHandle,
      title: "",
      content: "",
      seo: '',
      showLoader: true,
    };
  }
  fetchCustomPageData = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_HOST +
        "/storefront/page/" +
        this.state.handle
      )
      .then((response) => {
        // console.log(response)
        this.setState({
          seo: response.data,
          title: response.data.title,
          content: response.data.content,
          showLoader: false,
          cleanDescription: DOMPurify.sanitize(response.data.content, {
            USE_PROFILES: { html: true },
          }),
        });
      })
      .catch(function (error) {
        console.log(error);
        this.setState({ showLoader: false });
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    this.fetchCustomPageData();
  }

  componentDidUpdate() {
    if (this.state.handle !== this.props.match.params.pageHandle) {
      window.scrollTo(0, 0);
      this.setState(
        {
          handle: this.props.match.params.pageHandle,
        },
        () => this.fetchCustomPageData()
      );
    }
  }

  render() {
    const { title } = this.state;

    return (
      <div>
        <div className="Custom-page">
          <Helmet>
            <title>
              {this.state.seo.seo_title ? (this.state.seo.seo_title + " | KEES") : (this.state.title ? (this.state.title + " | KEES") : ("KEES | Best Online Shopping in Qatars"))}
            </title>
            <meta
              name="description"
              content={this.state.seo.seo_description}
            />
            <meta name="keyword" content={this.state.seo.seo_keywords} />
          </Helmet>
          {this.state.title ? (
            <>

              <div className="container Custom-page">
                <div className="CustomPage-title">
                  <h1> {title}</h1>
                </div>

                <div className="CustomPage-content">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.cleanDescription,
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    );
  }
}

export default CustomPage;
