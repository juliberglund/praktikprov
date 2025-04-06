let currentpage = 1;
let totalpages = 10;

async function getProfiles() {
  const response = await fetch("https://randomuser.me/api/?results=50");

  const data = await response.json();
  const containerDiv = document.getElementById("secret-profile-gallery");

  data.results.forEach((profile) => {
    const profileDiv = document.createElement("div");
    profileDiv.className = "profileDiv";
    profileDiv.dataset.gender = profile.gender;
    profileDiv.dataset.firstName = profile.name.first;

    // const profileName = profile.name;

    // const profileEmail = profile.email;
    // const profileImg = profile.picture.thumbnail;

    profileDiv.innerHTML = `
    
        <img src="${profile.picture.medium}">
        <h2>${profile.name.first} ${profile.name.last}</h2>
        <h3>${profile.email}</h3>
        <p>${profile.gender}</p>
        
    `;

    containerDiv.appendChild(profileDiv);
  });

  let currentPage = 1;
  let totalPages = 10;

  if (currentPage >= totalPages) {
    document.getElementById("load").style.display = "none";
  } else {
    document.getElementById("load").style.visibility = "visible";
  }

  currentPage++;

  document.getElementById("load").addEventListener("click", getProfiles);

  const search = document.getElementById("search");
  search.addEventListener("input", () => {
    const searchTerm = search.value.toLocaleLowerCase();
    const filterProfiles = data.results.filter((profile) =>
      profile.name.first.toLocaleLowerCase().startsWith(searchTerm)
    );
    containerDiv.innerHTML = "";

    filterProfiles.forEach((profile) => {
      const profileDiv = document.createElement("div");
      profileDiv.className = "profileDiv";
      profileDiv.dataset.gender = profile.gender;

      profileDiv.innerHTML = `
        <img src="${profile.picture.medium}" alt="Profile Picture">
        <h2>${profile.name.first} ${profile.name.last}</h2>
        <h3>${profile.email}</h3>
        <p>${profile.gender}</p>
      `;

      containerDiv.appendChild(profileDiv);
    });
  });

  //Identity/gender
  function filterGender(character) {
    const allProfiles = document.querySelectorAll(".profileDiv");

    allProfiles.forEach((element) => {
      if (character === "all" || element.dataset.gender === character) {
        element.style.visibility = "visible";
      } else {
        element.style.visibility = "hidden";
      }
    });
  }

  document
    .getElementById("reset")
    .addEventListener("click", () => filterGender("all"));
  document
    .getElementById("female")
    .addEventListener("click", () => filterGender("female"));
  document
    .getElementById("male")
    .addEventListener("click", () => filterGender("male"));
}

getProfiles();
