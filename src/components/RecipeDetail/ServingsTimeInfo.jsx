import React from "react";
import { Form } from "react-bootstrap";
import { getReadableTime } from "../RecipesItem/RecipesItem";
import { PropTypes } from "prop-types";

export default class ServingsTimeInfo extends React.Component {
  render() {
    const { time, servings } = this.props;
    return (
      <div className="recipe-detail-wrapper">
        <div className="recipe-info">
          <span className="glyphicon glyphicon-time" aria-hidden="true" />
          {"  "}
          {getReadableTime(time)}
        </div>
        {servings !== undefined && (
          <div className="recipe-info2">
            <Form.Label className="recipe-info">Porcie:</Form.Label>
            <Form.Control
              type="input"
              id="basic-url"
              aria-describedby="inputGroupPrepend"
              onChange={this.props.onChange}
              value={servings}
            />
          </div>
        )}
      </div>
    );
  }
}

ServingsTimeInfo.propTypes = {
  time: PropTypes.number,
  servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired
};
