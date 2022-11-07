import React, { Component } from "react";
import { Helmet } from "react-helmet";

export default class Career extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <div className="careers-page">
        <Helmet>
          <title>Careers | KEES</title>
          <meta name="description" content="" />
          <meta name="keyword" content=" " />
        </Helmet>
        <div className="main-heading">
          <h1>Careers</h1>
        </div>
        <div className="careers-content">
          <h3>
            Discover rewarding career opportunities with <a href="/">Kees.qa</a>
            . Please submit your CV to:{" "}
            <a href="mailto:hr@kees.qa">Hr@Kees.qa</a>
          </h3>
        </div>
      </div>
    );
  }
}
