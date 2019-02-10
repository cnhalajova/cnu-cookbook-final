import React, { Component } from "react";
import PropTypes from "prop-types";
import { Container } from "react-bootstrap";
import AppNavbar from "../components/AppNavbar/AppNavbar";
import AppFooter from "../components/AppFooter/AppFooter";

class MainLayout extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  render() {
    return (
      <div>
        <AppNavbar />
        <Container>
          {this.props.children}
          <AppFooter />
        </Container>
      </div>
    );
  }
}

export default MainLayout;
