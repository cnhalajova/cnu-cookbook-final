import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import SideBar from "./SideBar";
import Directions from "./Directions";
import { Button } from "react-bootstrap";
import { deleteRecipe } from "../../pages/RecipeDetail/actions";
import ServingsTimeInfo from "./ServingsTimeInfo";

class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    const { servingCount } = this.props.recipe;
    this.state = {
      servings: servingCount
    };
  }

  handleDeleteRecipe = () => {
    const { deleteRecipe, recipe } = this.props;
    const { _id } = recipe;
    deleteRecipe(_id);

    //redirect
    // eslint-disable-next-line react/prop-types
    this.props.history.push({
      pathname: `/recipes`
    });
  };

  handleChange = event => {
    this.setState({ servings: event.target.value });
  };

  render() {
    const { recipe } = this.props;
    const {
      title,
      preparationTime,
      directions,
      servingCount,
      ingredients,
      sideDish,
      slug
    } = recipe;
    const { servings } = this.state;
    return (
      <div>
        <div className="recipe-detail-wrapper">
          <h2 className="recipe-detail-title">{title}</h2>
          <div className="recipe-detail-button">
            <Button variant="info" href={`/recipes/${slug}/edit`}>
              Upraviť
            </Button>
            <Button variant="danger" onClick={this.handleDeleteRecipe}>
              Vymazať
            </Button>
          </div>
        </div>
        <ServingsTimeInfo
          time={preparationTime}
          servings={servings}
          onChange={this.handleChange}
        />
        <div className="recipe-detail-wrapper">
          <SideBar
            time={preparationTime}
            servingCount={servingCount}
            servings={servings}
            ingredients={ingredients}
            sideDish={sideDish}
          />
          <Directions directions={directions} />
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = {
  deleteRecipe
};

export default withRouter(
  connect(
    undefined,
    mapDispatchToProps
  )(RecipeDetail)
);

RecipeDetail.propTypes = {
  deleteRecipe: PropTypes.func,
  recipe: PropTypes.object.isRequired
};
