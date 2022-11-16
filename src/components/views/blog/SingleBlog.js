import React, { useEffect, useState } from "react";
import { data } from "./data";
import "./SingleBlog.scss";
import { useParams } from "react-router";
import axios from "axios";
import moment from "moment";

const SingleBlog = () => {
  console.log("SingleBlog");
  const { id } = useParams();
  const [blogData, setBlogData] = useState({});

  const getBlogDetail = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_HOST + "/storefront/blog/" + id)
      .then((res) => {
        debugger;
        setBlogData(res.data);
      })
      .catch((err) => console.log("Blog Data Error", err));
  };

  useEffect(() => {
    getBlogDetail();
  }, []);

  return (
    <div className="single-blog-container">
      <div className="header">
        <h1>Blog</h1>
        <p>{moment(blogData?.published_at).format("LL")}</p>
        <h2>{blogData?.title}</h2>
        <div className="tags">
          <div className="tag">Order Management</div>
          <div className="tag">Inventory Management</div>
        </div>
      </div>
      <div className="image">
        <img src={blogData?.thumbnail_image} />
      </div>
      <div className="description">{blogData?.content}</div>
    </div>
  );
};

export default SingleBlog;
