import { Button, Container, Typography, Box, CircularProgress, Snackbar, Alert } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Header from "../../components/header/Header";
import TaskForm from "../../components/addTask/TaskForm";
import TaskList from "../../components/addTask/TaskList";
import { useTasks } from "../../context/TaskContext";


const Dashboard = () => {

  const { 
    isLoading, error, success, clearMessages, 
    isAdding, setIsAdding, taskToEdit 
  } = useTasks();

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: '#f5f5f5', pb: 4 }}>

      <Header />
      
      <Container maxWidth="lg">
        <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Team Tasks</Typography>
          
          {!isAdding && !taskToEdit && (
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => setIsAdding(true)}
            >
              Add New Task
            </Button>
          )}
        </Box>

        {(isAdding || taskToEdit) && <TaskForm />}

        {isLoading ? (
          <Box sx={{ textAlign: 'center', mt: 8 }}><CircularProgress /></Box>
        ) : (
          <TaskList />
        )}

        <Snackbar open={!!error} autoHideDuration={3000} onClose={clearMessages}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>

        <Snackbar open={!!success} autoHideDuration={3000} onClose={clearMessages}>
          <Alert severity="success">{success}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Dashboard;
