import React, { useState } from 'react';
import {
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { MdDelete } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'


const ToList = () => {
  const [searchText, setSearchText] = useState("");
  const [taskText, setTaskText] = useState("");
  const [items, setItems] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [editDialog, setEditDialog] = useState(false);
  const [editData, setEditData] = useState(null);
  let navigate=useNavigate();
 const handleLogout = () => {
  localStorage.removeItem("isLoggedIn");
  navigate("/");
};


  
  const handleAddTask = () => {
    if (!taskText || !items || !selectedDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      id: Date.now(),
      text: taskText,
      
      category: items,
      due: selectedDate.toLocaleDateString(),
      completed: false
    };

    setTasks([...tasks, newTask]);
    setTaskText("");
    setItems("");
    setSelectedDate(null);
  };


  const handleDelete = (idToDelete) => {
    setTasks(tasks.filter(task => task.id !== idToDelete));
  };

  const handleCheckboxChange = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleEditOpen = (task) => {
    setEditData({ ...task, due: new Date(task.due) });
    setEditDialog(true);
  };


  const handleEditSave = () => {
    setTasks(tasks.map(task =>
      task.id === editData.id
        ? {
          ...task,
          text: editData.text,
          category: editData.category,
          due: editData.due.toLocaleDateString()
        }
        : task
    ));
    setEditDialog(false);
    setEditData(null);
  };

 
  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <main>
      <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto', border: '2px solid rgb(149, 175, 16)' }}>
        
       
        <TextField
          fullWidth
          label="Search a task"
          variant="outlined"
          margin="normal"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

       
        <TextField
          fullWidth
          label="Add a new task"
          variant="outlined"
          margin="normal"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel>Select Category</InputLabel>
          <Select value={items} onChange={(e) => setItems(e.target.value)}>
            <MenuItem value="personal">Personal</MenuItem>
            <MenuItem value="work">Work</MenuItem>
            <MenuItem value="shopping">Shopping</MenuItem>
            <MenuItem value="health">Health</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </Select>
        </FormControl>

       
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Due Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: 'outlined',
                margin: 'normal'
              }
            }}
          />
        </LocalizationProvider>

       
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleAddTask}
          style={{ marginTop: '40px' }}
        >
          Add Task
        </Button>

       
        <ul style={{ marginLeft: '10px', paddingTop: '20px' }} className='item'>
          {filteredTasks.map((task) => (
            <li key={task.id} style={{ marginBottom: '10px' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleCheckboxChange(task.id)}
                style={{ marginRight: '10px', accentColor: '#4CAF50' }}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : 'none',
                  color: task.completed ? "red" : "black",
                }}
              >
                TEXT: {task.text}, CATEGORY: {task.category}, DUE DATE: {task.due}
              </span>
              <FaUserEdit
                role='button'
                tabIndex={0}
                size={22}
                style={{ marginLeft: '10px', cursor: 'pointer'}}
                onClick={() => handleEditOpen(task)}
              />
              <MdDelete
                role='button'
                tabIndex={0}
                size={22}
                style={{ marginLeft: '10px', cursor: 'pointer'  }}
                onClick={() => handleDelete(task.id)}
              />
            </li>
          ))}
          {filteredTasks.length === 0 && (
            <li style={{ color: '#888', marginTop: '20px' }}>
              No tasks found.
            </li>
          )}
        </ul>

<Button onClick={handleLogout} variant="outlined" style={{ marginTop: '20px' }}>
  Logout
</Button>
        <Dialog open={editDialog} onClose={() => setEditDialog(false)} fullWidth maxWidth="sm">
          <DialogTitle>Edit Task</DialogTitle>
          <DialogContent>
            {editData && (
              <>
                <TextField
                  fullWidth
                  label="Task"
                  value={editData.text}
                  onChange={(e) => setEditData({ ...editData, text: e.target.value })}
                  margin="normal"
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel>Select Category</InputLabel>
                  <Select
                    value={editData.category}
                    onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  >
                    <MenuItem value="personal">Personal</MenuItem>
                    <MenuItem value="work">Work</MenuItem>
                    <MenuItem value="shopping">Shopping</MenuItem>
                    <MenuItem value="health">Health</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Due Date"
                    value={editData.due}
                    onChange={(newDate) => setEditData({ ...editData, due: newDate })}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: 'normal'
                      }
                    }}
                  />
                </LocalizationProvider>
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleEditSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
};

export default ToList;