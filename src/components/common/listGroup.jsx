import React, { Component } from 'react';

class ListGroup extends Component {
    render() {
        const { items, textProperty, valueProperty, selectedItem, onItemSelect } = this.props;

        return (
            <ul className="list-group">
                {items.map(item => (
                    <li
                        onClick={() => onItemSelect(item)}
                        key={item[valueProperty]}
                        className={item === selectedItem ? "list-group-item active" : "list-group-item"}
                    >
                        {item[textProperty]}
                    </li>
                ))}
            </ul>
        );
    }
}

ListGroup.defaultProps = {
    textProperty: 'name',
    valueProperty: '_id'
}

export default ListGroup;