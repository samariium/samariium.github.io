# DevOps Portfolio

A modern, terminal-themed DevOps portfolio website built with React and Vite. Showcasing projects, skills, and experience in cloud infrastructure, containerization, and CI/CD automation.

## Features

- ✨ Modern terminal-inspired design with a DevOps theme
- 📱 Fully responsive and mobile-friendly
- ⚡ Built with React and Vite for fast performance
- 🚀 Easy deployment to GitHub Pages
- 🎨 Smooth animations and transitions
- 📧 Contact form with email integration

## Technologies Used

- **Frontend**: React, Vite
- **Styling**: CSS3 with custom animations
- **Deployment**: GitHub Pages
- **Version Control**: Git

## Local Development

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/samariium/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173`

## Building

To create a production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment to GitHub Pages

### Option 1: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy:
```bash
npm run deploy
```

### Option 2: Automatic Deployment with GitHub Actions

Create a `.github/workflows/deploy.yml` file (already included) for automatic deployment on push to main branch.

## Project Structure

```
src/
├── components/
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── Skills.jsx
│   ├── Projects.jsx
│   ├── Experience.jsx
│   ├── Contact.jsx
│   └── Footer.jsx
├── App.jsx
├── index.css
└── main.jsx
public/
```

## Customization

Edit the components in `src/components/` to add your own:
- Personal information in Hero section
- Skills in Skills.jsx
- Projects in Projects.jsx
- Work experience in Experience.jsx
- Contact details in Contact.jsx

## License

This project is open source and available under the MIT License.

## Contact

- **Email**: svsamarsingh@gmail.com
- **GitHub**: [samariium](https://github.com/samariium)
- **LinkedIn**: [Samar Singh](https://linkedin.com/in/samar-singh-42577b1ab)
- **Location**: Dehradun, India

---

Made with ❤️ by Samar Singh
