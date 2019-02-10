import React from "react";
import EditTopbar from "./EditTopbar";
import EditBasicInfo from "./EditBasicInfo";
import EditIngredients from "./EditIngredients";
import EditDirections from "./EditDirections";
import PropTypes from "prop-types";
import api from "../../api/api";
import Directions from "../RecipeDetail/Directions";
import { Alert, Form } from "react-bootstrap";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default class EditRecipe extends React.Component {
  constructor(props) {
    super(props);
    const { recipe } = this.props;
    const {
      title,
      ingredients,
      servingCount,
      directions,
      preparationTime,
      sideDish,
      slug
    } = recipe;
    this.state = {
      title,
      ingredients,
      servingCount,
      directions,
      preparationTime,
      sideDish,
      slug,
      newIngredient: {
        name: "",
        amount: 0,
        amountUnit: "",
        isGroup: false
      },
      show: false,
      variant: "",
      msg: ""
    };
  }
  handleChange = e => {
    const { id, value } = e.target;
    switch (id) {
      case "title":
        this.setState({ title: value });
        break;
      case "servingCount":
        this.setState({ servingCount: value });
        break;
      case "directions":
        this.setState({ directions: value });
        break;
      case "preparationTime":
        this.setState({ preparationTime: value });
        break;
      case "sideDish":
        this.setState({ sideDish: value });
        break;
      default:
        break;
    }
  };

  handleIngredientsChange = e => {
    e.preventDefault();

    const { ingredients, newIngredient } = this.state;
    let newIngredients = ingredients;
    newIngredients.push(newIngredient);
    this.setState({ ingredients: newIngredients, newIngredient: {} });
  };

  handleInputChange = e => {
    const { name, amount, amountUnit } = this.state.newIngredient;
    const { id, value } = e.target;
    switch (id) {
      case "amount":
        this.setState({
          newIngredient: {
            amount: value,
            amountUnit: amountUnit,
            name: name,
            isGroup: false
          }
        });
        break;
      case "unit":
        this.setState({
          newIngredient: {
            amount: amount,
            amountUnit: value,
            name: name,
            isGroup: false
          }
        });
        break;
      case "ingredientname":
        this.setState({
          newIngredient: {
            amount: amount,
            amountUnit: amountUnit,
            name: value,
            isGroup: false
          }
        });
        break;
      case "categoryname":
        this.setState({
          newIngredient: {
            name: value,
            isGroup: true
          }
        });
        break;
      default:
        break;
    }
  };

  handleDelete = e => {
    const { id } = e.target;
    const { ingredients } = this.state;
    let reorderedList = ingredients;
    reorderedList.splice(id, 1);
    this.setState({ ingredients: reorderedList });
  };

  onDragEnd = result => {
    // the only one that is required
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const ingredients = reorder(
      this.state.ingredients,
      result.source.index,
      result.destination.index
    );

    this.setState({
      ingredients
    });
  };

  handleSave = e => {
    const { _id } = this.props.recipe;
    const {
      title,
      ingredients,
      servingCount,
      directions,
      preparationTime,
      sideDish
    } = this.state;
    const editedRecipe = {
      title,
      ingredients,
      servingCount,
      directions,
      preparationTime,
      sideDish
    };

    //make POST request for /api/recipes/:_id
    const id = _id === undefined ? "" : _id;
    api.post(`/recipes/${id}`, editedRecipe).then(({ problem }) => {
      if (problem === null) {
        // show success alert
        this.setState({
          show: true,
          variant: "success",
          msg: "Recept bol úspešne uložený."
        });
      } else {
        // show error alert
        this.setState({
          show: true,
          variant: "danger",
          msg: "Recept sa nepodarilo uložiť."
        });
      }
    });
  };

  render() {
    const {
      title,
      ingredients,
      servingCount,
      directions,
      preparationTime,
      sideDish,
      slug,
      variant,
      msg,
      show
    } = this.state;
    const originalTitle = this.props.recipe.title;
    const originalServingCount = this.props.recipe.servingCount;
    return (
      <div>
        {show && <Alert variant={variant}>{msg}</Alert>}
        <EditTopbar
          title={originalTitle}
          slug={slug}
          onSave={this.handleSave}
        />
        <Form.Control
          id="title"
          type="text"
          value={title}
          onChange={this.handleChange}
          required
        />
        <div className="recipe-detail-wrapper">
          <EditBasicInfo
            preparationTime={preparationTime}
            servingCount={servingCount}
            sideDish={sideDish}
            onChange={this.handleChange}
          />
          <EditIngredients
            ingredients={ingredients}
            servingCount={originalServingCount}
            onChange={this.handleIngredientsChange}
            handleInputChange={this.handleInputChange}
            onDragEnd={this.onDragEnd}
            handleDelete={this.handleDelete}
          />
          <EditDirections
            directions={directions}
            onChange={this.handleChange}
          />
        </div>
        <h2>Náhľad postupu</h2>
        <Directions directions={directions} />
      </div>
    );
  }
}

EditRecipe.propTypes = {
  recipe: PropTypes.object
};
