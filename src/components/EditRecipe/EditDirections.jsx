import React from "react";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

export default class EditDirections extends React.Component {
  render() {
    const { directions } = this.props;
    return (
      <div className="recipe-edit-inner">
        <h3>Pracovný postup</h3>
        <Form>
          <Form.Group>
            <Form.Control
              id="directions"
              as="textarea"
              rows="20"
              value={directions}
              onChange={this.props.onChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

EditDirections.propTypes = {
  onChange: PropTypes.func.isRequired,
  directions: PropTypes.string
};
