import React, { Component } from "react";
import { Alert } from "react-bootstrap";

class NotFoundPage extends Component {
  render() {
    return (
      <div>
        <h1>404</h1>
        <Alert bsStyle="warning">
          This is not the page you are looking for.
        </Alert>
      </div>
    );
  }
}

export default NotFoundPage;
