import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Paper,
  Button,
  TextField,
} from '@mui/material';
import { Trash } from 'lucide-react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import CardModal from './CardModal';

type CardType = {
  id: string;
  title: string;
  description?: string | null;
};

type ListProps = {
  title: string;
  cards: CardType[];
  listId: string;
  onDelete: () => void;
  onAddCard: (title: string) => void;
  onDeleteCard: (cardId: string) => void;
  onEditCard: (cardId: string, updatedCard: { title: string; description?: string }) => void;
  onEditListName: (newTitle: string) => void;
};

export default function List({
  title,
  cards,
  listId,
  onDelete,
  onAddCard,
  onDeleteCard,
  onEditCard,
  onEditListName,
}: ListProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [newCardTitle, setNewCardTitle] = useState('');

  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const handleSaveTitle = () => {
    if (editedTitle.trim()) {
      onEditListName(editedTitle);
      setIsEditing(false);
    }
  };

  const handleAddCard = () => {
    if (!newCardTitle.trim()) return;
    onAddCard(newCardTitle);
    setNewCardTitle('');
  };

  const handleOpenModal = (card: CardType) => {
    setSelectedCard(card);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
  };

  const handleSaveCard = (updatedCard: { title: string; description?: string }) => {
    if (selectedCard) {
      onEditCard(selectedCard.id, updatedCard);
      setSelectedCard(null);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'relative',
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#f0fdf4',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
      }}
    >
      {/* List Header with Title and Delete Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 1,
        }}
      >
        {isEditing ? (
          <TextField
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
            variant="outlined"
            size="small"
            autoFocus
            sx={{
              width: 'calc(100% - 40px)',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: '#86efac' },
                '&:hover fieldset': { borderColor: '#4ade80' },
                '&.Mui-focused fieldset': { borderColor: '#22c55e' },
              },
            }}
          />
        ) : (
          <Typography
            variant="h6"
            component="h2"
            onClick={() => setIsEditing(true)}
            sx={{
              fontWeight: 'bold',
              color: '#15803d',
              cursor: 'pointer',
              flex: 1,
              paddingRight: 2,
            }}
          >
            {title}
          </Typography>
        )}
        <IconButton
          onClick={onDelete}
          size="small"
          sx={{
            color: '#dc2626',
            marginLeft: 1,
          }}
        >
          <Trash size={16} />
        </IconButton>
      </Box>

      {/* Cards Droppable Area */}
      <Droppable droppableId={listId} type="CARD">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
              overflowY: 'auto',
              minHeight: '100px',
              backgroundColor: cards.length === 0 ? '#f0fff4' : 'transparent',
            }}
          >
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id} index={index}>
                {(provided) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => handleOpenModal(card)} // Open modal on card click
                    variant="outlined"
                    sx={{
                      backgroundColor: '#dcfce7',
                      borderColor: '#86efac',
                      padding: '4px 8px',
                      wordBreak: 'break-word',
                      position: 'relative',
                      cursor: 'pointer',
                    }}
                  >
                    <CardContent sx={{ padding: '4px !important' }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#166534' }}>
                        {card.title}
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteCard(card.id);
                        }}
                        size="small"
                        sx={{ position: 'absolute', top: 4, right: 4, color: '#dc2626' }}
                      >
                        <Trash size={12} />
                      </IconButton>
                    </CardContent>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
            {cards.length === 0 && (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontStyle: 'italic', textAlign: 'center', padding: '10px' }}
              >
                Empty List
              </Typography>
            )}
          </Box>
        )}
      </Droppable>

      {/* Add Card Form */}
      <Box sx={{ marginTop: 1 }}>
        <TextField
          value={newCardTitle}
          onChange={(e) => setNewCardTitle(e.target.value)}
          placeholder="New Card Title"
          variant="outlined"
          size="small"
          fullWidth
          sx={{
            marginBottom: 1,
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#86efac' },
              '&:hover fieldset': { borderColor: '#4ade80' },
              '&.Mui-focused fieldset': { borderColor: '#22c55e' },
            },
          }}
        />
        <Button
          onClick={handleAddCard}
          variant="contained"
          size="small"
          sx={{ backgroundColor: '#16a34a', '&:hover': { backgroundColor: '#15803d' } }}
        >
          + Add Card
        </Button>
      </Box>

      {/* Modal for Editing Card */}
      {selectedCard && (
        <CardModal
          open={!!selectedCard}
          onClose={handleCloseModal}
          card={selectedCard}
          onSave={handleSaveCard}
        />
      )}
    </Paper>
  );
}
