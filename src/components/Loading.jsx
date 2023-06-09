import React, { Component } from "react";
import "./spinner.css";

export default class Loading extends Component {
  render() {
    return (
      <div className="spinner-wave">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
}
