
# DarkFrame (React Client)

DarkFrame is a full-stack movie discovery app focused on horror and thriller films.

The frontend is built with React and TypeScript and connects to a custom Node.js/Express REST API. Redux Toolkit handles shared state across the application, while React Router manages navigation and protected pages.

DarkFrame was originally written in JavaScript and later migrated incrementally to TypeScript.

## Live Demo
The application is deployed on Netlify:

https://darkframe.netlify.app/


## Features
- Browse and search movies
- View movie details
- Create an account ad log in
- Automatic login after signup
- Add or remove favorite movies
- Update profile information
- Persistent login across page refreshes
- Protected routes for authenticated users
- Backend validation shown directly in the UI
- Loading states during authentication requests

## Tech Stack  

### Frontend
- React
- TypeScript
- Redux Toolkit
- React Router
- React Bootstrap
- SCSS

### Backend (separate repository)
- Node.js
- Express
- MongoDB
- JWT Authentication

- 🔗 Backend Repository: https://github.com/annapgsm/darkframe-api
- 🌐 API Base URL: https://movie-api-o14j.onrender.com/

### Tooling & Deployment
- Parcel
- Netlify

## Architecture Highlights

- Built as a single-page application with React and TypeScript
- Uses Redux Toolkit for shared movie and user state
- Handles client-side routing and protected views with React Router
- Connects to a separate REST API for authentication and movie data
- Persists the authenticated user on the client using local storage
- Uses shared Movie and User types across components and Redux state


## Preview

<img src="./screenshots/home.gif" width="700" />

### Movie Details
<img src="./screenshots/detail.png" width="700" />

### Profile
<img src="./screenshots/profile.png" width="700" />

### Search
<img src="./screenshots/search.gif" width="700" />


## Set up instructions

### Prerequisites
- Node.js and npm installed
- Running instance of the MyFlix API 

### Steps
1. **Clone the repository**  
   ```bash
   git clone https://github.com/annapgsm/darkframe-client.git
   cd darkframe-client
2. **Install dependencies** 
   ```bash
   npm install
3. **Environment  variables**
-  Create a .env file in the root of the project and add:
  ```bash
REACT_APP_API_URL=https://movie-api-o14j.onrender.com/
 ```

- The React app uses this environment variable to make API requests. Make sure your API calls reference `process.env.REACT_APP_API_URL`.

4. **Run locally**
 ```bash
   parcel src/index.html 

```

## What I learned
- Migrated an existing React app from JavaScript to TypeScript
- Used Redux Toolkit to manage shared application state
- Improved my understanding of when state should stay local and when it belongs in Redux
- Worked with typed API responses and nullable data
- Improved authentication flows with loading states and clearer error handling
- Connected the frontend to a REST API and handled user data across sessions



