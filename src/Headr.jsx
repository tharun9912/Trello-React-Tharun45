import React from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import TrelloIcon from '@mui/icons-material/ViewKanban';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

const Headr = () => {
  return (
    <div>
        <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'shadedblue',
        top: 0,
        left: 0,
        right: 0,
        margin: 0,
        padding: 0,
      }}
    >
      <Toolbar
        sx={{
          minHeight: '75px !important',
          paddingLeft: '10px',
          display: 'flex',
          alignItems: 'center',
          color:'black',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to={`/`}><TrelloIcon sx={{ mr: 3,ml:1 }} /></Link>
          <Typography variant="h6" noWrap component="div">
            Trello
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
    </div>
  )
}

export default Headr