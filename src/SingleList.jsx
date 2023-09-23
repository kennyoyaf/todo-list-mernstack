import React, { useState } from "react"
import { FaEdit, FaTrash } from "react-icons/fa"
import { AiOutlineSend } from "react-icons/ai"

const SingleList = ({ _id, text, removeItem, editItem }) => {
  const [newText, setNewText] = useState("")
  const [showInput, setShowInput] = useState(false)

  return (
    <article className="todo-item">
      <p className="title">{text}</p>
      {showInput && (
        <>
          <input
            type="text"
            name=""
            id=""
            value={newText}
            placeholder={text}
            onChange={e => setNewText(e.target.value)}
          />
          <AiOutlineSend
            className="cursor-pointer"
            onClick={() => {
              setShowInput(false)
              editItem(_id, newText)
            }}
          />
        </>
      )}

      <div className="btn-container">
        <button
          type="button"
          className="edit-btn"
          onClick={() => setShowInput(!showInput)}
        >
          <FaEdit />
        </button>
        <button
          type="button"
          className="delete-btn"
          onClick={() => removeItem(_id)}
        >
          <FaTrash />
        </button>
      </div>
    </article>
  )
}

export default SingleList
