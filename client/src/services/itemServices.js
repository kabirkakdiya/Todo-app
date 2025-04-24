export const addItemToServer = async (task, date) => {
    const response = await fetch('http://localhost:3000/api/todo', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, date })
    });
    const item = await response.json()
    return mapServerItemToLocalItem(item);
}

export const getItemsFromServer = async () => {
    const response = await fetch('http://localhost:3000/api/todo')
    const items = await response.json();
    return items.map(mapServerItemToLocalItem)
}
export const markItemCompleted = async (id) => {
    const response = await fetch(`http://localhost:3000/api/todo/${id}/completed`, { method: 'PUT' })
    const item = await response.json();
    return mapServerItemToLocalItem(item)
}

export const deleteItemFromServer = async (id) => {
    await fetch(`http://localhost:3000/api/todo/${id}`, { method: 'DELETE' })
    return id
}

const mapServerItemToLocalItem = (serverItem) => {
    const { _id, task, date, completed, createdAt, updatedAt } = serverItem;
    return {
        id: _id,
        name: task,
        dueDate: date,
        completed,
        createdAt,
        updatedAt
    }
}