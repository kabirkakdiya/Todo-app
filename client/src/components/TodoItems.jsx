import TodoItem from "./TodoItem";
import styles from "./TodoItems.module.css";

const TodoItems = ({ todoItems, onDeleteClick, checkItem }) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => {
        if (!item.completed) {
          return <TodoItem key={item.id}
            id={item.id}
            todoDate={item.dueDate}
            todoName={item.name}
            onDeleteClick={onDeleteClick}
            checkItem={checkItem}
            completed={item.completed}
          ></TodoItem>
        }
      })}
    </div>
  );
};

export default TodoItems;
