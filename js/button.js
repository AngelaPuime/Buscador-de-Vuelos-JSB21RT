const toggleTheme = document.querySelector("input[type='checkbox']");

function changeTheme(e) {
	console.log(e.target);
}
toggleTheme.addEventListener("click", changeTheme);
