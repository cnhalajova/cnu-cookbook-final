import React from "react";
import PropTypes from "prop-types";
import SideBar from "./SideBar";
import Directions from "./Directions";
import { Button, Alert } from "react-bootstrap";
import api from "../../api/api";
import ServingsTimeInfo from "./ServingsTimeInfo";

export default class RecipeDetail extends React.Component {
  constructor(props) {
    super(props);
    const { servingCount } = this.props.recipe;
    this.state = {
      show: false,
      variant: "",
      msg: "",
      servings: servingCount
    };
  }

  handleDeleteRecipe = () => {
    const { _id } = this.props.recipe;
    api.delete(`/recipes/${_id}`).then(({ problem }) => {
      if (problem === null) {
        // show success alert
        this.setState({
          show: true,
          variant: "success",
          msg: "Recept bol úspešne zmazaný."
        });
      } else {
        // show error alert
        this.setState({
          show: true,
          variant: "danger",
          msg: "Recept sa nepodarilo zmazať."
        });
      }
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
    const { show, variant, msg, servings } = this.state;
    return (
      <div>
        {show && (
          <Alert show={show} variant={variant} fade={false}>
            {msg}
          </Alert>
        )}

        <div className="recipe-detail-wrapper">
          <h2 className="recipe-detail-title">{title}</h2>
          <div className="recipe-detail-button">
            <Button variant="info" href={`/recipes/${slug}/uprav`}>
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

RecipeDetail.propTypes = {
  recipe: PropTypes.object.isRequired
};
