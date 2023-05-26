import React, { useEffect, useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Todo from './Todo.jsx';
import Modal from './Modal.jsx';
import axios from 'axios';

const Column = ({ colName, droppableId, column, getTodos, users, userId }) => {
  // console.log('column items: ', column.items);
  const [newTodo, setNewTodo] = useState({
    title: '',
    text: '',
    userId: userId,
  });
  const [modalActive, setModalActive] = useState(false);
  const [modalEdit, setModalEdit] = useState({
    active: false,
    title: '',
    text: '',
    userId: userId
  });


  const handleOpenModal = (modalEdit) => {
    setModalActive(true);
    if (modalEdit) setModalEdit(true);
  };

  const handleEditModal = (title, text, id, status_id, user_id) => {
    const editObj = { active: true, title, text, id, status_id, user_id };
    setModalEdit(editObj);
  }

  const handleCloseModal = () => {
    setModalActive(false);
    if (modalEdit.active) setModalEdit({ ...modalEdit, active: false });
  };

  const handleSubmit = async (e, editTitle, editText, editId) => {
    console.log('editTitle ', editTitle);
    console.log('modalEdit: ', modalEdit);

    try {
      e.preventDefault();
      if (!modalEdit.active) {
        const response = await axios.post('/api/tasks/create', {
          title: newTodo.title,
          text: newTodo.text,
          user_id: newTodo.userId
          // user: newTodo.user
        });       //CLOSE NEW TODO MODAL
        setNewTodo((todo) => ({ ...todo, title: '', text: '', userId: userId }));
        //REFRESH 
        getTodos();
        handleCloseModal();
      }
      else {
        const statusId = column.items.find(item => item.id === editId).status_id;
        const response = await axios.patch('/api/tasks/update', {
          title: newTodo.title,
          text: newTodo.text,
          user_id: newTodo.userId,
          id: editId,
          status_id: statusId
        });       //CLOSE NEW TODO MODAL
        getTodos();
        handleCloseModal();
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleTodoTitle = (e) => {
    setNewTodo((todo) => ({ ...todo, title: e.target.value }));
  };

  const handleTodoText = (e) => {
    setNewTodo((todo) => ({ ...todo, text: e.target.value }));
  };

  const handleDropdown = (e) => {

    setNewTodo((todo) => ({ ...todo, userId: e.target.value }));
  };

  return (
    <Droppable droppableId={droppableId} key={droppableId}>
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="bg-secondary-500 rounded-xl px-5 py-3 text-primary-500 h-full overflow-y-auto"
          >
            <div className="text-lg">
              {colName}{' '}
              {colName === 'To Do' && (
                <span
                  onClick={handleOpenModal}
                  className="bg-tertiary-500 text-primary-500 rounded-lg px-2 text-xl ml-3 hover:bg-opacity-75 cursor-pointer"
                >
                  +
                </span>
              )}
              {(modalActive || modalEdit.active) && (
                <Modal
                  newTodo={newTodo}
                  handleCloseModal={handleCloseModal}
                  handleTodoTitle={handleTodoTitle}
                  handleTodoText={handleTodoText}
                  handleSubmit={handleSubmit}
                  handleDropdown={handleDropdown}
                  getTodos={getTodos}
                  users={users}
                  editActive={modalEdit.active}
                  editTitle={modalEdit.title}
                  editText={modalEdit.text}
                  editId={modalEdit.id}
                // editStatusId={modalEdit.status_id}

                />
              )}
            </div>
            {column.items?.map((item, index) => {
              return (
                <Todo
                  key={item.id}
                  item={item}
                  index={index}
                  title={item.title}
                  text={item.text}
                  id={item.id}
                  status_id={item.status_id}
                  getTodos={getTodos}
                  users={users}
                  modalId={item.user_id}
                  handleEditModal={handleEditModal}

                // user={item.user}
                />
              );
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

export default Column;
