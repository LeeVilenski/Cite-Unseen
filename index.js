// Store all elements with tag name 'ref':
var refs = document.getElementsByTagName("cite");

fetchURLs();

async function fetchURLs() {
	try {
		// Fetch categorized domain strings and MediaBiasFactCheck data:
		var data = await Promise.all([
			fetch("https://raw.githubusercontent.com/KevinPayravi/Cite-Unseen/master/categorized-domain-strings.json").then((response) => response.json()),
			fetch("https://raw.githubusercontent.com/KevinPayravi/Cite-Unseen/master/data.json").then((response) => response.json())
		]);

		processFetchedData(data);

	} catch (error) {
		console.log("Cite Unseen error: " + error);
	}
}

function processFetchedData(data) {
	// Store categorized domain strings:
	var categorizedDomainStrings = data[0];

	// Instantiating object of arrays for bias ratings:
	var biasArrays = {"domainsBiasLeft":[],"domainsBiasLeftCenter":[],"domainsBiasCenter":[],"domainsBiasRightCenter":[],"domainsBiasRight":[],"domainsBiasFakeNews":[],"domainsBiasConspiracy":[],};

	// Process MediaBiasFactCheck data:
	data = data[1];
	Object.keys(data).forEach(function(k) {
		if(data[k].bias === "left") {
			biasArrays.domainsBiasLeft.push("." + k);
		} else if(data[k].bias === "leftcenter") {
			biasArrays.domainsBiasLeftCenter.push("." + k);
		} else if(data[k].bias === "center") {
			biasArrays.domainsBiasCenter.push("." + k);
		} else if(data[k].bias === "rightcenter") {
			biasArrays.domainsBiasRightCenter.push("." + k);
		} else if(data[k].bias === "right") {
			biasArrays.domainsBiasRight.push("." + k);
		} else if(data[k].bias === "fake-news") {
			biasArrays.domainsBiasFakeNews.push("." + k);
		} else if(data[k].bias === "conspiracy") {
			biasArrays.domainsBiasConspiracy.push("." + k);
		}
	});

	addIcons(categorizedDomainStrings, biasArrays);
}

function addIcons(categorizedDomainStrings, biasArrays) {
	for (var i = 0; i < refs.length; i++) {
		var refLinks = refs.item(i).getElementsByClassName("external");
		if (refLinks.length > 0) {
			if (categorizedDomainStrings.news.some(el => refLinks[0].getAttribute('href').includes(el)) && !categorizedDomainStrings.blogs.some(el => refLinks[0].getAttribute('href').includes(el)) && !categorizedDomainStrings.opinions.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "news");
			}
			if (categorizedDomainStrings.community.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "community");
			}
			if (categorizedDomainStrings.opinions.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "opinion");
			}
			if (categorizedDomainStrings.blogs.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "blog");
			}
			if (categorizedDomainStrings.government.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "government");
			}
			if (categorizedDomainStrings.tabloids.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "tabloid");		
			}
			if (categorizedDomainStrings.press.some(el => refLinks[0].getAttribute('href').includes(el)) || refLinks[0].parentNode.classList.contains("pressrelease")) {
				processIcon(refLinks[0], "press");	
			}
			if (categorizedDomainStrings.social.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "social");	
			}
			if (categorizedDomainStrings.books.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "book");
			}

			if (biasArrays.domainsBiasLeft.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "left");
			}
			if (biasArrays.domainsBiasLeftCenter.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "leftcenter");
			}
			if (biasArrays.domainsBiasCenter.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "center");
			}
			if (biasArrays.domainsBiasRightCenter.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "rightcenter");
			}
			if (biasArrays.domainsBiasRight.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "right");
			}
			if (biasArrays.domainsBiasFakeNews.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "fake");
			}
			if (biasArrays.domainsBiasConspiracy.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "conspiracy");
			}
		} else {
			if (refs.item(i).classList.contains("book")) {
				processIcon(refs.item(i), "book");
			}
		}
	}
}

function processIcon(node, type) {
	var textNode = document.createElement("img");
	switch(type) {
		case "news":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Historical_Newspaper_-_The_Noun_Project.svg/17px-Historical_Newspaper_-_The_Noun_Project.svg.png");
			textNode.setAttribute("alt", "News from a reputable news agency");
			break;
		case "community":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Community_Noun_project_2280.svg/17px-Community_Noun_project_2280.svg.png");
			textNode.setAttribute("alt", "Community-created news");
			break;
		case "opinion":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/FAQ_icon_%28Noun_like%29.svg/17px-FAQ_icon_%28Noun_like%29.svg.png");
			textNode.setAttribute("alt", "Opinion");
			break;
		case "blog":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Feed_Noun_project_104.svg/17px-Feed_Noun_project_104.svg.png");
			textNode.setAttribute("alt", "Blog");
			break;
		case "government":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Eye_-_The_Noun_Project.svg/17px-Eye_-_The_Noun_Project.svg.png");
			textNode.setAttribute("alt", "State-controlled or state-associated media");
			break;
		case "tabloid":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Talking_%2849969%29_-_The_Noun_Project.svg/17px-Talking_%2849969%29_-_The_Noun_Project.svg.png");
			textNode.setAttribute("alt", "Tabloid");
			break;
		case "press":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Noun_project_401.svg/17px-Noun_project_401.svg.png");
			textNode.setAttribute("alt", "Press release");
			break;
		case "social":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Social_Media_-_The_Noun_Project.svg/17px-Social_Media_-_The_Noun_Project.svg.png");
			textNode.setAttribute("alt", "Social media");
			break;
		case "book":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Education_-_The_Noun_Project.svg/17px-Education_-_The_Noun_Project.svg.png");
			textNode.setAttribute("alt", "Published book");
			break;
		case "left":
			textNode.setAttribute("src", "https://imgur.com/z5EtyJ8.png");
			textNode.setAttribute("alt", "Identified as having a left bias by Media Bias/Fact Check");
			break;
		case "leftcenter":
			textNode.setAttribute("src", "https://imgur.com/6Tpc9Ef.png");
			textNode.setAttribute("alt", "Identified as having a center-left bias by Media Bias/Fact Check");
			break;
		case "center":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/LACMTA_Circle_Purple_Line.svg/17px-LACMTA_Circle_Purple_Line.svg.png");
			textNode.setAttribute("alt", "Identified as having minimal bias by Media Bias Fact Check");
			break;
		case "rightcenter":
			textNode.setAttribute("src", "https://imgur.com/EAOZ0f5.png");
			textNode.setAttribute("alt", "Identified as having a center-right bias by Media Bias/Fact Check");
			break;
		case "right":
			textNode.setAttribute("src", "https://imgur.com/KJRDo4u.png");
			textNode.setAttribute("alt", "Identified as having a right bias by Media Bias/Fact Check");
			break;
		case "conspiracy":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Noun_project_exclamation_icon_620383.svg/17px-Noun_project_exclamation_icon_620383.svg.png");
			textNode.setAttribute("alt", "Identified as having a conspiracy-pushing source by Media Bias Fact Check");
			break;
		case "fake":
			textNode.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Noun_project_exclamation_icon_620383.svg/17px-Noun_project_exclamation_icon_620383.svg.png");
			textNode.setAttribute("alt", "Identified as having a fake-news source by Media Bias Fact Check");
			break;
		default:
			break;
	}
	textNode.style.paddingRight = "5px";
	textNode.style.width = "17px";
	textNode.style.maxHeight = "17px";
	node.parentNode.prepend(textNode);
}