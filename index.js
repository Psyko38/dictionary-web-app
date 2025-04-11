const maindiv = document.querySelector("main");
const text = document.querySelector(".Info  h2");
const phoneticse = document.querySelector(".Info  p");
const Links = document.querySelector("a");
const Audios = document.querySelector("#song");
const search = document.querySelector("#Search");
const BtnShearch = document.querySelector("#BtnShearch");
const divInfo = document.querySelector("div.Info");
const footer = document.querySelector("footer");
const checkbox = document.querySelector("#checkbox");
const fonte = document.querySelector("#font");

let audio = "";
let dataList = [];
let theme = 0;
let holdsearch = "";
let searchs = 0;

fonte.addEventListener("input", () => {
	document.documentElement.style.setProperty(
		"--font-primary",
		`${fonte.value}`
	);
});

checkbox.addEventListener("input", () => {
	theme = theme == 1 ? 0 : 1;
	if (theme == 1) {
		document.documentElement.style.setProperty("--color-white", "#ffffff");
		document.documentElement.style.setProperty(
			"--color-background-primary",
			"#050505"
		);
		document.documentElement.style.setProperty(
			"--color-background-secondary",
			"#1f1f1f"
		);
	} else {
		document.documentElement.style.setProperty("--color-white", "#2D2D2D");
		document.documentElement.style.setProperty(
			"--color-background-primary",
			"#ffffff"
		);
		document.documentElement.style.setProperty(
			"--color-background-secondary",
			"#F4F4F4"
		);
	}
});

Audios.addEventListener("click", () => {
	audio.play();
});

document.addEventListener("keydown", function (event) {
	if (event.key == "Enter") {
		if (search.value == holdsearch) {
			searchs++;
			get(holdsearch, searchs);
		} else {
			holdsearch = search.value;
			searchs = 0;
			get(holdsearch, searchs);
		}
	}
});

BtnShearch.addEventListener("click", () => {
	if (search.value == holdsearch) {
		searchs++;
		get(holdsearch, searchs);
	} else {
		holdsearch = search.value;
		searchs = 0;
		get(holdsearch, searchs);
	}
});

async function Fetcha(input) {
	let res = await fetch(
		`https://api.dictionaryapi.dev/api/v2/entries/en/${input.toLowerCase()}`
	);
	let data = await res.json();
	return data;
}
async function get(word, page) {
	let temp = document.querySelector("main > p");
	if (temp) temp.remove();

	for (let i = 0; i < dataList.length; i++) {
		dataList[i].remove();
	}
	let adata = await Fetcha(word);
	Print(adata, page);
	dataList = document.querySelectorAll(".meanings");
}

function Print(data, page) {
	if (data.title == "No Definitions Found") {
		divInfo.style.display = "none";
		footer.style.display = "none";
		Audios.style.display = "none";
		const p = document.createElement("p");
		p.textContent = "No Definitions Found ;(";
		maindiv.appendChild(p);
		return;
	}
	divInfo.style.display = "flex";
	footer.style.display = "unset";
	Audios.style.display = "unset";
	console.log(data);
	text.textContent = data[page].word;
	Links.textContent = data[page].sourceUrls[page];
	Links.href = data[page].sourceUrls[page];
	phoneticse.textContent = data[page].phonetics[0].text;
	audio = "";
	audio = new Audio(data[page].phonetics[0].audio);
	for (let i = 0; i < data[page].meanings.length; i++) {
		Add(
			data[page].meanings[i].definitions,
			data[page].meanings[i].partOfSpeech,
			data[page].meanings[i].synonyms
		);
	}
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
		const p = document.createElement("p");
		p.textContent = meaning.definition;
		meaningsList.appendChild(listItem);
		listItem.appendChild(p);
		if (meaning.example) {
			const span = document.createElement("span");
			span.textContent = `"${meaning.example}"`;
			listItem.appendChild(span);
		}
	});

	meaningsDiv.appendChild(meaningsList);

	const synonymsDiv = document.createElement("div");
	const synonymsParagraph = document.createElement("p");
	synonymsParagraph.textContent = "Synonyms";
	const synonymText = document.createElement("p");

	Synonyms.forEach((Synonym) => {
		synonymText.textContent += `${Synonym} / `;
	});

	if (Synonyms != "") {
		synonymsDiv.appendChild(synonymsParagraph);
		synonymsDiv.appendChild(synonymText);
	}

	meaningsDiv.appendChild(synonymsDiv);

	maindiv.appendChild(meaningsDiv);
}
