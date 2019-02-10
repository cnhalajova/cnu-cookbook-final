import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const getReadableTime = (time) => {
  if (time === undefined) {
    return "0min";
  }
  const hours = Math.floor(time / 60);
  const mins = time % 60;
  const preparationTimeHours = hours === 0 ? "" : `${hours}h `;
  const preparationTimeMins = mins === 0 ? "" : `${mins}min`;
  return `${preparationTimeHours}${preparationTimeMins}`;
}

export default class RecipesItem extends React.Component {


  render() {
    const { recipe } = this.props;
    const { title, slug, preparationTime, sideDish } = recipe;
    const time = getReadableTime(preparationTime);
    return (
      <div className="recipes-item">
        <Link to={`/recipes/${slug}`} style={{ textDecoration: "none" }}>
          <div
            className="recipes-inner"
            style={{
              backgroundImage: `url(https://zradelnik.jakubricar.cz/api/recipes/${slug}/image-thumb.jpg)`
            }}
          >
            <div className="recipe-inner-down">
              <h5>{title}</h5>
              <div>
                <span className="glyphicon glyphicon-time" aria-hidden="true" />{" "}
                {time}{" "}
                {sideDish && (
                  <span
                    className="glyphicon glyphicon-cutlery"
                    aria-hidden="true"
                  />
                )}{" "}
                {sideDish}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

RecipesItem.propTypes = {
  recipe: PropTypes.object.isRequired
};
