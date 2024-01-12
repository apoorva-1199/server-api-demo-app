import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
import "./App.css";

class App extends Component {
  render() {
    const { theme } = this.props;
    return (
      <Router>
        <AppRoutes theme={theme} />
      </Router>
    );
  }
}

export default App;
