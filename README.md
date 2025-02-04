# Mental Health Matters - Online Counseling Platform

A comprehensive mental health assistance platform that connects patients with professional counselors, built with React, TypeScript, and Supabase.

![Mental Health Matters](https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80)

## Features

- 🔐 Secure user authentication
- 👥 Separate patient and counselor profiles
- 📅 Appointment scheduling system
- 💬 Real-time messaging between patients and counselors
- 🔍 Counselor directory with specialties and availability
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Lucide React (icons)
  - React Router DOM
  - React Hot Toast (notifications)

- **Backend:**
  - Supabase (Backend as a Service)
  - PostgreSQL Database
  - Row Level Security
  - Real-time subscriptions

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mental-health-matters.git
cd mental-health-matters
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:
```bash
npm run dev
```

## Database Schema

### Profiles
- User information for both patients and counselors
- Linked to Supabase Auth

### Counselors
- Professional information
- Specialties and expertise
- Availability and rates

### Appointments
- Scheduling system
- Status tracking
- Session notes

### Messages
- Secure communication
- Read receipts
- Real-time updates

## Security

- Row Level Security (RLS) enabled on all tables
- Secure authentication system
- Data access policies
- Protected API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Your Name - [@yourusername](https://twitter.com/yourusername)

Project Link: [https://github.com/yourusername/mental-health-matters](https://github.com/yourusername/mental-health-matters)

## Acknowledgments

- [Supabase](https://supabase.com/) for the backend infrastructure
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
- [Lucide React](https://lucide.dev/) for the beautiful icons