import React from "react";
import api from "../api/api";
import EditRecipe from "../components/EditRecipe/EditRecipe";

export default class EditRecipePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
      problem: null
    };
  }

  componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    const { params } = match;
    const { slug } = params;

    this.setState({ isLoading: true });
    api.get(`/recipes/${slug}`).then(({ data, problem }) => {
      this.setState({
        isLoading: false,
        data,
        problem
      });
    });
  }

  render() {
    const { isLoading, data, problem } = this.state;

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