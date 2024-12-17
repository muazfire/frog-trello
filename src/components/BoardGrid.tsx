import BoardCard from './BoardCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


type BoardWithLists = {
  id: string;
  title: string;
  createdAt: Date;
  lists: { id: string }[]; // Only include what you need
};

type BoardGridProps = {
  boards: BoardWithLists[];
};

export default function BoardGrid({ boards }: BoardGridProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid 
        container 
        spacing={3}  // Increased spacing between cards
      >
        {boards?.map((board) => (
          <Grid 
            item 
            xs={12}      // Full width on mobile
            sm={6}       // 2 columns on small screens
            md={4}       // 3 columns on medium screens
            lg={3}       // 4 columns on large screens
            key={board.id}
          >
            <BoardCard 
  id={board.id}
  title={board.title}
  listCount={board.lists?.length || 0} // Correctly calculate list count
/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}