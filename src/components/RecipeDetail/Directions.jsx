import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import { Alert } from "react-bootstrap";
export default class Directions extends React.Component {
  render() {
    const { directions } = this.props;
    return (
      <div className="recipe-detail-inner">
        <h3>Postup:</h3>
        {directions === "" && <Alert>Žiadny pracovný postup.</Alert>}
        {directions !== null && (
          <ReactMarkdown escapeHtml={true} source={directions} />
        )}
      </div>
    );
  }
}
Directions.propTypes = {
  directions: PropTypes.string.isRequired
};
