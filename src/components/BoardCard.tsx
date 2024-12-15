import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Leaf } from 'lucide-react';

type BoardCardProps = {
  id: string;
  title: string;
  listCount: number;
};

export default function BoardCard({ id, title, listCount }: BoardCardProps) {
  return (
    <Card
      id={id}
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
        }
      }}
    >
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