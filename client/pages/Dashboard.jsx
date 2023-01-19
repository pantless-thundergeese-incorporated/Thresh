import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column.jsx';
import { useLocation } from 'react-router-dom';

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {  //if destinaion is new location
    const sourceColumn = columns[source.droppableId]; //
    // console.log('sourceColumn: ', sourceColumn);
    const destColumn = columns[destination.droppableId];
    // console.log('destColumn: ', destColumn);
    const sourceItems = [...sourceColumn.items];
    // console.log('sourceItems: ', sourceItems);
    const destItems = [...destColumn.items];
    // console.log('destItems: ', destItems);
    const [removed] = sourceItems.splice(source.index, 1);
    removed.status_id = destColumn.status;
    // console.log('removed: ', removed);
    destItems.splice(destination.index, 0, removed);

    const updatedTask = {
      title: removed.title,
      text: removed.text,
      id: removed.id,
      user_id: removed.user_id,
      status_id: removed.status_id
    }
    console.log('updatedTask: ', updatedTask);

    axios.patch('/api/tasks/update', updatedTask)
      .then(response => {
        setColumns({
          ...columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        });
      })
      .catch(e => console.log(e));

  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const Dashboard = () => {
  const location = useLocation();
  const locationUserId = location.state.userId;
  const [userId, setUserId] = useState(locationUserId);
  const [users, setUsers] = useState([]);
  // console.log('users: ', users);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      // console.log('fetched all users: ' + response.data)
      setUsers(response.data);
    }
    catch (err) {
      console.log(err);
    }
  }
  // change data to empty array when working with real data //should we rename these columns with the status ids we made in sql? 
  const [columns, setColumns] = useState({
    ['tasks']: {
      name: 'To Do',
      items: [],
      status: 1
    },
    ['inProgress']: {
      name: 'In Progress',
      items: [],
      status: 2
    },
    ['verified']: {
      name: 'Verified',
      items: [],
      status: 3
    },
    ['complete']: {
      name: 'Complete',
      items: [],
      status: 4
    },
  });

  //console.log('tasks: ', columns.tasks.items);


  useEffect(() => {
    fetchUsers();
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get('/api/tasks');
      // console.log('RES DATAAA: ', response.data);
      const toDoTasks = response.data.filter(task => task.status_id === 1);
      const inProgress = response.data.filter(task => task.status_id === 2);
      const verified = response.data.filter(task => task.status_id === 3);
      const completeTasks = response.data.filter(task => task.status_id === 4);
      setColumns({
        ['tasks']: {
          name: 'To Do',
          items: toDoTasks,
          status: 1
        },
        ['inProgress']: {
          name: 'In Progress',
          items: inProgress,
          status: 2
        },
        ['verified']: {
          name: 'Verified',
          items: verified,
          status: 3
        },
        ['complete']: {
          name: 'Complete',
          items: completeTasks,
          status: 4
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="grid grid-cols-4 w-5/6 h-3/4 gap-10 mt-10">
        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Column
                colName={column.name}
                droppableId={columnId}
                key={columnId}
                index={index}
                column={column}
                getTodos={getTodos}
                users={users}
                userId={userId}
              />
            );
          })}
        </DragDropContext>
      </div>
    </div>
  );
};

export default Dashboard;
