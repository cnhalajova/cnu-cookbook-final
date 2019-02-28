import React from "react";
import { Switch, Route, Redirect } from "react-router";
import ApiTestPage from "./pages/ApiTest";
import RecipesListPage from "./pages/RecipesList/RecipesListPage";
import RecipesDetailPage from "./pages/RecipeDetail/RecipesDetailPage";
import EditRecipePage from "./pages/EditRecipePage";
import NewRecipePage from "./pages/NewRecipePage";

export default (
  <Switch>
    <Route exact={true} path="/recipes" component={RecipesListPage} />
    <Route exact={true} path="/recipes/:slug" component={RecipesDetailPage} />
    <Route path="/recipes/:slug/uprav" component={EditRecipePage} />
    <Route path="/new-recipe" component={NewRecipePage} />
    <Route path="/api-test" component={ApiTestPage} />
    <Redirect from="*" to="/recipes" />
  </Switch>
);
