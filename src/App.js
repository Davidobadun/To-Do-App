import React, { useState, useEffect } from 'react';
import './App.css';

import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { BsCheckLg } from "react-icons/bs";

function App() {
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allListItems, setListItems] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedItems, setCompletedItems] = useState([]);
  const [currentEdit, setCurrentEdit] = useState([]);
  const [currentEditedItem, setCurrentEditeditem] = useState([]);

  const handleAddTodo = () => {
    if (!newTitle.trim() || !newDescription.trim()) {
      alert("Please enter both a title and description.");
      return;
    }
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
    let newTodoItem = {
      id: Date.now(),
      title: capitalize(newTitle.trim()),
      description: newDescription.trim(),
      completed: false
    };

    let updatedTodoArr = [...allListItems];
    updatedTodoArr.push(newTodoItem);
    setListItems(updatedTodoArr);

    //prevent clearing on refresh
    //need to stringify array/object for localstorage
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))

    //clear inputs
    setNewTitle("");
    setNewDescription("");
  }

  //Delete Item function
  const handleDeleteTodoItem = (id) => {
    let reducedTodoList = allListItems.filter(item => item.id !== id);
    setListItems(reducedTodoList)
    //remove from local storage
    localStorage.setItem("todolist", JSON.stringify(reducedTodoList));
  }

  //Date Time function
  const formatDateTime = () => {
    const now = new Date();
    return `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()} at ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  };

  //completed function
  const handleCompleteTodoItem = (id) => {

    let itemToComplete = allListItems.find(item => item.id === id);
    if (!itemToComplete) return;

    const completedItem = {
      ...itemToComplete,
      completedOn: formatDateTime()
    };

    let updatedCompletedArr = [...completedItems, completedItem];
    let updatedList = allListItems.filter(item => item.id !== id);

    setListItems(updatedList);
    setCompletedItems(updatedCompletedArr);

    localStorage.setItem("todolist", JSON.stringify(updatedList));
    localStorage.setItem("completedListItems", JSON.stringify(updatedCompletedArr));
  }

  const handleDeleteCompletedTodoItem = (id) => {
    let updatedCompleted = completedItems.filter(item => item.id !== id);
    setCompletedItems(updatedCompleted)
    //remove from local storage
    localStorage.setItem("completedListItems", JSON.stringify(updatedCompleted));

  }

  useEffect(() => {
    //convert string from local storage into array
    let savedTodoList = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodoList = JSON.parse(localStorage.getItem('completedListItems'));
    if (savedTodoList) {
      setListItems(savedTodoList)
    }
    if (savedCompletedTodoList) {
      setCompletedItems(savedCompletedTodoList);
    }
  }, []);

  //edit function
  const handleEdit = (id) => {
    const itemToEdit = allListItems.find(item => item.id === id);
    setCurrentEdit(id);
    setCurrentEditeditem({ ...itemToEdit });
  }

  const handleUpdateTitle = (value) => {
    setCurrentEditeditem((prev) => {
      return { ...prev, title: value }
    });
  }
  const handleUpdateDescription = (value) => {
    setCurrentEditeditem(prev => ({ ...prev, description: value }));
  };

  const handleSaveEdit = () => {
    const updatedList = allListItems.map(item =>
      item.id === currentEdit ? currentEditedItem : item
    );

    setListItems(updatedList);
    setCurrentEdit("");
    setCurrentEditeditem({});

    // Also save to local storage
    localStorage.setItem("todolist", JSON.stringify(updatedList));
  };

  return (
    <div className="App">

      <h1>My To Do List</h1>

      <div className='todo-wrapper'>
        <div className='todo-input'>
          <div className='todo-input-item'>
            <label>Title:</label>
            <input type="text" value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              id='taskTitle' placeholder='Enter your task name' autoFocus>
            </input>
          </div>
          <div className='todo-input-item'>
            <label>Description:</label>
            <input type="text" id='taskDescription'
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder='Describe your task' >
            </input>
          </div>
          <div className='todo-input-item'>
            <button type='button' className='primaryButton'
              onClick={handleAddTodo}>
              Add
            </button>
          </div>

        </div>


        <div className='button-area'>
          <button className={`secondaryButton ${!isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(false)}>
            ToDo
          </button>

          <button className={`secondaryButton ${isCompleteScreen && 'active'}`}
            onClick={() => setIsCompleteScreen(true)}>
            Completed
          </button>

        </div>
        <div className='todo-list'>

          {isCompleteScreen === false && allListItems.map((item, index) => {
            if (currentEdit === item.id) {
              return (
                <div className='edit-wrapper' key={item.id}>
                  <input placeholder='Updated Title'
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    value={currentEditedItem.title} />

                  <textarea placeholder='Updated Description' rows={4}
                    onChange={(e) => handleUpdateDescription(e.target.value)}
                    value={currentEditedItem.description} />

                  <button type='button' className='primaryButton'
                    onClick={handleSaveEdit}>
                    Update
                  </button>
                </div>
              )

            } else {
              return (
                <div className='todo-list-item' key={item.id}>
                  <div>
                    <h3> {item.title} </h3>
                    <p> {item.description} </p>
                  </div>

                  <div>
                    <AiOutlineDelete className='icon'
                      onClick={() => handleDeleteTodoItem(item.id)} title="Delete?" />
                    <BsCheckLg className='check-icon'
                      onClick={() => handleCompleteTodoItem(item.id)} title="Completed?" />

                    <AiOutlineEdit className='check-icon'
                      onClick={() => handleEdit(item.id)} title="Edit?" />
                  </div>
                </div>

              )
            }

          })}

          {isCompleteScreen === true && completedItems.map((item, index) => {
            return (
              <div className='todo-list-item' key={item.id}>
                <div>
                  <h3> {item.title} </h3>
                  <p> {item.description} </p>
                  <p><small>Completed On: {item.completedOn}</small> </p>
                </div>

                <div>
                  <AiOutlineDelete className='icon'
                    onClick={() => handleDeleteCompletedTodoItem(item.id)} title="Delete?" />

                </div>
              </div>

            )
          })}




        </div>
      </div>
    </div>
  );
}

export default App;
