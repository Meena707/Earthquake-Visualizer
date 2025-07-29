async function fetchEarthquakes() {
    const minMag = parseFloat(document.getElementById("minMag").value);
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      const quakes = data.features.filter(
        (q) => q.properties.mag >= minMag
      );
  
      const output = document.getElementById("output");
      output.innerHTML = "";
  
      if (quakes.length === 0) {
        output.innerHTML = "<p>No earthquakes match the criteria.</p>";
        return;
      }
  
      quakes.forEach((q) => {
        const { place, mag, time, url } = q.properties;
        const date = new Date(time).toLocaleString();
  
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <strong>Location:</strong> ${place}<br>
          <strong>Magnitude:</strong> ${mag}<br>
          <strong>Time:</strong> ${date}<br>
          <a href="${url}" target="_blank">More info</a>
        `;
        output.appendChild(card);
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  