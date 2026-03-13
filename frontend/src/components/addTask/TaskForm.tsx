import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, Typography, Paper, Stack } from '@mui/material';
import { useTasks } from '../../context/TaskContext';


const TaskForm: React.FC = () => {

  const { addNewTask, saveEditedTask, taskToEdit, setTaskToEdit, setIsAdding } = useTasks();


  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'TODO'
  });

 
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description || '',
        priority: taskToEdit.priority,
        status: taskToEdit.status
      });
    }
  }, [taskToEdit]);

 
  const onTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskToEdit) {

      saveEditedTask(taskToEdit.id, formData);
    } else {

      addNewTask(formData);
    }
  };

  const onCancel = () => {
    setIsAdding(false);
    setTaskToEdit(null);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {taskToEdit ? `Updating Task: ${taskToEdit.id}` : 'Create a New Task'}
      </Typography>

      <Box component="form" onSubmit={onSave}>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField label="Title" name="title" value={formData.title} onChange={onTyping} required fullWidth />
          <TextField label="Description" name="description" value={formData.description} onChange={onTyping} multiline rows={3} fullWidth />

          <Stack direction="row" spacing={2}>
            <TextField select label="Priority" name="priority" value={formData.priority} onChange={onTyping} fullWidth>
              <MenuItem value="LOW">Low</MenuItem>
              <MenuItem value="MEDIUM">Medium</MenuItem>
              <MenuItem value="HIGH">High</MenuItem>
            </TextField>
            <TextField select label="Status" name="status" value={formData.status} onChange={onTyping} fullWidth>
              <MenuItem value="TODO">To Do</MenuItem>
              <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
              <MenuItem value="DONE">Done</MenuItem>
            </TextField>
          </Stack>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={onCancel} variant="outlined" color="secondary">Cancel</Button>
            <Button type="submit" variant="contained" color="primary">
              {taskToEdit ? 'Save Changes' : 'Create Task'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
};

export default TaskForm;
