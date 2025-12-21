# 🌌 Orbit Studios

A stunning 3D space portfolio built with React Three Fiber. Navigate through a solar system where each planet represents a project.

![Orbit Studios Preview](https://via.placeholder.com/800x400/050508/00f5ff?text=Orbit+Studios)

## ✨ Features

- **3D Solar System Navigation** - Click planets to explore projects
- **Responsive Design** - Optimized for mobile and desktop
- **Smooth Animations** - Camera transitions, orbital motion, pulsing effects
- **Performance Optimized** - Adaptive quality based on device capability
- **Sci-Fi Aesthetic** - Neon glows, glassmorphism, retro terminal

## 🛠️ Tech Stack

- **React** + **Vite** - Fast development and builds
- **React Three Fiber** - 3D rendering with Three.js
- **@react-three/drei** - Helpful R3F components
- **@react-three/postprocessing** - Bloom effects
- **Zustand** - State management
- **TailwindCSS** - Styling

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── components/      # 3D and UI components
│   ├── Sun.jsx
│   ├── Planet.jsx
│   ├── Scene.jsx
│   └── ui/          # Modal overlays
├── data/            # Projects and skills data
├── store/           # Zustand state
└── hooks/           # Custom React hooks
```

## 🎨 Customization

Edit `src/data/projects.js` to add your own projects:

```js
{
  id: 'my-project',
  name: 'My Project',
  tagline: 'A cool thing I made',
  description: 'Details about the project...',
  color: '#00f5ff',
  orbitRadius: 5,
  techStack: ['React', 'Node.js'],
  status: 'Completed'
}
```

## 📄 License

MIT License - feel free to use for your own portfolio!
