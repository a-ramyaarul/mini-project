document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("res-title").onclick = function () {
    let userName = document.getElementById("text").value.trim();
    document.getElementById("first-title").textContent = userName
      ? `Hello ${userName}! 🚀`
      : "Hi! Welcome to my webpage";
  };

  const main = document.querySelector("body");
  const apiSection = document.createElement("section");
  apiSection.innerHTML = `<h2 style="text-align:center; margin:20px 0; color:#ffcc00;">Latest SpaceX Launches</h2>
                          <div id="launch-container" class="card-container"></div>`;
  main.appendChild(apiSection);

  const container = document.getElementById("launch-container");
  container.innerHTML = "<p>Loading latest launches...</p>";

  fetch("https://api.spacexdata.com/v4/launches/past")
    .then((res) => res.json())
    .then((data) => {
      container.innerHTML = ""; 
      
      data.slice(-6).reverse().forEach((launch) => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
          <h3>${launch.name}</h3>
          <p><b>Date:</b> ${new Date(launch.date_utc).toDateString()}</p>
          <p>${launch.details ? launch.details : "No details available."}</p>
          ${launch.links.patch.small ? `<img src="${launch.links.patch.small}" alt="mission patch">` : ""}
          <a href="${launch.links.webcast}" target="_blank">🔗 Watch Webcast</a>
        `;

        container.appendChild(card);
      });
    })
    .catch((err) => {
      container.innerHTML = `<p style="color:red;">⚠️ Failed to load data. Please try again later.</p>`;
      console.error("API Error:", err);
    });
});
