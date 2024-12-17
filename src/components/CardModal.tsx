import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { X } from 'lucide-react';

type CardModalProps = {
  open: boolean;
  onClose: () => void;
  card: {
    id: string;
    title: string;
    description?: string | null;
  };
  onSave: (updatedCard: { title: string; description?: string }) => void;
};

export default function CardModal({ open, onClose, card, onSave }: CardModalProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description || '');

  // Reset form when modal opens with new card
  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description || '');
  }, [card]);

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title: title.trim(),
        description: description.trim() || undefined,
      });
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: '#f0fdf4', // green-50
          borderRadius: 2,
          border: '1px solid #86efac', // green-300
        }
      }}
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #86efac' // green-300
      }}>
        <Typography variant="h6" sx={{ color: '#15803d', fontWeight: 600 }}>
          Edit Card
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: '#dc2626', // red-600
            '&:hover': {
              backgroundColor: 'rgba(220, 38, 38, 0.1)', // red with opacity
            }
          }}
        >
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#86efac' },
                '&:hover fieldset': { borderColor: '#4ade80' },
                '&.Mui-focused fieldset': { borderColor: '#22c55e' },
              },
              '& .MuiInputLabel-root': {
                color: '#15803d',
              },
            }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#86efac' },
                '&:hover fieldset': { borderColor: '#4ade80' },
                '&.Mui-focused fieldset': { borderColor: '#22c55e' },
              },
              '& .MuiInputLabel-root': {
                color: '#15803d',
              },
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2, borderTop: '1px solid #86efac' }}>
        <Button 
          onClick={onClose}
          sx={{ 
            color: '#dc2626',
            '&:hover': {
              backgroundColor: 'rgba(220, 38, 38, 0.1)',
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            backgroundColor: '#16a34a',
            '&:hover': {
              backgroundColor: '#15803d',
            },
            boxShadow: 'none',
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}