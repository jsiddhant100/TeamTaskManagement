import React from 'react';
import { Card, CardContent, Typography, IconButton, Chip, Stack, Box, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useTasks } from '../../context/TaskContext';
import type { Task } from '../../services/apiService';


const TaskCard: React.FC<{ task: Task }> = ({ task }) => {

  const { removeTask, setTaskToEdit } = useTasks();

  return (
    <Card elevation={2} sx={{ height: '100%', transition: '0.2s', '&:hover': { transform: 'scale(1.02)' } }}>
      <CardContent>
     
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="caption" color="textSecondary">ID: {task.id}</Typography>
          <Box>
            <Tooltip title="Edit">
              <IconButton size="small" color="primary" onClick={() => setTaskToEdit(task)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton size="small" color="error" onClick={() => removeTask(task.id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>


        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 1 }}>{task.title}</Typography>
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1, minHeight: '3em' }}>
          {task.description || "No description."}
        </Typography>

    
        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          <Chip label={task.priority} size="small" color="primary" variant="outlined" />
          <Chip label={task.status} size="small" color="secondary" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
