import Index from "./Index";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useAuth();
  
  return (
    <div>
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={signOut}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>
      <Index />
    </div>
  );
}
