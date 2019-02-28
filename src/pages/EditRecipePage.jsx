import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import EditRecipe from "../components/EditRecipe/EditRecipe";
import { fetchRecipeDetail } from "./RecipeDetail/actions";
import {
  getError,
  getRecipeDetail,
  isRecipeLoading
} from "./RecipeDetail/reducer";

class EditRecipePage extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match, fetchRecipeDetail } = this.props;
    const { params } = match;
    const { slug } = params;

    fetchRecipeDetail(slug);
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
  problem: getError(state),
  isLoading: isRecipeLoading(state)
});

const mapDispatchToProps = {
  fetchRecipeDetail
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditRecipePage);

EditRecipePage.propTypes = {
  fetchRecipeDetail: PropTypes.func,
  data: PropTypes.object,
  problem: PropTypes.bool,
  isLoading: PropTypes.bool
};
