

# 📜 NoteNest – Save & Share Your Notes Effortlessly 🚀  
 

## ✨ Overview  
**NoteNest** is a powerful **Firebase-based** note-saving and sharing web app. It allows users to create, store, and share notes securely in real time.  

🔹 **Built with:** `React.js`, `Firebase`, `React Router`, `Tailwind CSS`  
🔹 **Features:** Secure authentication, real-time database storage, beautiful UI  
🔹 **Deployment:** [Live Demo] (https://note-nest-chi.vercel.app/)  

---

## 🚀 Features  
✅ **Create, Save & View Notes** – Save important information anytime!  
✅ **Secure User Authentication** – Firebase Auth integration.  
✅ **Real-time Database** – Firebase Realtime Database stores and fetches notes instantly.  
✅ **Easy Note Sharing** – Generate unique note URLs for sharing.  
✅ **Mobile Responsive UI** – Fully optimized for all devices.  

---





## 🛠️ Tech Stack  
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)  
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=000)  
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)  

---

## ⚙️ Installation & Setup  
Follow these steps to run **NoteNest** locally:  

### 📌 Prerequisites  
✔️ Install [Node.js](https://nodejs.org/)  
✔️ Create a Firebase project and get API credentials  

### 🔧 Steps to Run  
```bash
# Clone this repository
git clone https://github.com/paramjeetsingh007/NoteNest.git

# Navigate to the project folder
cd NoteNest

# Install dependencies
npm install

# Start the development server
npm start
```
🚀 **Now open** `http://localhost:3000/` in your browser!  

---

## 🔥 Firebase Setup  
1️⃣ Go to [Firebase Console](https://console.firebase.google.com/)  
2️⃣ Create a new project  
3️⃣ Set up Firebase Authentication (Email/Google login)  
4️⃣ Enable Realtime Database  
5️⃣ Copy your Firebase credentials and replace them in `firebase.js`  

```javascript
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  databaseURL: "YOUR_DATABASE_URL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
```

---

## 📜 Folder Structure  
```
📂 NoteNest
 ┣ 📂 public
 ┃ ┗ 📜 index.html
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┗ 📜 ViewPaste.jsx
 ┃ ┣ 📜 firebase.js
 ┃ ┣ 📜 App.js
 ┃ ┣ 📜 index.js
 ┗ 📜 package.json
```

---

## ✨ Upcoming Features  
🚀 **Dark Mode Support**  
🚀 **Markdown Support**   
🚀 **Better UI Animations**  

---

## 🧑‍💻 Contributing  
Contributions are welcome! Feel free to submit a Pull Request.  

```bash
# Fork the repo
git fork https://github.com/paramjeetsingh007/NoteNest.git

# Clone your forked repo
git clone https://github.com/YOUR_GITHUB_USERNAME/NoteNest.git

# Create a new branch
git checkout -b feature-name

# Make changes & commit
git commit -m "Added new feature"

# Push changes
git push origin feature-name

# Open a Pull Request 🎉
```

---

## ⭐ Show Your Support  
If you like **NoteNest**, don’t forget to give it a ⭐ on GitHub!  

🔗 **GitHub Repo:** [NoteNest](https://github.com/paramjeetsingh007/NoteNest)  

🚀 Happy Coding! 💻