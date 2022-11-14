import React from "react";
import { data } from "./data";
import "./SingleBlog.scss";

const SingleBlog = () => {
  console.log("SingleBlog");
  return (
    <div className="single-blog-container">
      <div className="header">
        <h1>Blog</h1>
        <p>Jan 24, 2022</p>
        <h2>Omnichannel Commerce In Retail: A Complete Guide</h2>
        <div className="tags">
          <div className="tag">Order Management</div>
          <div className="tag">Inventory Management</div>
        </div>
      </div>
      <div className="image">
        <img src="https://uploads-ssl.webflow.com/6225e3bcdcd38d2a25b1df9e/626a55d65350a63123681a27_Omnichannel%20Commerce%20In%20Retail%20-%20Feature-p-500.jpeg" />
      </div>
      <div className="description">
        <p>
          {" "}
          Omnichannel commerce is the first component of Omnichannel retailing.
          Omnichannel commerce facilitates retailers to provide a unified
          customer experience on all channels, including physical store, online
          store, mobile device, social media and other channels. Omnichannel
          sales channels include mobile websites and apps, email marketing, sms,
          text messages, social media, ecommerce marketplaces, point of sale
          integration and inventory management. In Omnichannel commerce, a
          retailer is able to sell its entire product range and stock both
          online and offline at the same time. Having integrated online and
          offline channels, an Omnichannel retailer is able to provide multiple
          ways for their customers to shop from them.
        </p>
        <p>
          {" "}
          Omnichannel commerce is the first component of Omnichannel retailing.
          Omnichannel commerce facilitates retailers to provide a unified
          customer experience on all channels, including physical store, online
          store, mobile device, social media and other channels. Omnichannel
          sales channels include mobile websites and apps, email marketing, sms,
          text messages, social media, ecommerce marketplaces, point of sale
          integration and inventory management. In Omnichannel commerce, a
          retailer is able to sell its entire product range and stock both
          online and offline at the same time. Having integrated online and
          offline channels, an Omnichannel retailer is able to provide multiple
          ways for their customers to shop from them.
        </p>
        <p>
          {" "}
          Omnichannel commerce is the first component of Omnichannel retailing.
          Omnichannel commerce facilitates retailers to provide a unified
          customer experience on all channels, including physical store, online
          store, mobile device, social media and other channels. Omnichannel
          sales channels include mobile websites and apps, email marketing, sms,
          text messages, social media, ecommerce marketplaces, point of sale
          integration and inventory management. In Omnichannel commerce, a
          retailer is able to sell its entire product range and stock both
          online and offline at the same time. Having integrated online and
          offline channels, an Omnichannel retailer is able to provide multiple
          ways for their customers to shop from them.
        </p>
      </div>
    </div>
  );
};

export default SingleBlog;
