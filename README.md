#  IPL Cricket Expert Chatbot

A purpose-built IPL cricket chatbot with a dark, stadium-inspired UI. You can ask anything about IPL — teams, players, records, stats, history, and more.

---

##  Why I Built This

I’m personally a big IPL fan, and since the 2026 season is going on, I thought it would be interesting to build something around cricket instead of a generic chatbot.

Instead of just creating a simple chat interface, I focused on making the experience feel like a real cricket product — something that matches the vibe of IPL.

---

##  Features

* 🏏 **Topic-focused chatbot** — Designed specifically for IPL-related queries
* 💬 **Suggested questions on load** — Helps users get started instantly
* ⏳ **Typing indicator** — Shows when the bot is generating a response
* ❌ **Themed error states** — e.g., “Bowled out! 😅 Try again”
* 📱 **Responsive design** — Works across mobile and desktop
* 🌑 **Dark stadium-style UI** — Clean and immersive interface

---

## 📌 What I Focused On

* Making the chatbot feel like a real product, not just an API wrapper
* Improving first-time user experience (no empty screen confusion)
* Handling loading and error states properly
* Adding small UI details to make interaction smooth

---

## 🛠️ Tech Stack

| Tool         | Purpose              |
| ------------ | -------------------- |
| React (CRA)  | Frontend development |
| Tailwind CSS | Styling              |
| React Router | Navigation           |
| Gemini API   | AI responses         |
| React | Icons                |
| Vercel       | Deployment           |

---

## 📁 Project Structure

src/
├── components/
│   ├── ChatInput.jsx
│   ├── ChatWindow.jsx
│   └── SuggestedQuestions.jsx
├── lib/
│   └── systemPrompt.js
├── pages/
│   ├── HomePage.jsx
│   └── ChatPage.jsx
└── App.js

---

## 🎨 Design Decisions

* Dark theme (#050a14) to give a night stadium feel
* Suggested questions to avoid blank screen on first load
* Typing animation to make interaction feel alive
* Simple and clean layout for better readability
* Sticky header to make it feel like a real chat app

