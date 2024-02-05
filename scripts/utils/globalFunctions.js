//Fetch any photographers' data or media

export function getPhotographersData() {
	return fetch("data/photographers.json")
		.then(response => {
			if (response.ok) {
				return response.json();
			} else {
				console.error("Network error, code : " + response.status);
				//Display error message on current page
				const mainTag = document.querySelector("main");
				mainTag.innerText =
					"Erreur réseau lors de la récupération des données";
				mainTag.style.color = "red";
			}
		})
		.catch(error => {
			console.error(error);
		});
}
