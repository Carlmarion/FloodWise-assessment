# Planets of the Milky Way - Astronomy Explorer

This project showcases a vanilla HTML, CSS, and JavaScript implementation that displays NASA's Astronomy Picture of the Day (APOD) images in a responsive grid layout.

## Features

- **Responsive Design**: Adapts from 1 column (mobile) to 3 columns (desktop)
- **Search Functionality**: Filter images by title
- **Interactive Cards**: Expand/collapse descriptions
- **Real-time Data**: Fetches latest 20 days of APOD images
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
- **Visual Polish**: Hover effects, smooth transitions, modern typography

## Project Structure

```
FloodWise-assessment/
├── index.html          # Main HTML file
├── style.css           # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── assets/
│   └── globe.png       # Loading icon
└── README.md           # This file
```

## How to Run

1. **Clone or download** this project folder
2. **Open `index.html`** in your web browser
3. **That's it!** The app will automatically fetch data from NASA's API when you add you API key obtained from NASA's website.

## API Key

go to https://api.nasa.gov/
Then generate API Key - fill the form, get a mail with your API key and paste it in script.js : API_KEY = "YOUR_API_KEY";

## Technologies Used

- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Grid layout, media queries, animations
- **Vanilla JavaScript**: Fetch API, DOM manipulation, event handling

## Browser Compatibility

Works in all modern browsers (Chrome, Firefox, Safari, Edge).

## Assessment Requirements Met

✅ Semantic HTML structure  
✅ Responsive CSS with grid/flexbox  
✅ Vanilla JavaScript with API integration  
✅ Mobile-first responsive design  
✅ Interactive features (search, expand/collapse)  
✅ Clean, maintainable code  
✅ No external frameworks or libraries
