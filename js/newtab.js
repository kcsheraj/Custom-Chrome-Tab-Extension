// newtab.js

document.addEventListener("DOMContentLoaded", function () {
  // Code inside this function will be executed once the DOM is fully loaded.
  // Fetch a random image from Unsplash API
  fetch("https://source.unsplash.com/random/1920x1080/?NATURE")
    .then((response) => {
      // Get the URL of the random image
      const imageUrl = response.url;
      // Set the background image of the body element
      document.body.style.backgroundImage = `url(${imageUrl})`;

      // Call updateTime() initially to display the time immediately
      updateTime();
      showSecondsOnHover();
    })
    .catch((error) => console.error("Error fetching random image:", error));

  // Fetch a random quote from Quotable API
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      // Set the quote text to the h2 element
      document.getElementById("quote").textContent = data.content;
    })
    .catch((error) => console.error("Error fetching random quote:", error));

  //GREETING STORAGE
  const greeting = "Hello, ";
  // Load saved name from storage
  chrome.storage.local.get(["name"], function (result) {
    if (result.name) {
      document.getElementById("name").textContent = greeting + result.name;
    }
  });
  // Listen for changes in the name and save it to storage
  document.getElementById("name").addEventListener("input", function () {
    const name = this.textContent;
    chrome.storage.local.set({ name: name });
  });
});

//TIME FUNCTIONS
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var meridiem = hours < 12 ? "AM" : "PM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Handles the case when hours is 0//logical operator

  var minutes = now.getMinutes();

  // Convert hours and minutes to strings
  // without leading zeros
  hours = hours.toString();
  minutes = minutes.toString();

  // Add leading zero if necessary
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }

  var timeString = hours + ":" + minutes + " " + meridiem;

  document.getElementById("time").textContent = timeString;
}
function updateTimeSeconds() {
  var now = new Date();
  var hours = now.getHours();
  var meridiem = hours < 12 ? "AM" : "PM";

  // Convert hours to 12-hour format
  hours = hours % 12 || 12; // Handles the case when hours is 0

  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Convert hours, minutes, and seconds to strings
  // without leading zeros
  hours = hours.toString();
  minutes = minutes.toString();
  seconds = seconds.toString();
  // Add leading zero if necessary
  if (minutes.length < 2) {
    minutes = "0" + minutes;
  }

  var timeString = hours + ":" + minutes + ":" + seconds + " " + meridiem;

  document.getElementById("time").textContent = timeString;
}
function showSecondsOnHover() {
  var timeElement = document.getElementById("time");
  var intervalId; // Variable to store the interval ID

  timeElement.addEventListener("mouseenter", function () {
    timeElement.style.color = "cornflowerblue";
    updateTimeSeconds();
    intervalId = setInterval(updateTimeSeconds, 1000); // Store the interval ID
  });

  timeElement.addEventListener("mouseleave", function () {
    timeElement.style.color = ""; // Reset to default color
    updateTime();
    clearInterval(intervalId); // Clear the interval for updateTimeSeconds()
  });
}
// Call updateTime() every second to update the time
setInterval(updateTime, 5000);
