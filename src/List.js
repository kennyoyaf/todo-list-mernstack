import React from "react"
import SingleList from "./SingleList"

const List = ({ list, removeItem, editItem }) => {
  return (
    <div className="todo-list">
      {list.map((item, i) => (
        <SingleList
          key={i}
          {...item}
          removeItem={removeItem}
          editItem={editItem}
        />
      ))}
    </div>
  )
}

export default List
