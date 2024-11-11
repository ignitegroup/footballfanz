import { Heart, Users, Trophy, Mic2 } from 'lucide-react';

const stats = [
  { label: 'Active Members', value: '2,500+', icon: Users },
  { label: 'Events Hosted', value: '150+', icon: Trophy },
  { label: 'Funds Raised', value: '$100K+', icon: Heart },
  { label: 'Community Groups', value: '25+', icon: Mic2 },
];

const team = [
  {
    name: 'Marcus Thompson',
    role: 'Founder & Director',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
  },
  {
    name: 'Sarah Williams',
    role: 'Community Manager',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
  },
  {
    name: 'David Chen',
    role: 'Events Coordinator',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
  },
];

export default function About() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Story
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            Uniting communities through football and reggae
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-jamaican-green to-jamaican-yellow opacity-20 rounded-lg" />
            <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-white mb-4">Our Mission</h2>
              <p className="text-gray-300">
                Charity Reggae Football Fanz was born from a passion to unite the
                vibrant cultures of football and reggae music while making a
                positive impact in our communities. We believe in the power of
                sport and music to bring people together and create lasting change.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
            >
              <stat.icon className="h-8 w-8 mx-auto text-jamaican-yellow" />
              <div className="mt-4 text-2xl font-semibold text-white">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-white text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
              >
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
                />
                <h3 className="text-lg font-semibold text-white">
                  {member.name}
                </h3>
                <p className="text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-gray-300 mb-8">
            Be part of something special. Join us in making a difference through
            football and music.
          </p>
          <a href="/signup" className="btn-primary">
            Become a Member
          </a>
        </div>
      </div>
    </div>
  );
}