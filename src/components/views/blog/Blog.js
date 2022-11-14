import React from "react";
import { Link } from "react-router-dom";
import "./Blog.scss";
import { Grid } from "semantic-ui-react";
import SingleBlog from "./SingleBlog";
import { data } from "./data";

const Blog = () => {
  return (
    <div className="blog-container">
      <div className="header">
        <h1 className="blog-heading">Blog</h1>
        <p className="blog-subheading">Welcome to the Kees Blog</p>
      </div>

      <Grid container centered columns={3}>
        {data?.map((item) => (
          <Grid.Column mobile={16} tablet={8} computer={5}>
            <Link to={`/blogs/${item.id}`}>
              <div class="ui cards">
                <div class="card">
                  <img src={item.img} />

                  <div class="content">
                    <div className="upper-content">
                      <div className="tag">{item.tag}</div>
                      <div className="date">{item.date}</div>
                    </div>
                    <div className=" mid-content">
                      <Link class="header" to={`/blog/${item.id}`}>
                        {item.title}
                      </Link>
                      <div class="desc">{item.desc}</div>
                    </div>
                    <div class="lower-content">
                      <Link to={`/blog/${item.id}`}>
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
