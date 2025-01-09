import { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

const localData = () => {
  let list = localStorage.getItem("data");
  if (list) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return [];
  }
};

const App = () => {
  const [input, setInput] = useState("");
  const [item, setItem] = useState(localData());
  const [toggleBtn, setToggleBtn] = useState(true);
  const [isEdit, setIsEdit] = useState(null);

  const removeAll = () => {
    setItem([]);
  };

  const deleteData = (id) => {
    const updateItem = item.filter((val) => val.id !== id);
    setItem(updateItem);
  };

  const editData = (id) => {
    let newData = item.find((elem) => elem.id === id);
    setToggleBtn(false);
    setInput(newData.name);
    setIsEdit(id);
  };

  const toggleStrikethrough = (id) => {
    setItem(
      item.map((task) => {
        if (task.id === id) {
          return { ...task, isStrikethrough: !task.isStrikethrough };
        }
        return task;
      })
    );
  };

  const itemsAdded = () => {
    if (!input) {
      alert("Please fill in the input box.");
    } else if (input && !toggleBtn) {
      setItem(
        item.map((elem) => {
          if (elem.id === isEdit) {
            return { ...elem, name: input };
          }
          return elem;
        })
      );
      setToggleBtn(true);
      setInput("");
      setIsEdit(null);
    } else {
      const inputData = {
        id: new Date().getTime().toString(),
        name: input,
        isStrikethrough: false,
      };
      setItem([...item, inputData]);
      setInput("");
    }
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(item));
  }, [item]);

  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] w-full h-screen flex flex-col items-center">
      {/* Fixed Header */}
      <header className="fixed top-0 w-full bg-[#0f172a] z-10 shadow-lg text-center py-4">
        <h1 className="text-3xl font-bold text-white">To-Do List App</h1>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center w-full max-w-lg mt-32 px-6">
        {/* Input and Add/Edit Button */}
        <div className="flex items-center space-x-2 mb-6 w-full">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow px-4 py-3 rounded-lg text-lg font-medium shadow-md bg-gray-900 text-white outline-none placeholder-gray-400"
            placeholder="Add a new task..."
          />
          {toggleBtn ? (
            <GrAdd
              onClick={itemsAdded}
              className="text-white bg-green-600 p-3 rounded-full cursor-pointer shadow-md hover:bg-green-700 transition-all"
            />
          ) : (
            <AiFillEdit
              onClick={itemsAdded}
              className="text-white bg-blue-600 p-3 rounded-full cursor-pointer shadow-md hover:bg-blue-700 transition-all"
            />
          )}
        </div>

        {/* Task List with Scroll */}
        <div className="w-full max-h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {item.map((val) => (
            <div
              key={val.id}
              className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <h1
                className={`flex-grow text-lg font-semibold cursor-pointer truncate ${
                  val.isStrikethrough
                    ? "line-through text-gray-500"
                    : "text-white"
                }`}
                onClick={() => toggleStrikethrough(val.id)}
              >
                {val.name}
              </h1>
              <div className="flex items-center space-x-3">
                <AiFillEdit
                  className="cursor-pointer text-blue-500 hover:text-blue-600 text-2xl"
                  onClick={() => editData(val.id)}
                />
                <AiFillDelete
                  className="cursor-pointer text-red-500 hover:text-red-600 text-2xl"
                  onClick={() => deleteData(val.id)}
                />
              </div>
            </div>
          ))}
        </div>


        {/* Remove All Button */}
        {item.length > 0 && (
          <button
            onClick={removeAll}
            className="mt-8 w-full py-3 text-white font-bold bg-red-600 rounded-lg shadow-md hover:bg-red-700 transition-all"
          >
            Remove All
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
