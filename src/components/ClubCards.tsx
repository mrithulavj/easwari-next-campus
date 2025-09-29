import { Card } from "@/components/ui/card";
import yrcLogo from "@/assets/yrc-logo.png";
import rotaractLogo from "@/assets/rotaract-logo.png";
import enlitLogo from "@/assets/enlit-logo.png";
import { Users, Heart, BookOpen, Music, Code, Camera } from "lucide-react";

interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  memberCount: number;
  category: string;
  icon: React.ReactNode;
}

const ClubCards = () => {
  const clubs: Club[] = [
    {
      id: '1',
      name: 'YRC',
      description: 'Youth Red Cross - Serving humanity through various social service activities',
      logo: yrcLogo,
      memberCount: 120,
      category: 'Social Service',
      icon: <Heart className="h-5 w-5" />
    },
    {
      id: '2',
      name: 'Rotaract',
      description: 'Community service and leadership development for young adults',
      logo: rotaractLogo,
      memberCount: 85,
      category: 'Community Service',
      icon: <Users className="h-5 w-5" />
    },
    {
      id: '3',
      name: 'Enlit',
      description: 'Literary society promoting creative writing and literary appreciation',
      logo: enlitLogo,
      memberCount: 95,
      category: 'Literary',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      id: '4',
      name: 'Music Club',
      description: 'Harmonizing talents through musical performances and workshops',
      logo: yrcLogo, // Placeholder
      memberCount: 75,
      category: 'Cultural',
      icon: <Music className="h-5 w-5" />
    },
    {
      id: '5',
      name: 'Tech Club',
      description: 'Exploring technology through coding competitions and tech talks',
      logo: rotaractLogo, // Placeholder
      memberCount: 110,
      category: 'Technical',
      icon: <Code className="h-5 w-5" />
    },
    {
      id: '6',
      name: 'Photography Club',
      description: 'Capturing moments and developing visual storytelling skills',
      logo: enlitLogo, // Placeholder
      memberCount: 60,
      category: 'Creative',
      icon: <Camera className="h-5 w-5" />
    }
  ];

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
        {clubs.map((club) => (
          <Card 
            key={club.id}
            className="campus-card cursor-pointer group overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img 
                    src={club.logo} 
                    alt={`${club.name} logo`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-campus-navy/20"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-campus-navy text-campus-cream rounded-full p-1">
                    {club.icon}
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
                <button className="text-sm font-medium text-campus-accent hover:text-campus-navy transition-colors">
                  Learn More →
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClubCards;