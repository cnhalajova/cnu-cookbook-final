import React from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default class EditTopbar extends React.Component {
  render() {
    const { title, onSave, slug } = this.props;
    return (
      <div className="recipe-detail-wrapper">
        <h2 className="recipe-detail-title">{title}</h2>
        <div className="recipe-detail-button">
          <Button variant="info" onClick={onSave}>
            Uložiť
          </Button>
          <Button variant="danger" href={`/recipes/${slug}`}>
            Zrušiť
          </Button>
        </div>
      </div>
    );
  }
}

EditTopbar.propTypes = {
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired
};
