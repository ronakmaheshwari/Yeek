# YEEK 🗣️

A full-stack, geolocation-based, real-time social media application inspired by Yik Yak. This app allows users to post anonymously within a specific geographic radius, upvote/downvote posts, and engage in discussions via comments — all updated in real time using **Socket.io**.

## **Features**

- **Anonymous Posting**: Users can post without signing in.
- **Geolocation-Based Posts**: Posts are tied to the user's current location and displayed within a configurable radius.
- **Real-Time Updates**: Posts, votes, and comments are updated in real-time across all users using **Socket.io**.
- **Upvotes/Downvotes**: Users can vote on posts in real-time.
- **Comments**: Users can add comments to posts and engage in discussions.
- **Responsive Design**: The fully responsive app works on all device sizes.

## **Tech Stack**

### **Frontend**:
- **React** (with Vite)
- **CSS** (for styling)
- **Socket.io-client** (for real-time updates)

### **Backend**:
- **Node.js** (with Express)
- **PostgreSQL** (with PostGIS for geospatial data)
- **Socket.io** (for real-time communication)

### **Database**:
- **PostgreSQL** with **PostGIS** extension for geolocation queries.

### **Real-Time Communication**:
- **Socket.io** for real-time updates.

### **Geolocation**:
- Browser **Geolocation API** is used to fetch the user's current location.

---

## **Getting Started**

### **Prerequisites**

Make sure you have the following installed on your system:

- **Node.js** (v12+)
- **PostgreSQL** (v12+)
- **npm** (v6+)
- **Vite CLI**

---

### **Installation**

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/YEEK.git
    cd YEEK
    ```

2. **Backend setup**:

    Navigate to the backend directory:

    ```bash
    cd yeek-backend
    ```

    Install dependencies:

    ```bash
    npm install
    ```

    Create a `.env` file and configure your environment variables:

    ```bash
    DATABASE_URL=your_postgres_database_url
    PORT=5000
    ```

    Run the backend:

    ```bash
    npm run dev


3. **Frontend setup**:

    Navigate to the frontend directory:

    ```bash
    cd ../yeek-frontend
    ```

    Install dependencies:

    ```bash
    npm install
    ```

    Start the frontend development server:

    ```bash
    npm run dev
    ```

    The app will now be running at `http://localhost:5173`.



## **File Structure**


YEEK/
├──yeek-backend/             # Backend (Node.js, Express, PostgreSQL)
│   ├── index.js                 # Main server file
│   ├── .env                     # Environment variables
│   └── package.json             # Backend dependencies
├── yeek-frontend/            # Frontend (React, Vite)
│   ├── src/                     # React source files
│   │   ├── components/          # Reusable components
│   │   ├── App.jsx              # Main React component
│   │   └── main.jsx             # Entry point
│   ├── public/                  # Static assets
│   ├── package.json             # Frontend dependencies
│   └── vite.config.js           # Vite configuration
└── README.md                    # Project documentation
