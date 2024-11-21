# Kids Activity Generator 🎮

An interactive web application that helps parents discover engaging, educational activities for children through AI-powered suggestions. Built with React, Vite, and enhanced with playful animations and gamification features.

## ✨ Features

### Core Functionality
- **AI-Powered Activity Generation**: Get personalized activity suggestions based on age and interests
- **Activity Journal**: Track completed activities and progress
- **Points System**: Earn points for completing activities
- **Virtual Pet**: Interactive companion that encourages and celebrates achievements

### Interactive Elements
- **Special Effects**:
  - Rainbow Trail: Leave colorful trails as you move
  - Sparkle Effect: Create magical sparkles around your cursor
- **Virtual Pet Costumes**:
  - Wizard Costume: Magical floating animations
  - Superhero Costume: Dynamic flying movements
- **Theme Customization**: Transform the app's appearance with different color schemes

### Rewards & Gamification
- Activity Completion: +50 points
- First Daily Activity: +100 points
- Daily Streak: +25 points
- Weekend Bonus: +30 points

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/kids-activity-generator.git
cd kids-activity-generator
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory:
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🛠️ Built With

- [React](https://reactjs.org/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [OpenAI API](https://openai.com/) - Activity Generation
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Special Effects

## 📦 Project Structure

```
src/
├── components/
│   ├── effects/         # Special effects components
│   ├── pet/            # Virtual pet system
│   ├── ActivityModal/  # Activity display
│   ├── ActivityJournal/# Progress tracking
│   └── ...
├── styles/             # Global styles and Tailwind config
├── utils/              # Utility functions
└── App.jsx            # Main application component
```

## 🎮 Features in Detail

### Activity Generation
- Age-appropriate suggestions
- Educational value focus
- Step-by-step instructions
- Required materials list
- Fun facts integration

### Virtual Pet System
- Interactive companion
- Customizable costumes
- Encouraging messages
- Drag-and-drop interaction
- Persistent customization

### Points & Rewards
- Daily streaks
- Achievement system
- Unlockable content
- Special effects
- Theme customization

## 🔧 Configuration

### Environment Variables
```env
VITE_OPENAI_API_KEY=your_api_key_here
```

### Tailwind Configuration
The project uses a custom Tailwind configuration for consistent styling:
- Custom color palette
- Extended animations
- Responsive design utilities

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for the API integration
- The React and Vite communities
- All contributors and users of the application

## 🔮 Future Plans

- User authentication system
- Cloud progress synchronization
- More activity categories
- Enhanced reward system
- Social sharing features
- Multiplayer challenges
- Parent dashboard
- Progress analytics
- Accessibility improvements

---

Made with ❤️ for kids and parents everywhere
