import React from "react";
import { Form } from "react-bootstrap";
import { PropTypes } from "prop-types";
export default class EditBasicInfo extends React.Component {
  constructor(props) {
    super(props);
    const { preparationTime, servingCount, sideDish } = this.props;
    this.state = {
      preparationTime: preparationTime,
      servingCount: servingCount,
      sideDish: sideDish
    };
  }
  render() {
    const { preparationTime, servingCount, sideDish } = this.props;

    return (
      <div className="recipe-basic-info">
        <h3>Základné údaje</h3>
        <Form>
          <Form.Group>
            <Form.Label>Doba prípravy</Form.Label>
            <Form.Control
              id="preparationTime"
              type="number"
              value={preparationTime}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Počet porcií</Form.Label>
            <Form.Control
              id="servingCount"
              type="number"
              value={servingCount}
              onChange={this.props.onChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Príloha</Form.Label>
            <Form.Control
              id="sideDish"
              type="text"
              value={sideDish}
              onChange={this.props.onChange}
            />
          </Form.Group>
        </Form>
      </div>
    );
  }
}

EditBasicInfo.propTypes = {
  preparationTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  servingCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  sideDish: PropTypes.string,
  onChange: PropTypes.func
};
