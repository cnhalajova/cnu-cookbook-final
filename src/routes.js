import React from "react";
import { Switch, Route } from "react-router";
import ApiTestPage from "./pages/ApiTest";
import NotFoundPage from "./pages/NotFound";
import RecipiesListPage from "./pages/RecipiesListPage";
import RecipesDetailPage from "./pages/RecipesDetailPage";
import EditRecipePage from "./pages/EditRecipePage";
import NewRecipePage from "./pages/NewRecipePage";

export default (
  <Switch>
    <Route exact={true} path="/" component={RecipiesListPage} />
    <Route exact={true} path="/recipes" component={RecipiesListPage} />
    <Route
      exact={true}
      path="/recipes/:slug/uprav"
      component={EditRecipePage}
    />
    <Route exact={true} path="/new-recipe" component={NewRecipePage} />
    <Route path="/recipes/:slug" component={RecipesDetailPage} />
    <Route path="/api-test" component={ApiTestPage} />
    <Route path="*" component={NotFoundPage} />
  </Switch>
);
