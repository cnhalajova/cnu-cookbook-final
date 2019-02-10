import React from "react";
import PropTypes from "prop-types";
import Ingredients from "./Ingredients";

export default class SideBar extends React.Component {
  constructor(props) {
    super(props);
    const { servingCount } = this.props;
    this.state = {
      servings: servingCount
    };
  }

  render() {
    const { servingCount, ingredients, sideDish } = this.props;
    const { servings } = this.props;
    return (
      <div className="recipe-detail-sidebar">
        <Ingredients
          ingredients={ingredients}
          originServingCount={servingCount}
          servings={servings}
        />
        {sideDish && (
          <div>
            <h3>Príloha:</h3> {sideDish}
          </div>
        )}
      </div>
    );
  }
}

SideBar.propTypes = {
  time: PropTypes.number.isRequired,
  servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  servingCount: PropTypes.number,
  ingredients: PropTypes.array,
  sideDish: PropTypes.string
};
