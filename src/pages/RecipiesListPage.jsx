import React from "react";
import api from "../api/api";
import RecipesItem from "../components/RecipesItem/RecipesItem";
import SearchBar from "../components/SearchBar";
import { Form, Button, Row, Col } from "react-bootstrap";

export default class RecipiesListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
      problem: null,
      searchValue: "",
      isLessThan30mins: false
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
      data: null,
      problem: null
    });
    api.get("/recipes").then(({ data, problem }) => {
      this.setState({
        isLoading: false,
        data: data,
        problem: problem
      });
    });
  }

  handleChange = e => {
    this.setState({ searchValue: e.target.value });
  };

  filterRecipes = recipe => {
    const { searchValue, isLessThan30mins } = this.state;
    const { title, preparationTime } = recipe;

    const hasSubstring =
      title.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    const isInTimeFrame = !isLessThan30mins || preparationTime <= 30;
    return hasSubstring && isInTimeFrame;
  };

  handlePreparationTimeChange = () => {
    const { isLessThan30mins } = this.state;
    this.setState({ isLessThan30mins: !isLessThan30mins });
  };

  render() {
    const { data, problem, isLoading, searchValue } = this.state;
    if (isLoading) {
      return <div>Loading ...</div>;
    }

    if (problem) {
      return <div>{problem}</div>;
    }
    return (
      <React.Fragment>
        <div>
          <Row>
            <Col md={10} xs={10}>
              <SearchBar
                label="Hľadaj recepty"
                value={searchValue}
                onChange={this.handleChange}
              />
            </Col>
            <Col md={2} xs={2}>
              <Button variant="info" href="/new-recipe">
                Pridať nový recept
              </Button>
            </Col>
          </Row>
          <Form.Check
            type="checkbox"
            label="Zobraz recepty pod 30 min"
            onChange={this.handlePreparationTimeChange}
          />
        </div>
        <div className="recipes-wrapper">
          {data.filter(this.filterRecipes).map(recipe => {
            return <RecipesItem key={recipe._id} recipe={recipe} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}
