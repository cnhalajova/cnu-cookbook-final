import React from "react";
import EditRecipe from "../components/EditRecipe/EditRecipe";

export default class NewRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Nový recept",
      preparationTime: 0,
      servingCount: 0,
      directions: "",
      slug: "",
      ingredients: []
    };
  }
  render() {
    return <EditRecipe recipe={this.state} />;
  }
}
