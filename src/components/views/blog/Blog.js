import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Blog.scss";
import { Grid } from "semantic-ui-react";
// import SingleBlog from "./SingleBlog";
import axios from "axios";
import moment from "moment";
import Parser from "html-react-parser";
// import KeesLoader from "../../shared/KeesLoader";

const Blog = () => {
  const [blogList, setBlogList] = useState([]);
  const [activePageIndex, setActivePageIndex] = useState(1);
  const [activeCatPageIndex, setActiveCatPageIndex] = useState(1);
  const [showNextBtn, setShowNextBtn] = useState(true);
  const [showNoBlog, setShowNoBlog] = useState(false);
  const [blogCategory, setBlogCategory] = useState(null);

  const { category_id } = useParams();

  const getBlog = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_HOST +
        `/storefront/blog_list?page=${activePageIndex}&limit=6`
      )
      .then((res) => {
        setBlogList(res.data?.results);
        setActivePageIndex(activePageIndex + 1);
        if (res.data?.results.length === 0) {
          setTimeout(() => {
            setShowNoBlog(true);
          }, 1000);
        }
      })
      .catch((err) => {
        console.log("Blog Error", err);
      });
  };

  const fetchMoreBlog = () => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_HOST +
        `/storefront/blog_list?page=${activePageIndex}&limit=6`
      )
      .then((res) => {
        setBlogList(res.data?.results);
        setActivePageIndex(activePageIndex + 1);
      })
      .catch((err) => {
        if (err.response.status !== 200) {
          setShowNextBtn(false);
        }
        console.log("Blog Error", err);
      });
  };

  const fetchBlogByCategory = (blog_category_id, isTag) => {
    setShowNextBtn(true);
    setBlogCategory(blog_category_id);
    axios
      .get(
        process.env.REACT_APP_BACKEND_HOST +
        `/storefront/blog_list?category_id=${blog_category_id}&page=${activeCatPageIndex}&limit=6`
      )
      .then((res) => {
        setActiveCatPageIndex(activeCatPageIndex + 1);
        setBlogList(res.data?.results);
      })
      .catch((err) => {
        if (err.response.status !== 200 && isTag === true) {
          setShowNextBtn(false);
        }
        console.log("Blog Category Error", err);
      });
  };

  useEffect(() => {
    getBlog();
    if (category_id) {
      fetchBlogByCategory(category_id);
    }
  }, []);

  return (
    <div className="blog-container">
      <div className="header">
        <h1 className="blog-heading">Blog</h1>
        <p className="blog-subheading">Welcome to the Kees Blog</p>
      </div>
      {!showNoBlog ? (
        <Grid container centered columns={3}>
          {blogList?.map((item, index) => (
            <Grid.Column key={index} mobile={16} tablet={8} computer={5}>
              {/* <Link to={`/blogs/${item.handle}`}> */}
              <div className="ui cards">
                <div className="card">
                  <img src={item.thumbnail_image} />

                  <div className="content">
                    <div className="upper-content">
                      <div
                        className="tag"
                        onClick={() => {
                          fetchBlogByCategory(item.blog_category_id, false);
                        }}
                      >
                        {item.blog_category_title}
                      </div>
                      <div className="date">
                        {moment(item?.published_at).format("LL")}
                      </div>
                    </div>
                    <div className=" mid-content">
                      <Link className="header" to={`/blogs/${item.handle}`}>
                        {item.title}
                      </Link>
                      <div className="desc">{Parser(item.content)}</div>
                    </div>
                    <div className="lower-content">
                      <Link to={`/blogs/${item.handle}`}>
                        Read more <i className="angle right icon"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Link> */}
            </Grid.Column>
          ))}
        </Grid>
      ) : (
        <p className="no-blog">No Blogs Available</p>
      )}

      {blogList?.length === 0 && !showNextBtn && (
        <p className="no-blog">No Blogs Available</p>
      )}

      {showNextBtn && blogList?.length >= 6 && (
        <div className="next-button">
          <button
            className="ui button"
            onClick={() => {
              if (activeCatPageIndex === 1) {
                fetchMoreBlog();
              } else {
                fetchBlogByCategory(blogCategory, true);
              }
            }}
          >
            Next <i className="angle right icon"></i>
          </button>
        </div>
      )}
      {!showNextBtn && <p className="no-blog">No More Blogs Available!</p>}
    </div>
  );
};

export default Blog;
