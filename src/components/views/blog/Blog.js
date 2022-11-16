import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Blog.scss";
import { Grid } from "semantic-ui-react";
import SingleBlog from "./SingleBlog";
import { data } from "./data";
import axios from "axios";
import moment from "moment";

const Blog = () => {
  const [blogList, setBlogList] = useState([]);

  const getBlog = () => {
    axios
      .get(process.env.REACT_APP_BACKEND_HOST + "/storefront/blog_list")
      .then((res) => {
        setBlogList(res.data?.results);
      })
      .catch((err) => console.log("Blog Error", err));
  };

  console.log("blogList", blogList);

  useEffect(() => {
    getBlog();
  }, []);
  return (
    <div className="blog-container">
      <div className="header">
        <h1 className="blog-heading">Blog</h1>
        <p className="blog-subheading">Welcome to the Kees Blog</p>
      </div>

      <Grid container centered columns={3}>
        {blogList?.map((item, index) => (
          <Grid.Column key={index} mobile={16} tablet={8} computer={5}>
            <Link to={`/blogs/${item.handle}`}>
              <div class="ui cards">
                <div class="card">
                  <img src={item.thumbnail_image} />

                  <div class="content">
                    <div className="upper-content">
                      <div className="tag">{item.tag}</div>
                      <div className="date">
                        {moment(item?.published_at).format("LL")}
                      </div>
                    </div>
                    <div className=" mid-content">
                      <Link class="header" to={`/blogs/${item.handle}`}>
                        {item.title}
                      </Link>
                      <div class="desc">{item.content}</div>
                    </div>
                    <div class="lower-content">
                      <Link to={`/blogs/${item.handle}`}>
                        Read more <i class="angle right icon"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </Grid.Column>
        ))}
      </Grid>
      <div className="next-button">
        <button class="ui button">
          Next <i class="angle right icon"></i>
        </button>
      </div>
    </div>
  );
};

export default Blog;
