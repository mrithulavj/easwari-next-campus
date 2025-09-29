import { LucideIcon } from "lucide-react";

export interface Club {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  memberCount: number;
  category: string;
  fullDescription: string;
}

export interface ClubEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'upcoming-events' | 'auditions' | 'registrations' | 'workshops' | 'meetings';
  clubId: string;
  clubName: string;
  description: string;
  registrationRequired: boolean;
  status: 'open' | 'closed' | 'upcoming';
}