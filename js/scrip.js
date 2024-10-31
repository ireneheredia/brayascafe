document.addEventListener("DOMContentLoaded", function() {
    // Set the current year in the footer
    const year = new Date().getFullYear();
    document.getElementById("footer-year").textContent = year;

    // Load menu items from XML
    if (document.getElementById("menu-items")) {
        loadMenuItems();
    }

    // Load branches from XML
    if (document.getElementById("branches")) {
        loadBranches();
    }

    // Handle form submission
    const form = document.getElementById("enquiry-form");
    if (form) {
        form.addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Your message has been sent!");
            form.reset();
        });
    }
});

function loadMenuItems() {
    fetch("js/menu.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const meals = xmlDoc.getElementsByTagName("meal");
            let html = "<h2>Meals</h2><ul>";
            for (let meal of meals) {
                html += `<li>
                            <img src="${meal.getElementsByTagName("image")[0].textContent}" alt="${meal.getElementsByTagName("name")[0].textContent}">
                            <strong>${meal.getElementsByTagName("name")[0].textContent}</strong> - ${meal.getElementsByTagName("description")[0].textContent}
                            <br>Price: $${meal.getElementsByTagName("price")[0].textContent}
                          </li>`;
            }
            html += "</ul>";
            document.getElementById("menu-items").innerHTML = html;
        })
        .catch(error => console.error("Error loading menu items:", error));
}

function loadBranches() {
    fetch("branches.xml")
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            const branches = xmlDoc.getElementsByTagName("branch");
            let html = "<h2>Branches</h2><ul>";
            for (let branch of branches) {
                html += `<li>
                            <strong>${branch.getElementsByTagName("address")[0].textContent}</strong><br>
                            Contact: ${branch.getElementsByTagName("contact")[0].textContent}<br>
                            Opening Hours: ${branch.getElementsByTagName("opening-hours")[0].textContent}<br>
                            <a href="${branch.getElementsByTagName("google-maps-link")[0].textContent}" target="_blank">View on Google Maps</a>
                          </li>`;
            }
            html += "</ul>";
            document.getElementById("branches").innerHTML = html;
        })
        .catch(error => console.error("Error loading branches:", error));
}
