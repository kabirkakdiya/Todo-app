import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";
import { useEffect, useState } from "react";
import { addItemToServer, deleteItemFromServer, getItemsFromServer, markItemCompleted } from "./services/itemServices";
import TodoItem from "./components/TodoItem";
import styles from "./components/TodoItems.module.css";

function App() {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    async function loadInitialItems() {
      const initialItems = await getItemsFromServer();
      setTodoItems(initialItems)
    }
    loadInitialItems();
  }, [])

  const handleNewItem = async (itemName, itemDueDate) => {
    const item = await addItemToServer(itemName, itemDueDate)
    console.log(`New Item Added: ${itemName} Date:${itemDueDate}`);
    const newTodoItems = [
      ...todoItems,
      item
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = async (id) => {
    const deletedId = await deleteItemFromServer(id)
    const newTodoItems = todoItems.filter((item) => item.id !== deletedId);
    setTodoItems(newTodoItems);
  };

  const handleItemCheck = async (id) => {
    const item = await markItemCompleted(id);
    const updatedItems = todoItems.map((todoItem) => {
      if (todoItem.id === item.id) {
        todoItem.completed = true;
      }
      return todoItem
    })

    setTodoItems(updatedItems)
  }

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
        checkItem={handleItemCheck}
      ></TodoItems>

      <div>Completed
        <br />
        <div className={styles.itemsContainer}>
          {todoItems.map((item) => {
            if (item.completed) {
              return <TodoItem key={item.id}
                id={item.id}
                todoDate={item.dueDate}
                todoName={item.name}
                onDeleteClick={handleDeleteItem}
                checkItem={handleItemCheck}
                completed={item.completed}
              ></TodoItem>
            }
          })}
        </div>
      </div>
    </center>
  );
}

export default App;
