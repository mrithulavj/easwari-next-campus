import headerImage from "@/assets/campus-main.jpg";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

const CampusHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full h-80 overflow-hidden">
      <img 
        src={headerImage} 
        alt="Campus view" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">
            Next Up Easwari
          </h1>
          <p className="text-xl font-light opacity-90 mb-6">
            Stay updated with events, clubs, and campus activities
          </p>
          <Button 
            onClick={() => navigate("/od-application")}
            size="lg"
            variant="secondary"
            className="gap-2"
          >
            <FileText className="h-5 w-5" />
            Apply for On-Duty
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CampusHeader;