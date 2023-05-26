import React, { useState } from 'react';

const Modal = ({
  newTodo,
  handleCloseModal,
  handleTodoTitle,
  handleTodoText,
  handleSubmit,
  handleDropdown,
  getTodos,
  users,
  editActive,
  editTitle,
  editText,
  editId,
}) => {
  const submitTask = () => {
    // handleSubmit();
    handleCloseModal();
    setTimeout(getTodos(), 200);
  };

  // console.log('item: ', item);

  function renderUsers() {
    const userDropdown = [];
    // pass userId to modal, make sure active user is at top
    users.forEach(user => {
      userDropdown.push(<option value={user.id}>{user.firstname} {user.lastname}</option>);
    });
    return userDropdown;
  }


  return (
    <form
      onSubmit={(e) => handleSubmit(e, editTitle, editText, editId)}
      className="fixed inset-auto flex flex-col items-center justify-center gap-5 py-2 pl-4 bg-primary-500 bg-opacity-25 backdrop-blur-2xl rounded-xl"
    >
      <div
        onClick={handleCloseModal}
        className="self-end bg-tertiary-500 px-2 mr-3 mt-1 rounded-md cursor-pointer hover:bg-opacity-75"
      >
        x
      </div>
      <label className="text-tertiary-500">
        Task
        <input
          placeholder={editActive ? editTitle : newTodo.title}
          onChange={handleTodoTitle}
          className="bg-primary-500 ml-3 rounded-lg px-3 text-secondary-500"
        />
      </label>
      <label className="text-tertiary-500">
        Task Details
        <input
          placeholder={editActive ? editText : newTodo.text}
          onChange={handleTodoText}
          className="text-secondary-500 bg-primary-500 ml-3 mr-16 rounded-lg px-3 py-1"
        />
      </label>
      <div className="text-tertiary-500">
        Assign task:
        <select onChange={(e) => handleDropdown(e)} className="bg-secondary-500  text-primary-500 ">
          {/* fetch all users; store to state or something; map through fetched data and create option for each user; include some sort of eventhandler..... */}
          {renderUsers()}
        </select>

      </div>
      <button
        className="bg-tertiary-500 py-1 mb-3"
      // onClick={submitTask}
      >
        Add Task
      </button>
    </form>
  );
};

export default Modal;
