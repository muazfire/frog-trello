import BoardCard from './BoardCard';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


type BoardWithLists = {
  id: string;
  title: string;
  createdAt: Date;
  lists: { id: string }[]; 
};

type BoardGridProps = {
  boards: BoardWithLists[];
};

export default function BoardGrid({ boards }: BoardGridProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid 
        container 
        spacing={3}  
      >
        {boards?.map((board) => (
          <Grid 
            item 
            xs={12}      
            sm={6}    
            md={4}       
            lg={3}       
            key={board.id}
          >
            <BoardCard 
  id={board.id}
  title={board.title}
  listCount={board.lists?.length || 0} 
/>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}