import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import EditTopbar from "./EditTopbar";
import EditBasicInfo from "./EditBasicInfo";
import EditIngredients from "./EditIngredients";
import EditDirections from "./EditDirections";
import PropTypes from "prop-types";
import { postRecipe } from "../../pages/RecipeDetail/actions";
import Directions from "../RecipeDetail/Directions";
import { Form } from "react-bootstrap";
import {
  getPostError,
  isRecipePosting
} from "../../pages/RecipeDetail/reducer";

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class EditRecipe extends React.Component {
  constructor(props) {
    super(props);

    const { recipe } = props;
    const originalRecipe = Object.assign({}, this.props.recipe);
    const originalTitle = originalRecipe.title;
    const originalServingCount = originalRecipe.servingCount;
    this.state = {
      newRecipe: recipe,
      newIngredient: {
        name: "",
        amount: 0,
        amountUnit: "",
        isGroup: false
      },
      originalTitle,
      originalServingCount
    };
  }

  handleChange = event => {
    const { id, value } = event.target;
    const { newRecipe } = this.state;
    newRecipe[id] = value;
    this.setState({ newRecipe });
  };

  handleIngredientsChange = event => {
    event.preventDefault();

    const { ingredients, newIngredient } = this.state;

    this.setState({
      ingredients: [...ingredients, newIngredient],
      newIngredient: {}
    });
  };

  handleInputChange = event => {
    const { newIngredient } = this.state.newIngredient;
    const { id, value } = event.target;
    newIngredient[id] = value;
    if (id === "category") {
      this.setState({
        newIngredient: {
          name: value,
          isGroup: true
        }
      });
      return;
    }
    this.setState({ newIngredient });
  };

  handleDelete = event => {
    const { id } = event.target;
    const { ingredients } = this.state;

    const updatedIngredientList = ingredients.filter(
      ingredient => ingredient.id !== id
    );

    this.setState({ ingredients: updatedIngredientList });
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

  handleSave = event => {
    const { recipe, postRecipe } = this.props;
    const { newRecipe } = this.state;
    const { _id } = recipe;

    //make POST request for /api/recipes/:_id
    let id = _id === undefined ? "" : _id;
    postRecipe(id, newRecipe).then(response => {
      //redirect
      // eslint-disable-next-line react/prop-types
      this.props.history.push({
        pathname: `/recipes/${response.payload.slug}`
      });
    });
  };

  render() {
    const { originalTitle, originalServingCount, newRecipe } = this.state;
    const {
      title,
      ingredients,
      servingCount,
      directions,
      preparationTime,
      sideDish,
      slug
    } = newRecipe;

    return (
      <div>
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

const mapStateToProps = state => ({
  error: getPostError(state),
  isPosting: isRecipePosting(state)
});
const mapDispatchToProps = {
  postRecipe
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditRecipe)
);

EditRecipe.propTypes = {
  postRecipe: PropTypes.func,
  recipe: PropTypes.object,
  isPosting: PropTypes.bool,
  error: PropTypes.object
};
