import { useRouter } from 'next/router';
import { trpc } from '../../utils/trpc';
import ToolbarNav from '../../components/ToolbarNav';
import LoadingSpinner from '../../components/LoadingSpinner';
import List from '../../components/List';
import { useState, useEffect } from 'react';
import { Typography, TextField, Button, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

type CardType = {
  id: string;
  title: string;
  description?: string | null;
  order: number;
  listId: string;
};

type ListType = {
  id: string;
  title: string;
  order: number;
  cards: CardType[];
};

export default function BoardPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: board, isLoading } = trpc.board.getById.useQuery(
    { id: id as string },
    { enabled: !!id }
  );

  const createList = trpc.board.createList.useMutation();
  const updateListOrder = trpc.board.updateListOrder.useMutation();
  const updateCardOrder = trpc.board.updateCardOrder.useMutation();
  const updateListName = trpc.board.updateListName.useMutation();
  const updateCard = trpc.board.updateCard.useMutation();
  const deleteList = trpc.board.deleteList.useMutation();
  const createCard = trpc.board.createCard.useMutation();
  const deleteCard = trpc.board.deleteCard.useMutation();
  const utils = trpc.useContext();

  const [lists, setLists] = useState<ListType[]>([]);
  const [newListTitle, setNewListTitle] = useState('');
  const [history, setHistory] = useState<ListType[][]>([]);

  useEffect(() => {
    if (board?.lists) setLists(board.lists);
  }, [board?.lists]);

  const saveToHistory = (state: ListType[]) => {
    setHistory((prev) => [...prev, JSON.parse(JSON.stringify(state))]);
  };

  const undo = () => {
    if (history.length > 0) {
      const prevState = history.pop();
      setLists(prevState || []);
    }
  };

  const handleCreateList = () => {
    if (!newListTitle.trim()) return;

    saveToHistory(lists);

    createList.mutate(
      { title: newListTitle, boardId: id as string },
      { onSuccess: () => utils.board.getById.invalidate() }
    );
    setNewListTitle('');
  };

  const handleDeleteList = (listId: string) => {
    if (window.confirm('Are you sure you want to delete this list?')) {
      saveToHistory(lists);
      deleteList.mutate({ id: listId }, { onSuccess: () => utils.board.getById.invalidate() });
    }
  };

  const handleEditListName = (listId: string, newTitle: string) => {
    saveToHistory(lists);
    updateListName.mutate(
      { id: listId, title: newTitle },
      { onSuccess: () => utils.board.getById.invalidate() }
    );
  };

  const handleAddCard = (listId: string, title: string) => {
    saveToHistory(lists);
    createCard.mutate(
      { title, listId },
      { onSuccess: () => utils.board.getById.invalidate() }
    );
  };

  const handleDeleteCard = (cardId: string) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      saveToHistory(lists);
      deleteCard.mutate({ id: cardId }, { onSuccess: () => utils.board.getById.invalidate() });
    }
  };

  const handleEditCard = (cardId: string, updatedCard: { title: string; description?: string }) => {
    saveToHistory(lists);
    updateCard.mutate(
      { id: cardId, title: updatedCard.title, description: updatedCard.description },
      { onSuccess: () => utils.board.getById.invalidate() }
    );
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination, type } = result;
    if (!destination) return;

    saveToHistory(lists);

    if (type === 'LIST') {
      const updatedLists = [...lists];
      const [movedList] = updatedLists.splice(source.index, 1);
      updatedLists.splice(destination.index, 0, movedList);

      setLists(updatedLists);
      updateListOrder.mutate(
        updatedLists.map((list, index) => ({ id: list.id, order: index })),
        { onSuccess: () => utils.board.getById.invalidate() }
      );
    } else if (type === 'CARD') {
      const sourceList = lists.find((l) => l.id === source.droppableId);
      const destinationList = lists.find((l) => l.id === destination.droppableId);

      if (!sourceList || !destinationList) return;

      const sourceCards = [...sourceList.cards];
      const [movedCard] = sourceCards.splice(source.index, 1);
      const destinationCards =
        sourceList.id === destinationList.id ? sourceCards : [...destinationList.cards];

      destinationCards.splice(destination.index, 0, movedCard);

      const updatedLists = lists.map((list) => {
        if (list.id === sourceList.id) return { ...list, cards: sourceCards };
        if (list.id === destinationList.id) return { ...list, cards: destinationCards };
        return list;
      });

      setLists(updatedLists);
      updateCardOrder.mutate(
        updatedLists.flatMap((list) =>
          list.cards.map((card, index) => ({ id: card.id, order: index, listId: list.id }))
        ),
        { onSuccess: () => utils.board.getById.invalidate() }
      );
    }
  };

  if (isLoading) return <LoadingSpinner />;
  if (!board) return <div>Board not found</div>;

  return (
    <div className="min-h-screen bg-green-50">
      <ToolbarNav />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="16px">
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#166534' }}>
            {board.title}
          </Typography>
          <Button onClick={undo} variant="outlined" color="warning">
            Undo
          </Button>
        </Box>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="lists" direction="horizontal" type="LIST">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ display: 'flex', gap: '16px', overflowX: 'auto' }}
              >
                {lists.map((list, index) => (
                  <Draggable key={list.id} draggableId={list.id} index={index}>
                    {(provided) => (
                      <Box
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{ width: '300px', flexShrink: 0 }}
                      >
                        <List
                          title={list.title}
                          cards={list.cards}
                          listId={list.id}
                          onDelete={() => handleDeleteList(list.id)}
                          onAddCard={(title) => handleAddCard(list.id, title)}
                          onDeleteCard={handleDeleteCard}
                          onEditCard={handleEditCard}
                          onEditListName={(newTitle) => handleEditListName(list.id, newTitle)}
                        />
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>

        <Box sx={{ width: '300px', paddingTop: '16px' }}>
          <TextField
            value={newListTitle}
            onChange={(e) => setNewListTitle(e.target.value)}
            placeholder="New List Title"
            variant="outlined"
            size="small"
            fullWidth
          />
          <Button onClick={handleCreateList} variant="contained" sx={{ marginTop: 1 }}>
            + Add List
          </Button>
        </Box>
      </main>
    </div>
  );
}
