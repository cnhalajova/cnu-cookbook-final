import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";

export default class SearchBar extends React.Component {
  render() {
    const { label, value, onChange } = this.props;

    return (
      <React.Fragment>
        <Form.Control
          type="text"
          value={value}
          placeholder={label}
          onChange={onChange}
        />
      </React.Fragment>
    );
  }
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
