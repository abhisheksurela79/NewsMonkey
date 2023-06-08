import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import Country from './components/Country';

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  constructor() {
    super();
    this.state = {
      country: 'in' // Initialize the country property with a default value
    };
  }

  handleCountryChange = (selectedCountry) => {
    this.setState({ country: selectedCountry });
  };

  render() {
    return (
      <Router>
        <Navbar onCountryChange={this.handleCountryChange} />
        <Routes>
          <Route path="/" exact element={<News key="general" articlesPerPage={9} country={this.state.country} category="general" apiKey={this.apiKey} />}/>
          <Route path="/business" exact element={<News key="business" articlesPerPage={9} country={this.state.country} category="business" apiKey={this.apiKey} />}/>
          <Route path="/entertainment" exact element={<News key="entertainment" articlesPerPage={9} country={this.state.country} category="entertainment" apiKey={this.apiKey} />}/>
          <Route path="/health" exact element={<News key="health" articlesPerPage={9} country={this.state.country} category="health" apiKey={this.apiKey} />}/>
          <Route path="/science" exact element={<News key="science" articlesPerPage={9} country={this.state.country} category="science" apiKey={this.apiKey} />}/>
          <Route path="/sports" exact element={<News key="sports" articlesPerPage={9} country={this.state.country} category="sports" apiKey={this.apiKey} />}/>
          <Route path="/technology" exact element={<News key="technology" articlesPerPage={9} country={this.state.country} category="technology" apiKey={this.apiKey} />}/>
          {/* Add other Route components for different categories */}
        </Routes>
      </Router>
    );
  }
}
