import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import TaskCard from './TaskCard';
import { useTasks } from '../../context/TaskContext';


const TaskList: React.FC = () => {
  const { tasks } = useTasks();


  if (tasks.length === 0) {
    return (
      <Box sx={{ mt: 4, p: 4, bgcolor: '#fff', borderRadius: 2, textAlign: 'center' }}>
        <Typography color="textSecondary" variant="h6">No tasks found. Try searching for something else!</Typography>
      </Box>
    );
  }


  return (
    <Grid container spacing={3} sx={{ mt: 2 }}>
      {tasks.map((taskItem) => (
        <Grid item xs={12} sm={6} md={4} key={taskItem.id}>
          <TaskCard task={taskItem} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;
