function TodoItem({ id, todoName, todoDate, onDeleteClick, checkItem, completed }) {
  return (
    <div className="container">
      <div className="row kg-row">
        <div className="col-1">

          <input type="checkbox" checked={completed} onChange={() => checkItem(id)} />
        </div>
        <div className="col-5">{todoName}</div>
        <div className="col-4">{todoDate}</div>
        <div className="col-2">
          <button
            type="button"
            className="btn btn-danger kg-button"
            onClick={() => onDeleteClick(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
