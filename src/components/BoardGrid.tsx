import BoardCard from './BoardCard';
import { Board } from '@prisma/client';
import Box from '@mui/material/Box';

type BoardGridProps = {
  boards: Board[];
};

export default function BoardGrid({ boards }: BoardGridProps) {
  return (
    <Box sx={{ 
      minHeight: 'calc(100vh - 200px)',
      p: 3
    }}>
      <style>
        {`
          .scroll-container::-webkit-scrollbar {
            height: 8px;
          }
          .scroll-container::-webkit-scrollbar-track {
            background: #f0fdf4;
          }
          .scroll-container::-webkit-scrollbar-thumb {
            background: #86efac;
            border-radius: 9999px;
          }
          .scroll-container::-webkit-scrollbar-thumb:hover {
            background: #4ade80;
          }
        `}
      </style>
      
      <Box 
        className="scroll-container"
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 3,
          pb: 3,
          pt: 2,
          px: 2,
          height: '100%',
          '& > div': {
            marginTop: '10px',
            marginBottom: '10px'
          }
        }}
      >
        {boards?.map((board) => (
          <Box
            key={board.id}
            sx={{
              flexShrink: 0,
              width: '300px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}
          >
            <BoardCard 
              id={board.id}
              title={board.title}
              listCount={0}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}