import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import TrelloIcon from '@mui/icons-material/ViewKanban';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Getlists, DeleteList, GetBoardDetails } from '../ApiHelpers';
import ListCreate from './ListCreate';
import GetAllCards from '../cards/GetAllCards';

const GetAllLists = () => {
  const [lists, setLists] = useState([]);
  const [boardName, setBoardName] = useState('');
  const { id: boardId } = useParams();
  const location = useLocation();

  const backgroundImage = location.state?.backgroundImage || '';
  const backgroundColor = location.state?.backgroundColor || '#ffffff';

    const fetchData = async () => {
      const [listData, boardData] = await Promise.all([
        Getlists(boardId),
        GetBoardDetails(boardId),
      ]);
      setLists(listData);
      if (boardData?.name) setBoardName(boardData.name);
    };

  useEffect(() =>{
    fetchData()},[]
           )


  return (
    <Box sx={{ height: '100vh', width: '100vw', overflow: 'hidden', m: 0, p: 0 }}>
      {/* Background Layer */}
      <Box
        sx={{
          position: 'fixed',
          top: 150,
          left: 0,
          height: '100vh',
          width: '100vw',
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
          backgroundColor: backgroundImage ? undefined : backgroundColor,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          zIndex: -1,
        }}
      />

      {/* Content Layer */}
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '10px 16px',
            borderRadius: '10px',
            width: '100%',
            ml:0,
            mb: 2,
            mt:0,
            marginTop:10,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            <TrelloIcon sx={{ mr: 5 }} />
            {boardName}
          </Typography>
        </Box>

        {/* Lists Display */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            alignItems: 'flex-start',
            margin:5,
            marginLeft:2,
          }}
        >
          {lists.map((list) => (
            <Card
              key={list.id}
              sx={{
                width: 256,
                minHeight: 200,
                backgroundColor: '#f5f5f5',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <CardContent
                sx={{
                  color: 'black',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  padding: '8px 16px',
                  borderBottom: '1px solid #ccc',
                  backgroundColor: 'rgba(255,255,255,0.85)',
                }}
              >
                <span>{list.name}</span>
                <DeleteIcon
                  sx={{ cursor: 'pointer' }}
                  onClick={() => {DeleteList(list.id);
                                  fetchData();
                                 }}
                  
                />
              </CardContent>
              <GetAllCards id={list.id} />
            </Card>
          ))}

          {/* Add New List Box */}
          <Box sx={{ width: 256 }}>
            <ListCreate id={boardId} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default GetAllLists;
