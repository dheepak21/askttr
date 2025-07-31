import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { knowledgeBase } from './knowledgeBase.js';
import admin from 'firebase-admin';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


// API to Authenticate User (Username & Password)
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Missing Username or Password" });
  }

  try {
    const querySnapshot = await db.collection("users")
      .where("username", "==", username)
      .where("password", "==", password)
      .get();

    if (querySnapshot.empty) {
      return res.status(401).json({ success: false, message: "Invalid Username or Password" });
    } else {
      return res.status(200).json({ success: true, message: "Login Successful" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

// API to Process Chatbot Questions
app.post('/api/getAnswer', (req, res) => {
  const { question, username } = req.body;
  const lowerQuestion = question.toLowerCase();

  let response = "Sorry, I can answer questions about PNR, train status, IRCTC, Tatkal, and ticket cancellation.";

  for (const item of knowledgeBase) {
    if (item.keywords.some(keyword => lowerQuestion.includes(keyword))) {
      response = typeof item.answer === "function" ? item.answer(username) : item.answer;
      break;
    }
  }

  res.json({ answer: response });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
