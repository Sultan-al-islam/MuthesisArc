# Mu ThesisArc

Mu ThesisArc is a modern, full-stack university thesis archive platform designed to help students discover, upload, and manage academic research. Built with the **MERN** stack, it features a clean, high-performance interface with a professional white, red, and blue aesthetic.

## 🚀 Features

-   **User Authentication**: Secure registration and login system using JWT (JSON Web Tokens) and bcrypt for password hashing.
-   **Thesis Management**:
    -   Upload theses with title, author, abstract, and department details.
    -   Integrate external links for **Google Drive (PDF)** and **Google Colab**.
    -   Authenticated users can independently **edit** or **delete** their own research papers.
-   **Advanced Search**: Instantly filter theses by title or department.
-   **Profile Management**: Update your academic details and account password.
-   **Premium UI/UX**:
    -   Responsive design using **Tailwind CSS**.
    -   Dynamic animations and glassmorphism effects.
    -   Consistent branding with custom Red & Blue color palette.

## 🛠️ Tech Stack

### Frontend
-   **React 19**: Modern component-based architecture.
-   **Vite**: Lightning-fast build tool and dev server.
-   **Tailwind CSS**: Utility-first styling for a custom, premium design.
-   **Lucide React**: Beautifully crafted icons.
-   **Axios**: For seamless API communication.

### Backend
-   **Node.js & Express**: Robust and scalable server environment.
-   **MongoDB & Mongoose**: Flexible NoSQL database with schema-based modeling.
-   **JWT & BcryptJS**: Industry-standard security and authentication.
-   **Multer & Cloudinary**: (Ready for integration) handling file uploads and media storage.

## 📦 Installation & Setup

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/Sultan-al-islam/MuthesisArc.git
    cd MuthesisArc
    ```

2.  **Install Dependencies**:
    *   Root/Backend dependencies:
        ```bash
        npm install
        ```
    *   Frontend dependencies:
        ```bash
        npm install --prefix frontend
        ```

3.  **Environment Variables**:
    Create a `.env` file in the root directory and add the following:
    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

4.  **Run the Application**:
    You can run both frontend and backend concurrently using the dev script:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000` and the frontend on `http://localhost:5173`.

## 📂 Project Structure

```
MuthesisArc/
├── backend/            # Express server, routes, and controllers
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Auth and error handling
│   └── server.js       # Entry point
├── frontend/           # React application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main page views
│   │   ├── context/    # Auth state management
│   │   └── App.jsx     # Root component
│   └── tailwind.config.js
└── README.md
```

## 📜 License

This project is licensed under the ISC License.

---
Built with ❤️ by Sultan-al-islam
