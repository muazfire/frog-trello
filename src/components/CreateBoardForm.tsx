import { useState } from 'react';
import { Plus } from 'lucide-react';
import { trpc } from '../utils/trpc';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CreateBoardForm() {
  const [newBoardTitle, setNewBoardTitle] = useState('');
  const utils = trpc.useContext();
  
  const createBoard = trpc.board.create.useMutation({
    onSuccess: () => {
      setNewBoardTitle('');
      utils.board.getAll.invalidate();
    },
  });

  return (
    <Box sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: 1,
      marginBottom: 4  // Add margin bottom
    }}>
      <TextField
        size="small"
        value={newBoardTitle}
        onChange={(e) => setNewBoardTitle(e.target.value)}
        placeholder="Enter Pond Name"
        sx={{
          width: '200px',
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: '8px',
            '& fieldset': {
              borderColor: '#86efac', // green-300
            },
            '&:hover fieldset': {
              borderColor: '#4ade80', // green-400
            },
            '&.Mui-focused fieldset': {
              borderColor: '#22c55e', // green-500
            }
          },
          '& input::placeholder': {
            color: '#86efac',
            opacity: 1
          }
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          if (newBoardTitle.trim()) {
            createBoard.mutate({ title: newBoardTitle });
          }
        }}
        startIcon={<Plus size={16} />}
        sx={{
          backgroundColor: '#16a34a', // green-600
          borderRadius: '8px',
          textTransform: 'none',
          padding: '4px 12px',
          minWidth: 'unset',
          '&:hover': {
            backgroundColor: '#15803d', // green-700
          },
          boxShadow: 'none',
          height: '40px'
        }}
      >
        Create
      </Button>
    </Box>
  );
}