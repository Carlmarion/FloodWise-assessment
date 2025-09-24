// Replace with your own API key obtained from NASA's website
const API_KEY = "YOUR_API_KEY";

// HELPERS FUNCTIONS
// organize the date for today first

const isTodayImage = (dateString) => {
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    new Date(dateString).toLocaleDateString("en-US", dateOptions) ===
    new Date().toLocaleDateString("en-US", dateOptions)
  );
};
const getDateRange = () => {
  const today = new Date();
  const twentyDaysAgo = new Date();
  twentyDaysAgo.setDate(today.getDate() - 20);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Order on NASA's API is FROM 20 days ago TO today, not the opposite.
  return {
    startDate: formatDate(twentyDaysAgo),
    endDate: formatDate(today),
  };
};

const getPlanetsURL = () => {
  const { startDate, endDate } = getDateRange();
  return `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}&start_date=${startDate}&end_date=${endDate}`;
};

const getPlanets = async () => {
  const url = getPlanetsURL();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    if (Array.isArray(data)) {
      return data.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  } catch (error) {
    console.error("Error fetching planets:", error);
    throw error;
  }
};

let validPlanetsGlobal = [];

// DISPLAY FUNCTIONS
const displayPlanets = (planets, isSearchResult = false) => {
  const planetsContainer = document.getElementById("planets");
  planetsContainer.innerHTML = "";

  // Only filter for valid images if this is the initial load, not a search result
  let planetsToShow = planets;
  if (!isSearchResult) {
    planetsToShow = planets.filter(
      (planet) =>
        planet &&
        !planet.msg &&
        planet.media_type === "image" &&
        planet.url &&
        /\.(jpg|jpeg|png|gif|webp)$/i.test(planet.url)
    );
    validPlanetsGlobal = planetsToShow;
  }

  if (planetsToShow.length === 0) {
    planetsContainer.innerHTML = "<p>No articles are matching your search.</p>";
    return;
  }

  planetsToShow.forEach((planet) => {
    const planetCard = document.createElement("div");
    planetCard.classList.add("planet-card");

    const isToday = isTodayImage(planet.date);
    const todayBadge = isToday
      ? '<span class="today-badge">Latest picture</span>'
      : "";

    const formattedDate = new Date(planet.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const fullText = planet.explanation;
    const truncatedText = planet.explanation.slice(0, 150) + "...";

    planetCard.innerHTML = `
      <img src="${planet.url}" alt="${planet.title}" loading="lazy">
      <div class="card-header">
        <h3>${planet.title}</h3>
        ${todayBadge}
      </div>
      <p class="date">${formattedDate}</p>
      <p class="planet-text">${truncatedText}</p>
      <button class="toggle-text">Read more</button>
    `;

    const textElement = planetCard.querySelector(".planet-text");
    const toggleButton = planetCard.querySelector(".toggle-text");

    toggleButton.addEventListener("click", () => {
      if (textElement.textContent === truncatedText) {
        textElement.textContent = fullText;
        toggleButton.textContent = "Show less";
      } else {
        textElement.textContent = truncatedText;
        toggleButton.textContent = "Read more";
      }
    });

    planetsContainer.appendChild(planetCard);
  });
};

const setupSearch = () => {
  const searchInput = document.getElementById("search-input");

  if (!searchInput) {
    console.error("Search input not found!");
    return;
  }

  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase().trim();

    if (searchValue === "") {
      displayPlanets(validPlanetsGlobal, true);
      return;
    }

    const filteredPlanets = validPlanetsGlobal.filter((planet) =>
      planet.title.toLowerCase().includes(searchValue)
    );

    displayPlanets(filteredPlanets, true);
  });
};

const loading = () => {
  const planetsContainer = document.getElementById("planets");
  planetsContainer.innerHTML =
    "<img src='assets/globe.png' alt='Loading...' class='loading-animation'>Loading...</img>";
};

const init = async () => {
  try {
    loading();
    const planets = await getPlanets();
    displayPlanets(planets);
    setupSearch();
  } catch (error) {
    console.error("Error fetching planets:", error);

    const planetsContainer = document.getElementById("planets");
    planetsContainer.innerHTML =
      "<p>Error loading planets. Please try again later.</p>";
  }
};

document.addEventListener("DOMContentLoaded", init);
