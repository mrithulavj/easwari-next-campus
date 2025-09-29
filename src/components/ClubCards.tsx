import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { clubs } from "@/data/clubs";
import { Users } from "lucide-react";

const ClubCards = () => {
  return (
    <div className="mb-12">
      <div className="campus-card rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold text-campus-navy mb-2">
          Student Clubs & Organizations
        </h2>
        <p className="text-campus-navy/70">
          Join our vibrant community of clubs and organizations to enhance your campus experience
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => {
          const Icon = club.icon;
          return (
            <Link key={club.id} to={`/club/${club.id}`}>
              <Card className="campus-card cursor-pointer group overflow-hidden h-full hover:shadow-lg transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-campus-navy flex items-center justify-center">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-campus-navy group-hover:text-campus-accent transition-colors">
                        {club.name}
                      </h3>
                      <p className="text-sm text-campus-navy/60">
                        {club.category}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-campus-navy/80 mb-4 line-clamp-3">
                    {club.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-campus-navy/70">
                      <Users className="h-4 w-4" />
                      <span>{club.memberCount} members</span>
                    </div>
                    <span className="text-sm font-medium text-campus-accent hover:text-campus-navy transition-colors">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ClubCards;