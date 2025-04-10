const maindiv = document.querySelector("main");

async function Fetcha(input) {
	let res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${input.toLowerCase()}`
	);
	let data = await res.json();
	return data;
}
async function get() {
	let adata = await Fetcha("tag");
	Print(adata);
}

function Print(data) {
	console.log(data[0]);
}

function Add(meanings, tag, Synonyms) {
	const meaningsDiv = document.createElement("div");
	meaningsDiv.className = "meanings";

	const firstDiv = document.createElement("div");
	const nounParagraph = document.createElement("p");
	nounParagraph.textContent = tag;
	const hrElement = document.createElement("hr");

	firstDiv.appendChild(nounParagraph);
	firstDiv.appendChild(hrElement);

	meaningsDiv.appendChild(firstDiv);

	const meaningParagraph = document.createElement("p");
	meaningParagraph.textContent = "Meaning";
	meaningsDiv.appendChild(meaningParagraph);

	const meaningsList = document.createElement("ul");

	meanings.forEach((meaning) => {
		const listItem = document.createElement("li");
		listItem.textContent = meaning;
		meaningsList.appendChild(listItem);
	});

	meaningsDiv.appendChild(meaningsList);

	const synonymsDiv = document.createElement("div");
	const synonymsParagraph = document.createElement("p");
	synonymsParagraph.textContent = "Synonyms";
	const synonymText = document.createElement("p");
	synonymText.textContent = Synonyms;

	if (Synonyms != "") {
		synonymsDiv.appendChild(synonymsParagraph);
		synonymsDiv.appendChild(synonymText);
	}

	meaningsDiv.appendChild(synonymsDiv);

	maindiv.appendChild(meaningsDiv);
}
