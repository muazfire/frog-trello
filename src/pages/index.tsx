import { trpc } from '../utils/trpc';
import ToolbarNav from '../components/ToolbarNav';
import CreateBoardForm from '../components/CreateBoardForm';
import BoardGrid from '../components/BoardGrid';
import LoadingSpinner from '../components/LoadingSpinner';

// In your Home.tsx file
export default function Home() {
  const { data: boards, isLoading } = trpc.board.getAll.useQuery();
  
  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-green-50">
      <ToolbarNav />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Increase mb-6 to mb-12 or more for more spacing */}
        <div className="flex justify-between items-center mb-20"> 
          <h1 style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
            fontSize: '2rem', 
            fontWeight: 'bold',
            color: '#15803d'
          }}>
            My Lily Pads
          </h1>
          <CreateBoardForm />
        </div>
        <BoardGrid boards={boards || []} />
      </main>
    </div>
  );
}