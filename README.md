# Career Compass Frontend

A React TypeScript frontend for the Career Compass application that uses the RIASEC career assessment model.

## Features

- **User Authentication**: Register and login functionality
- **Career Assessment Quiz**: Interactive quiz based on RIASEC model
- **Results Display**: Shows personality profile and career recommendations
- **Admin Panel**: Manage questions (admin users only)
- **Responsive Design**: Works on desktop and mobile devices

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:5000
```

3. Start the development server:
```bash
npm start
```

## API Integration

The frontend integrates with the following backend endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /questions` - Get all questions
- `POST /test/submit` - Submit quiz answers
- `GET /careers/:code` - Get careers by RIASEC code

## Project Structure

```
src/
├── components/          # Reusable components
│   └── Navbar.tsx      # Navigation component
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   ├── Quiz.tsx        # Assessment quiz
│   ├── Result.tsx      # Results display
│   └── Admin.tsx       # Admin panel
├── services/           # API services
│   ├── api.ts         # Axios configuration
│   └── services.ts    # API service functions
├── types/             # TypeScript type definitions
│   └── index.ts       # Type definitions
├── App.tsx            # Main app component
└── App.css            # Global styles
```

## RIASEC Model

The application uses the RIASEC career assessment model:

- **R - Realistic**: Practical, hands-on, mechanical
- **I - Investigative**: Analytical, scientific, intellectual  
- **A - Artistic**: Creative, expressive, original
- **S - Social**: Helpful, cooperative, caring
- **E - Enterprising**: Leadership, persuasive, ambitious
- **C - Conventional**: Organized, detail-oriented, structured

## Usage

1. Users register/login to access the system
2. Take the career assessment quiz
3. View personalized results with career recommendations
4. Admins can manage questions through the admin panel