import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateBoard from './CreateBoard';
import { GetAllBoards } from '../ApiHelpers';

const Show = () => {
  const [boards, setBoards] = useState();

  useEffect(() => {
    const FetchBoards = async () => {
      const data = await GetAllBoards();
      setBoards(data);
    };
    FetchBoards();
  }, []);

  return (
    <Box sx={{ mt: 15, ml: '25px' }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold',textAlign:'left' }}>
        My Boards
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          marginTop:6,
        }}
      >
        {boards &&
          boards.map((board) => (
            <Link
              key={board.id}
              to={`/board/${board.id}`}
              state={{
                backgroundImage: board.prefs.backgroundImage || '',
                backgroundColor: board.prefs.backgroundColor || '',
              }}
              style={{ textDecoration: 'none' }}
            >
              <Card
                sx={{
                  width: 256,
                  height: 200,
                  color: 'white',
                  ...(board.prefs.backgroundImage
                    ? { backgroundImage: `url(${board.prefs.backgroundImage})` }
                    : { backgroundColor: board.prefs.backgroundColor || 'lightgreen' }),
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'flex-end',
                }}
              >
                <CardContent
                  sx={{
                    backgroundColor: 'rgba(255,255,255,0.85)',
                    color: 'black',
                    width: '100%',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}
                >
                  {board.name}
                </CardContent>
              </Card>
            </Link>
          ))}
        <CreateBoard />
      </Box>
    </Box>
  );
};

export default Show;
