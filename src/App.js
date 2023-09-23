import "./App.css"
import { useState, useEffect, useRef } from "react"
import List from "./List"
import Alert from "./Alert"
import axios from "axios"

function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: ""
  })
  const inputEl = useRef(null)

  const addItem = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/toDos",
        {
          text: name
        },
        { "content-type": "application/json" }
      )
      setList([...list, res.data])
      setName("")
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/toDos")
        const resData = res.data
        setList(resData)
      } catch (err) {
        console.log(err)
      }
    }
    getItems()
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    addItem()

    if (!name) {
      // display alert
      showAlert(true, "danger", "Please enter value")
    } else {
      showAlert(true, "success", "Item added to the list")
      const newItem = { id: new Date().getTime().toString(), text: name }
      setList([...list, newItem])
      setName("")
    }
  }

  const resetData = async () => {
    const newList = await axios.get("http://localhost:5000/api/v1/toDos")
    setList(newList.data)
  }

  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg })
  }

  const removeItem = async id => {
    const res = await axios.delete(`http://localhost:5000/api/v1/toDos/${id}`)
    showAlert(true, "danger", "item removed")
    resetData()
  }

  const editItem = async (id, text) => {
    const res = await axios.put(`http://localhost:5000/api/v1/toDos/${id}`, {
      text
    })

    if (res.status == 200) {
      showAlert(true, "success", "item edited")
      resetData()
    } else {
      showAlert(true, "danger", "item removed")
    }
  }

  return (
    <section className="section-center">
      <form className="todo-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>Todo Items</h3>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="Organise your schedules"
            ref={inputEl}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "Edit" : "Submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List list={list} removeItem={removeItem} editItem={editItem} />
        </div>
      )}
    </section>
  )
}

export default App
