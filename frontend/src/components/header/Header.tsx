import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, InputBase, alpha, styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTasks } from '../../context/TaskContext';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginLeft: theme.spacing(2),
  width: 'auto',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '24ch',
  },
}));


const Header: React.FC = () => {
  const { searchQuery, setSearchQuery } = useTasks();
  const [localSearch, setLocalSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(localSearch);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, setSearchQuery]);

  return (
    <AppBar position="sticky" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
          Team Task Manager
        </Typography>
        
        <Search>
          <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
          <StyledInputBase
            placeholder="Search for tasks..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
