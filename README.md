# 🎬 CineScout – Full-Stack Movie Discovery Platform

CineScout is a modern, full-stack movie search and discovery web application built using **React**, **Appwrite**, and the **OMDb API**. It allows users to explore detailed movie data, search by title, and discover trending content—all while showcasing real-world React development practices.

> 🚧 CineScout v2 coming soon with AI-powered movie assistant!

---

## 🚀 Live Demo

🔗 [https://cine-scout-full-stack-movie-search.vercel.app/] 

---

## 🧰 Tech Stack

- **Frontend**: React.js, Tailwind CSS, Material UI, React Router
- **Data Fetching**: TanStack Query (React Query)
- **Backend**: Appwrite (Database + Auth)
- **API Integration**: OMDb API
- **Hosting**: [your preferred host here – Netlify, Vercel, etc.]

---

## 🔑 Features

### 🎥 Core Movie Features

- **🔍 Intelligent Search** – Find movies by title using real-time, debounced input
- **📈 Trending Algorithm** – Displays top searched movies based on backend logic
- **🎭 Movie Metadata** – Shows actors, directors, ratings, awards, and more
- **🎞️ Upcoming Trailers** – Embed trailers from available external sources

### 🌐 UI/UX & Performance

- **🧱 Modern Design** – Built with Tailwind CSS + Material UI
- **📱 Fully Responsive** – Works seamlessly across devices
- **🦴 Skeleton Loaders** – Smooth loading with Material UI skeleton components
- **♻️ Reusable Components** – Card, Layout, Button, Loader, Input, etc.

### 🔐 Backend & Architecture

- **🔑 Authentication** – Appwrite handles login, signup, and sessions
- **📊 Appwrite DB** – Stores user search logs to power trending feature
- **🚨 Error & Edge Case Handling** – Covers loading, empty states, and fetch failures

---

## ⚛️ React Concepts Mastered

- ✅ "useState", "useEffect", "useRef" for state, side-effects, and DOM refs
- ✅ "useNavigate", 'useParams" for client-side routing & dynamic pages
- ✅ "react-router-dom' v6 for nested routing
- ✅ TanStack Query for fetching, caching, refetching
- ✅ Conditional Rendering for various states (error/loading/empty)
- ✅ Debounced input logic to reduce API overload
- ✅ Component-based architecture for scalability
- ✅ Async data flow & fallback UI design
- ✅ Skeleton UI pattern for async fetch loaders

---

## 📦 Project Structure (Simplified)

src/
│
├── components/ # Reusable UI components (MovieCard, Loader, Input, etc.)
├── pages/ # Route-based views (Home, MovieDetails, etc.)
├── api/ # OMDb API fetch logic and Appwrite integration
├── assets/ # Images, icons, styles
├── appwrite.js # Configs for Appwrite client & DB logic
└── App.jsx # Route setup and base layout



---

## 🧠 Roadmap – CineScout v2

- 🤖 **GPT-powered Movie Assistant** – Ask questions, get AI-based summaries
- 🧠 **Semantic Search** – Discover movies with natural language queries
- 🎯 **Personalized Recommendations** – Based on Appwrite analytics and user patterns

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to fork the repo and submit a PR.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- [OMDb API](http://www.omdbapi.com/)
- [Appwrite](https://appwrite.io/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Material UI](https://mui.com/)

