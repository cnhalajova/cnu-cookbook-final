import React from "react";
import PropTypes from "prop-types";
import { Table, Alert } from "react-bootstrap";

export default class Ingredients extends React.Component {
  calculateAmount = (amount, originServingCount, newServingCount) => {
    if (originServingCount === undefined) {
      return amount;
    }
    return amount ? (amount / originServingCount) * newServingCount : amount;
  };
  render() {
    const { ingredients, originServingCount, servings } = this.props;
    return (
      <div>
        <h3>Ingrediencie:</h3>

        {ingredients.length === 0 && <Alert>Žiadne ingrediencie.</Alert>}
        {ingredients.length !== 0 && (
          <Table responsive>
            <tbody>
              {ingredients.map(ingredient => {
                const { _id, name, amountUnit, amount, isGroup } = ingredient;
                return (
                  <tr key={_id}>
                    <td>
                      {this.calculateAmount(
                        amount,
                        originServingCount,
                        servings
                      )}{" "}
                      {amountUnit}
                    </td>

                    {isGroup && (
                      <td>
                        <b>{name}</b>
                      </td>
                    )}
                    {!isGroup && <td>{name}</td>}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    );
  }
}

Ingredients.propTypes = {
  ingredients: PropTypes.array,
  originServingCount: PropTypes.number,
  servings: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
