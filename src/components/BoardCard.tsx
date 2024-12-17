import { useRouter } from 'next/router';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Leaf, Trash } from 'lucide-react';
import { trpc } from '../utils/trpc';

type BoardCardProps = {
  id: string;
  title: string;
  listCount: number;
};

export default function BoardCard({ id, title, listCount }: BoardCardProps) {
  const router = useRouter();
  const utils = trpc.useContext();
  
  const deleteBoard = trpc.board.delete.useMutation({
    onSuccess: () => {
      utils.board.getAll.invalidate();
    },
  });

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking delete
    if (window.confirm('Are you sure you want to delete this board?')) {
      deleteBoard.mutate({ id });
    }
  };

  const handleClick = () => {
    router.push(`/board/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        cursor: 'pointer',
        backgroundColor: '#f0fdf4', 
        border: '1px solid #86efac', 
        borderRadius: 2,
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#dcfce7', 
          borderColor: '#4ade80', 
        },
        position: 'relative'
      }}
    >
      {/* Rest of your existing card content */}
      <IconButton
        onClick={handleDelete}
        size="small"
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: '#dc2626',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
          }
        }}
      >
        <Trash size={16} />
      </IconButton>
      
      <CardContent>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <Leaf 
            size={20} 
            style={{ 
              color: '#16a34a', 
              marginRight: '8px',
              transform: 'rotate(45deg)'
            }} 
          />
          <Typography
            variant="h6"
            sx={{
              color: '#15803d', 
              fontSize: '1.1rem',
              fontWeight: 600
            }}
          >
            {title}
          </Typography>
        </div>
        <Typography
          sx={{
            fontSize: '0.875rem',
            color: '#22c55e', 
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {listCount} lily pads
        </Typography>
      </CardContent>
    </Card>
  );
}