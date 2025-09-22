# News Explorer Frontend

A modern news exploration application built with **Next.js 15**, **React 19**, and **TypeScript**, featuring real-time news search, user authentication, and a localStorage-based bookmark system ready for backend integration.

## 🌟 Features

### ✨ Core Functionality

- **Real-time News Search**: Search news articles using the NewsAPI with live results
- **User Authentication**: Login system with test credentials (`test@test.com` / `password123`)
- **Bookmark System**: Save and manage favorite articles with user-specific storage
- **Responsive Design**: Mobile-first design that adapts to all screen sizes
- **Dynamic Keyword Display**: Smart keyword extraction and formatting from saved articles

### 🎨 UI/UX Features

- **Modern Interface**: Clean, intuitive design with Tailwind CSS
- **Loading States**: Smooth preloader animations for better user experience
- **Responsive Grid**: Adaptive news grid (1-2-3 columns based on screen size)
- **Interactive Navigation**: Context-aware navigation with login/logout states
- **Toast Notifications**: User feedback for actions and errors

### 🏗️ Architecture

- **Context-based State Management**: React Context for user and bookmark state
- **Backend-ready Architecture**: Designed for easy API integration when backend is ready
- **TypeScript**: Fully typed for better development experience and reliability
- **Component-based**: Modular, reusable components following React best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- NewsAPI key (get it from [newsapi.org](https://newsapi.org/))

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd news-explorer-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### Authentication

- Click "Ingresar" to open the login modal
- Use test credentials: `test@test.com` / `password123`
- Upon successful login, navigation updates to show "Artículos guardados" and "Cerrar sesión"

### Searching News

- Use the search bar to find news articles
- Results are fetched in real-time from NewsAPI
- Default search loads "tecnología" articles

### Managing Bookmarks

- Click the bookmark icon on any article to save it
- Saved articles appear in "Artículos guardados" section
- Each user has separate bookmark storage
- Click trash icon to remove saved articles

## 🛠️ Tech Stack

### Core Technologies

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React version with new features
- **TypeScript 5** - Type safety and developer experience
- **Tailwind CSS 4** - Utility-first CSS framework

### Key Dependencies

- **React Context** - State management for user and bookmarks
- **NewsAPI** - Real news data source
- **js-cookie** - Client-side cookie handling
- **React Icons** - Icon components
- **React Toastify** - Toast notifications

### Development Tools

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Turbopack** - Fast bundler for development and build

## 📂 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Home page with news search
│   └── saved-news/        # Saved articles page
├── components/            # React components
│   ├── Header.tsx         # Main header with navigation
│   ├── NewsItem.tsx       # Individual news card
│   ├── Login.tsx          # Login modal
│   ├── Navigation.tsx     # Navigation menu
│   └── ...               # Other components
├── contexts/              # React Context providers
│   ├── CurrentUserProvider.tsx    # User authentication state
│   ├── SavedArticlesProvider.tsx  # Bookmark management
│   └── AppProviders.tsx          # Combined providers
├── hooks/                 # Custom React hooks
├── styles/                # CSS modules and global styles
├── utils/                 # API utilities and helpers
│   ├── NewsApi.ts         # NewsAPI integration
│   ├── Api.ts             # Base API class
│   └── ...               # Other utilities
└── vendor/                # Third-party configurations
```

## 🔧 Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
```

## 🌐 API Integration

### Current Implementation

- **News Data**: Real news articles from NewsAPI
- **User Storage**: localStorage for user sessions and bookmarks
- **Backend-ready**: Architecture designed for easy API swap

### NewsAPI Configuration

The app uses NewsAPI for fetching real news data:

- **Language**: Spanish (`es`)
- **Date Range**: Last 7 days
- **Sorting**: By published date
- **Default Query**: "tecnología"

### Backend Transition

The application is architected to easily transition to a custom backend:

1. **User Authentication**: Replace localStorage logic in `CurrentUserProvider`
2. **Bookmark Management**: Swap localStorage calls in `SavedArticlesProvider`
3. **News Storage**: Add save/retrieve endpoints for user articles

## 🎯 Key Features Implementation

### User Authentication System

- Context-based state management
- Test user credentials for development
- Session persistence across page reloads
- Conditional navigation rendering

### Bookmark System

- User-specific article storage
- localStorage with user ID separation
- Optimistic UI updates
- Backend-ready data structure

### Responsive News Grid

- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (max)
- Centered layout with max-width constraint

### Dynamic Keyword Display

- Automatic keyword extraction from saved articles
- Smart formatting (up to 2 keywords + "y X más.")
- Multilingual support ready

## 🔮 Future Enhancements

### Backend Integration

- User registration and authentication API
- Bookmark synchronization across devices
- User profile management
- Social features (sharing, comments)

### Feature Additions

- Advanced search filters (date, source, category)
- Article categorization and tagging
- Reading progress tracking
- Offline reading capability
- Push notifications for breaking news

### Technical Improvements

- Server-side rendering for better SEO
- Progressive Web App (PWA) capabilities
- Advanced caching strategies
- Performance monitoring and analytics

## 🐛 Development Notes

### Test Credentials

- **Email**: `test@test.com`
- **Password**: `password123`

### Browser Support

- Modern browsers supporting ES2020+
- Mobile browsers (iOS Safari, Chrome Mobile)
- Progressive enhancement for older browsers

### Known Limitations

- NewsAPI free tier rate limits
- localStorage storage limits
- No real user management (development only)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of a portfolio and is intended for educational and demonstration purposes.

---

**Note**: This application currently uses localStorage for data persistence and test authentication. A backend API is planned for future development to enable real user management, data synchronization, and enhanced features.
