import React from 'react'
import CategoryCard from './sections/CategoryCard'
import PageBanner from '../../shared/PageBanner'
import Axios from 'axios'
import { Loader } from 'semantic-ui-react'
import { Helmet } from "react-helmet";

class CategoriesPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      catHandle: this.props.match.params.catHandle,
      categories: [],
      data: {},
      showLoader: true,
      message: ""
    }
  }

  fetchData = () => {

    Axios.get(process.env.REACT_APP_BACKEND_HOST + '/storefront/sub_category_list/' + this.state.catHandle)
      .then((response) => {
        // debugger
        // console.log(response)
        this.setState({
          categories: response.data.sub_category,
          data: response.data,
          message: response.data?.sub_category?.length ? false : " No Data Found",
          showLoader: response.data?.sub_category?.length ? false : true
        })

      })
      .catch(function (error) {
        // console.log(error)
        this.setState({ showLoader: false })

      })
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate() {

    if (this.props.match.params.catHandle != this.state.catHandle) {
      this.setState({ catHandle: this.props.match.params.catHandle }, () => { this.fetchData() })
    }
  }

  render() {
    const { categories, showLoader } = this.state

    const colorList = ['#F3EAEF', '#DAF6F8', '#EBEBEB', '#F5EFE7', '#E2EFF5', '#FEEBF3', '#FFF3DB', '#F3EAEF', '#F3EAEF', '#DAF6F8']

    return (
      <>
        <Helmet>
          <title>{this.state.data.seo_title ? (this.state.data.seo_title + " | KEES") : (this.state.data.title ? (this.state.data.title + " | KEES") : ("KEES | Best Online Shopping in Qatars"))}</title>
          <meta name="description" content={this.state.data.seo_description} />
          <meta name="keyword" content={this.state.data.seo_keywords} />
        </Helmet>
        {
          showLoader ?
            <div className="home-loader">
              <h3 className=''>{this.state.message}</h3>
              {/* <Loader active inline='centered' /> */}
            </div>
            :
            categories.length > 0 ?
              <>
                <PageBanner handle={this.state.catHandle} productsFrom={'category_handle'} />
                <div className="categories-page">
                  <div className="container-xl">
                    <div className="cat-card-wrapper">
                      {
                        categories.length > 0 ?

                          categories.map((cat, index) => {
                            const colorIndex = index % colorList.length
                            return <CategoryCard color={colorList[colorIndex]} cat={cat} />
                          })

                          : "No Categories"
                      }
                    </div>
                  </div>
                </div>
              </>
              : null
        }
      </>
    )
  }
}

export default CategoriesPage;