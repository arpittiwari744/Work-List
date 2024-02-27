import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinish, setshowfinish] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  const saveToLocal = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const togglefinish = (e) => {
    setshowfinish(!showfinish);
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    settodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    settodos(newTodos);
    saveToLocal();
  };
  const handleDelete = (e, id) => {
    let newtodos = todos.filter((item) => {
      return item.id !== id;
    });
    let dele = confirm("Are you sure you want to delete this task?");
    if (dele) {
      settodos(newtodos);
    }
    saveToLocal();
  };
  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLocal();
  };
  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    saveToLocal();
  };

  return (
    <>
      <Navbar />
      <div className="first m-5 rounded-lg text-center min-h-[80vh]">
        <div className="p-4">
          <h1 className="font-bold mb-4 text-2xl underline text-[aliceblue]">
            List of My Tasks
          </h1>
          <div>
            <input
              onChange={handleChange}
              value={todo}
              className="rounded-md px-2 py-1 w-1/2 m-1"
              type="text"
              placeholder="Enter your task"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 hover:bg-violet-950 hover:text-white rounded-lg px-2 py-1 mx-2 disabled:bg-violet-500"
              disabled={todo.length <= 3}
            >
              Add Task
            </button>
          </div>
          <div className="font-bold text-lg text-[aliceblue]">
            <input
              className="mr-1"
              onChange={togglefinish}
              type="checkbox"
              checked={showfinish}
            />
            Show Finished Tasks
          </div>
          {todos.length === 0 && (
            <div className="font-bold">NO TASKS FOR TODAY</div>
          )}
          {todos.map((item) => {
            return (
              (showfinish || !item.isCompleted) && (
                <div key={item.id}>
                  <div className="tasks flex items-center justify-between mt-3 text-[aliceblue] max-md:flex-col">
                    <div className="text rounded-md px-2 py-1 mx-4 relative left-[20%] w-[47%] break-all text-left text-lg">
                      
                      <div className={item.isCompleted ? "line-through" : ""}>
                      <input
                        name={item.id}
                        className="mr-1"
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                      />{item.todo}
                      </div>
                    </div>
                    <div className="relative right-[21%] max-md:relative max-md:left-5">
                      <button
                        onClick={(e) => {
                          handleEdit(e, item.id);
                        }}
                        className="bg-violet-800 hover:bg-violet-950 hover:text-white rounded-md px-2 py-1 mx-1"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => {
                          handleDelete(e, item.id);
                        }}
                        className="bg-violet-800 hover:bg-violet-950 hover:text-white rounded-md px-2 py-1 mx-1"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
