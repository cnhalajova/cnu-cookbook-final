import React from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import PropTypes from "prop-types";
import DraggableTable from "./DraggableTable";

export default class EditIngredients extends React.Component {
  render() {
    const { ingredients } = this.props;
    return (
      <div className="recipe-edit-inner">
        <h3>Ingrediencie</h3>
        <DraggableTable
          ingredients={ingredients}
          onDragEnd={this.props.onDragEnd}
          onDelete={this.props.handleDelete}
        />
        <Form onSubmit={this.props.onChange}>
          <Form.Label>Pridať ingredienciu</Form.Label>
          <InputGroup className="recipe-detail-wrapper">
            <Form.Control
              className="col-3"
              id="amount"
              placeholder="Množstvo"
              onChange={this.props.handleInputChange}
            />
            <Form.Control
              id="amountUnit"
              placeholder="Jednotky"
              onChange={this.props.handleInputChange}
            />
          </InputGroup>
          <InputGroup className="recipe-detail-wrapper">
            <Form.Control
              id="name"
              placeholder="Názov ingrediencie"
              onChange={this.props.handleInputChange}
            />
            <Button id="addIngredient" variant="info" type="submit">
              Pridať
            </Button>
          </InputGroup>
        </Form>
        <Form onSubmit={this.props.onChange}>
          <Form.Label>Pridať kategóriu</Form.Label>
          <InputGroup className="recipe-detail-wrapper">
            <Form.Control
              id="category"
              placeholder="Nová kategória"
              onChange={this.props.handleInputChange}
            />
            <Button id="addCategory" variant="info" type="submit">
              Pridať
            </Button>
          </InputGroup>
        </Form>
      </div>
    );
  }
}

EditIngredients.propTypes = {
  ingredients: PropTypes.array,
  servingCount: PropTypes.number,
  onChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  onDragEnd: PropTypes.func,
  handleDelete: PropTypes.func
};
