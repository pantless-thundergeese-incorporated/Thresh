import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import { RiEditLine } from 'react-icons/ri';

// const Todo = ({ deleteTodo, columns, setColumns, title, text, item, index, getTodos }) => {
const Todo = ({ title, text, id, item, index, getTodos, users, handleEditModal, status_id, modalId }) => {
  const deleteTodo = async (id) => {
    console.log('deleted: ', item.id);
    await axios.delete(`/api/tasks/delete?id=${id}`);
    getTodos();
  };

  function displayUser() {
    const foundUser = users.find(user => user.id === modalId);
    if (foundUser) return <p className="text-secondary-200 text-sm font-light">Assigned to: {foundUser.firstname} {foundUser.lastname}</p>;
  }

  return (
    <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            className="bg-primary-500 hover:shadow-2xl rounded-xl min-h-[100px] mt-3 text-secondary-500 px-6 py-3 flex flex-col"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(item.id);
              }}
              className="flex items-center justify-center bg-red-300 hover:bg-red-500 px-2 rounded-lg h-7 w-7 text-primary-500 self-end -mr-4 mt-0 cursor-pointer"
            >x</div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleEditModal(title, text, id, status_id, modalId); ////////FIX
              }}
              className="flex items-center justify-center bg-blue-300 hover:bg-blue-500 px-2 rounded-md h-7 w-7 text-primary-500 self-start -ml-4 -mt-7 cursor-pointer"
            >
              <div>< RiEditLine /></div>
            </div>

            <h1 className="text-lg text-center -mt-2">{title}</h1>
            <h3 className="font-normal	 break-words text-left -mr-3">{text}</h3>
              {displayUser()}
          </div>
        );
      }}
    </Draggable>
  );
};

export default Todo;
