document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/api/plantes")
    .then((res) => res.json())
    .then((plantes) => {
      const list = document.getElementById("plantesList");
      plantes.forEach((plante) => {
        const li = document.createElement("li");
        li.className = "p-4 bg-green-100 rounded shadow";
        li.textContent = `${plante.nom} - ${plante.description}`;
        list.appendChild(li);
      });
    })
    .catch((err) => {
      console.error("Erreur lors de la récupération des plantes :", err);
    });
});
