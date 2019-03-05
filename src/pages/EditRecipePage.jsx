import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EditRecipe from "../components/EditRecipe/EditRecipe";
import { fetchRecipeDetail, resetRecipeDetail } from "./RecipeDetail/actions";
import {
  getFetchError,
  getRecipeDetail,
  isRecipeLoading
} from "./RecipeDetail/reducer";

class EditRecipePage extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match, fetchRecipeDetail, resetRecipeDetail } = this.props;
    const { params, path } = match;
    const { slug } = params;

    if (slug !== undefined) {
      fetchRecipeDetail(slug);
    }
    if (path === "/new-recipe") {
      resetRecipeDetail();
    }
  }

  render() {
    const { isLoading, data, problem } = this.props;

    if (isLoading) {
      return "Loading";
    }

    if (problem) {
      return problem;
    }

    if (!data) {
      return null;
    }
    return <EditRecipe recipe={data} />;
  }
}

const mapStateToProps = state => ({
  data: getRecipeDetail(state),
  problem: getFetchError(state),
  isLoading: isRecipeLoading(state)
});

const mapDispatchToProps = {
  fetchRecipeDetail,
  resetRecipeDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipePage);

EditRecipePage.propTypes = {
  fetchRecipeDetail: PropTypes.func,
  resetRecipeDetail: PropTypes.func,
  data: PropTypes.object,
  problem: PropTypes.bool,
  isLoading: PropTypes.bool
};
