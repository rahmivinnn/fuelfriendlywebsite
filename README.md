<<<<<<< HEAD
# FuelFriendly Web Application

FuelFriendly is an interactive web application for fuel stations and their customers. This project implements a modern, responsive interface with various features for both station owners and customers.

## Features

### Core Features
- Interactive website with admin panel
- Multiple access levels (1, 2, 3)
- Two different access types for admin and website
- Superior admin control with specific access code
- Simplified login for fuel partners

### Enhanced Features
- Atomic Design methodology
- Dark mode support
- JWT authentication
- PWA capabilities
- Interactive maps
- Analytics dashboard
- Real-time notifications

### Technologies Used
- React
- TypeScript
- Tailwind CSS
- React Hook Form with Yup validation
- Socket.io for real-time features
- Framer Motion for animations

## Pages and Components

### Main Pages
- **Home**: Landing page with key features
- **Nearby Stations**: Find fuel stations with country and city selection
- **Station Registration**: Register as a fuel station partner
- **Login**: Simplified login for fuel partners
- **Station Dashboard**: Main dashboard for station owners
- **Earnings & Transactions**: Track earnings and manage transactions
- **Admin Dashboard**: Admin control panel with user management

### Key Components
- **NearbyStations**: Interactive component to find stations by location
- **PartnerLogin**: Simplified login component for fuel partners
- **ChatBot**: Interactive assistant for user help
- **EarningsTransactions**: Financial tracking and management

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fuelfriendly.git
cd fuelfriendly
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Deployment

The project is configured for deployment to Vercel:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings
4. Deploy

## Project Structure

```
src/
├── components/
│   ├── atoms/       # Basic building blocks
│   ├── molecules/   # Combinations of atoms
│   ├── organisms/   # Complex components
│   └── ui/          # Shadcn UI components
├── contexts/        # React contexts
├── hooks/           # Custom hooks
├── pages/           # Page components
├── services/        # API services
└── utils/           # Utility functions
```

## Authentication

The application uses a simplified authentication system:

- **Regular Users**: Basic access to find stations and request fuel
- **Station Owners**: Access to station dashboard and management features
- **Admins**: Access to admin dashboard with user management
- **Superior Admin**: Complete control with special access code

## Dark Mode

The application supports dark mode, which can be toggled in the user interface. The theme preference is saved in local storage.

## PWA Support

The application is configured as a Progressive Web App (PWA) with:

- Service worker for offline support
- Installable on mobile devices
- App-like experience

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Shadcn UI](https://ui.shadcn.com/) for the UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [React Hook Form](https://react-hook-form.com/) for form handling
- [Yup](https://github.com/jquense/yup) for form validation
=======
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/b76c223a-e90e-41cd-a75b-3915f5759dc6

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/b76c223a-e90e-41cd-a75b-3915f5759dc6) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/b76c223a-e90e-41cd-a75b-3915f5759dc6) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
>>>>>>> fc50f12d78601307538b9c65c6925970812ed209
