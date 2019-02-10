import React from "react";
import PropTypes from "prop-types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Button, Table } from "react-bootstrap";

export default class DraggableTable extends React.Component {
  render() {
    const { ingredients } = this.props;
    return (
      <DragDropContext onDragEnd={this.props.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div ref={provided.innerRef}>
              <Table responsive>
                <tbody>
                  {ingredients.map((item, index) => (
                    <Draggable
                      key={`key-${index}`}
                      draggableId={`key-${index}`}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <tr
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <td>
                            <span
                              className="glyphicon glyphicon-triangle-right"
                              aria-hidden="true"
                            />
                          </td>
                          <td>{item.amount} </td>
                          <td>{item.amountUnit} </td>
                          <td>{item.name}</td>
                          <td>
                            <Button
                              id={index}
                              className="recipe-item-delete"
                              variant="secondary"
                              onClick={this.props.onDelete}
                            >
                              <span
                                id={index}
                                className="glyphicon glyphicon-trash"
                                aria-hidden="true"
                              />
                            </Button>
                          </td>
                        </tr>
                      )}
                    </Draggable>
                  ))}
                </tbody>
              </Table>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

DraggableTable.propTypes = {
  ingredients: PropTypes.array,
  onDragEnd: PropTypes.func,
  onDelete: PropTypes.func
};
