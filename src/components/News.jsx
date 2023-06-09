import React, { Component } from "react";
import PropTypes from 'prop-types';
import NewsItem from "./NewsItem";
import Spinner from "./Loading";

export default class News extends Component {
  static defaultProps = {
    country: 'in', articlesPerPage: 9, category: "general",
  }

  static propTypes = {
    country: PropTypes.string,
    articlesPerPage: PropTypes.number,
    category: PropTypes.string,
  }
  
  constructor() {
    super();
    this.state = {
      articles: [],
      country: "in",
      loading: true,
      error: false,
      code: "rateLimited",
      page: 1,
    };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.country !== this.props.country) {
      this.fetchArticles();
    }
  }

  async fetchArticles() {
    this.setState({ loading: true });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.articlesPerPage}`;
    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(url);
    console.log(parsedData);

    if (parsedData.status === "error" && parsedData.code === "rateLimited") {
      this.setState({
        error: true,
      });
    } else {
      console.log("goog");
      this.setState({
        articles: parsedData.articles,
        totalArticles: parsedData.totalResults,
      });
    }

    this.setState({loading: false})

    document.title = (this.props.category[0]).toUpperCase() + this.props.category.slice(1)  + " - NewsMonkey"
  }

  handlePreviousClick = () => {
    if (this.state.page > 1) {
      this.setState(
        (prevState) => ({
          page: prevState.page - 1,
        }),
        () => {
          this.fetchArticles();
        }
      );
    }
  };

  handleNextClick = () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      () => {
        this.fetchArticles();
      }
    );
  };

  showContent = () => {
    if (this.state.error) {
      console.log("Yes Error");
      return (
        <div className="row justify-content-center p-2">
          <p>You have made too many requests recently. Developer accounts are limited to 100 requests over a 24 hour period (50 requests available every 12 hours). Please upgrade to a paid plan if you need more requests.</p>
        </div>
        )


    } else {
      console.log("No Error");

      return (
        <div className="row justify-content-center p-2">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div
                className="col-md-4"
                style={{ marginBottom: "10px", padding: "0 5px" }}
                key={element.url}
              >
                <NewsItem
                  imageUrl={
                    element.urlToImage === null
                      ? "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                      : element.urlToImage
                  }
                  title={element.title}
                  description={element.description}
                  newsUrl={element.url}
                  publishedAt={new Date(element.publishedAt).toUTCString()}
                  author={element.author}
                  source={element.source}
                ></NewsItem>
              </div>
            );
          })}
        </div>
      );
    }
  };

  render() {
    return (
      <>
        <div className="container mt-5">
          <h3 className="text-center mt-3 mb-5">NewsMonkey - Top {(this.props.category[0]).toUpperCase() + this.props.category.slice(1)} Headlines</h3>
          <div className="row justify-content-center p-2 border rounded">
            {this.state.loading && <Spinner></Spinner>}
            {this.showContent()}
          </div>

          <div className="mt-5 mb-5">
            <div className="d-flex justify-content-evenly">
              <button
                disabled={this.state.page <= 1}
                className="btn btn-dark"
                type="button"
                onClick={this.handlePreviousClick}
              >
                &larr; Previous
              </button>
              <button
                disabled={
                  this.state.page + 1 >
                  Math.ceil(
                    this.state.totalArticles / this.props.articlesPerPage
                  )
                }
                className="btn btn-dark"
                type="button"
                onClick={this.handleNextClick}
              >
                {console.log()}
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
