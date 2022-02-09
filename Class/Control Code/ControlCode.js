// Control Code

function autoRefreshDiv() {
  document.getElementById("controlCode").innerHTML = Math.floor(Math.random()* 898) + 101
}
setInterval(autoRefreshDiv, 1000);  // Time is set in milliseconds

