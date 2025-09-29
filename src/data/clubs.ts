import {
  Users,
  Heart,
  Recycle,
  Zap,
  Crown,
  Battery,
  Sun,
  HeartHandshake,
  Camera,
  Lightbulb,
  Volume2,
  Bot
} from "lucide-react";
import { Club } from "@/types/club";

export const clubs: Club[] = [
  {
    id: "campus-life",
    name: "Campus Life",
    description: "Central hub for all campus activities and student engagement",
    icon: Users,
    memberCount: 250,
    category: "Student Life",
    fullDescription: "Campus Life is the central organizing body for all student activities on campus. We coordinate events, facilitate student engagement, and ensure a vibrant campus community for all students."
  },
  {
    id: "nss",
    name: "NSS",
    description: "National Service Scheme - Community service and social development",
    icon: Heart,
    memberCount: 180,
    category: "Social Service",
    fullDescription: "The National Service Scheme (NSS) is a public service program conducted by students to take them closer to the community. We organize community outreach programs, awareness campaigns, and social service activities."
  },
  {
    id: "rotaract",
    name: "Rotaract",
    description: "Service above self - Community development and leadership",
    icon: Recycle,
    memberCount: 75,
    category: "Community Service",
    fullDescription: "Rotaract Club focuses on community service projects, professional development, and international service. We believe in 'Service Above Self' and work towards creating positive change in society."
  },
  {
    id: "hustlers",
    name: "Hustlers",
    description: "Entrepreneurship and business development club",
    icon: Zap,
    memberCount: 120,
    category: "Entrepreneurship",
    fullDescription: "Hustlers is an entrepreneurship club that fosters business acumen and startup culture among students. We organize business plan competitions, startup pitches, and networking events with industry leaders."
  },
  {
    id: "dions",
    name: "Dions",
    description: "Drama and performing arts society",
    icon: Crown,
    memberCount: 95,
    category: "Performing Arts",
    fullDescription: "Dions is the premier drama and performing arts society on campus. We produce theatrical performances, organize drama workshops, and provide a platform for students to explore their artistic talents."
  },
  {
    id: "energy-club",
    name: "Energy Club",
    description: "Sustainable energy and environmental conservation",
    icon: Battery,
    memberCount: 85,
    category: "Environmental",
    fullDescription: "Energy Club promotes sustainable energy practices and environmental conservation. We conduct research projects, organize awareness campaigns, and implement green initiatives across campus."
  },
  {
    id: "leo",
    name: "Leo",
    description: "Leadership, Experience, Opportunity - Youth service organization",
    icon: Sun,
    memberCount: 90,
    category: "Leadership",
    fullDescription: "Leo Club is a youth organization that emphasizes leadership development through community service. We focus on environment, health, education, and humanitarian projects to make a positive impact."
  },
  {
    id: "yrc",
    name: "YRC",
    description: "Youth Red Cross - Health and humanitarian services",
    icon: HeartHandshake,
    memberCount: 110,
    category: "Health & Humanitarian",
    fullDescription: "Youth Red Cross (YRC) is dedicated to health education, blood donation drives, disaster relief, and humanitarian services. We train students in first aid and emergency response."
  },
  {
    id: "pixters",
    name: "Pixters",
    description: "Photography and visual arts community",
    icon: Camera,
    memberCount: 65,
    category: "Visual Arts",
    fullDescription: "Pixters is the photography and visual arts club that captures the essence of campus life. We organize photo walks, exhibitions, workshops, and competitions to promote visual storytelling."
  },
  {
    id: "enlit",
    name: "Enlit",
    description: "Literary society for writers and literature enthusiasts",
    icon: Lightbulb,
    memberCount: 80,
    category: "Literature",
    fullDescription: "Enlit is the literary society that celebrates the written word. We organize poetry sessions, creative writing workshops, book discussions, and literary competitions to nurture literary talent."
  },
  {
    id: "decibels",
    name: "Decibels",
    description: "Music and audio production society",
    icon: Volume2,
    memberCount: 70,
    category: "Music",
    fullDescription: "Decibels is the music society that brings rhythm to campus life. We organize concerts, music competitions, audio production workshops, and provide platforms for musical talent to flourish."
  },
  {
    id: "robotics",
    name: "Robotics",
    description: "Robotics and automation technology club",
    icon: Bot,
    memberCount: 100,
    category: "Technology",
    fullDescription: "Robotics Club is dedicated to innovation in automation and robotics technology. We participate in competitions, conduct workshops, and work on cutting-edge robotics projects and research."
  }
];