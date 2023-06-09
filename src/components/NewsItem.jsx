import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author, source} =
      this.props;

    return (
      <div className="card h-100 p-2">
        <img
          src={imageUrl}
          className="card-img-top"
          alt="..."
          draggable="false"
        />
        <div className="card-body">
          <h6
            className="card-title"
            style={{
              whiteSpace: "normal",
              paddingBottom: "10px",
              fontWeight: "700",
              lineHeight: "revert",
            }}
          >
            {title}
          </h6>
          <p className="card-text" style={{ display: "block" }}>
            {description}
          </p>
          <a href={newsUrl} className="btn btn-dark btn-sm" target="_blank">
            read mode
          </a>
        </div>

        <p className="card-text">
          <small className="text-body-secondary">
            By {author === null ? "Unknown" : author} at {publishedAt}
          </small>
        </p>

        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex: '1', left: '50%'}}>
          {source.name}
          <span className="visually-hidden">unread messages</span>
        </span>
      </div>
    );
  }
}

export default NewsItem;
