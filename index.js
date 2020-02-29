// Store all elements with tag name 'ref':
var refs = document.getElementsByTagName("cite");

fetchURLs();

async function fetchURLs() {
	try {
		// Fetch categorized domain strings and MediaBiasFactCheck data:
		var data = await Promise.all([
			fetch("https://raw.githubusercontent.com/KevinPayravi/Cite-Unseen/master/data/categorized-domains.json").then((response) => response.json()),
			fetch("https://raw.githubusercontent.com/KevinPayravi/Cite-Unseen/master/data/categorized-strings.json").then((response) => response.json())
		]);

		var categorizedDomains = data[0];
		var categorizedStrings = data[1];
		addIcons(categorizedDomains, categorizedStrings);

	} catch (error) {
		console.log("Cite Unseen error on data fetching: " + error);
	}
}

function addIcons(categorizedDomains, categorizedStrings) {
	var notNews;
	for (var i = 0; i < refs.length; i++) {
		notNews = false;
		var refLinks = refs.item(i).getElementsByClassName("external");
		if (refLinks.length > 0) {
			// Check if ref's link is in any of our datasets; we check for most serious categories last so the icon appears first in the icon set:
			if (categorizedDomains.books.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.books.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "book");
				notNews = true;
			}
			if (categorizedDomains.press.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.press.some(el => refLinks[0].getAttribute('href').includes(el)) || refLinks[0].parentNode.classList.contains("pressrelease")) {
				processIcon(refLinks[0], "press");
				notNews = true;
			}
			if (categorizedDomains.social.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.social.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "social");
				notNews = true;
			}
			if (categorizedDomains.community.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.community.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "community");
				notNews = true;
			}
			if (categorizedDomains.opinions.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.opinions.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "opinion");
				notNews = true;
			}
			if (categorizedDomains.blogs.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.blogs.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "blog");
				notNews = true;
			}
			if (categorizedDomains.government.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.government.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "government");
			}
			if (categorizedDomains.tabloids.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.tabloids.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "tabloid");
				notNews = true;	
			}
			if (categorizedDomains.mbfcFakeNews.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.mbfcFakeNews.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "fake");
				notNews = true;
			}
			if (categorizedDomains.mbfcConspiracy.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.mbfcConspiracy.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "conspiracy");
				notNews = true;
			}
			if(!notNews) {
				if (categorizedDomains.news.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
				|| categorizedStrings.news.some(el => refLinks[0].getAttribute('href').includes(el))) {
					processIcon(refLinks[0], "news");
				}
			}
			if (categorizedDomains.mbfcBiased.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.mbfcBiased.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "biased");
			}
			if (categorizedDomains.rspDeprecated.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.rspDeprecated.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "rspDeprecated");
			}
			if (categorizedDomains.rspGenerallyUnreliable.some(el => refLinks[0].getAttribute('href').includes("." + el) || refLinks[0].getAttribute('href').includes("//" + el))
			|| categorizedStrings.rspGenerallyUnreliable.some(el => refLinks[0].getAttribute('href').includes(el))) {
				processIcon(refLinks[0], "rspGenerallyUnreliable");
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
		case "biased":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAYAAADJ7fe0AAAC3npUWHRSYXcgcHJvZmlsZSB0eXBlIGV4aWYAAHja7ZdNkhshDIX3nCJHaEkIiePQ/FTlBjl+HjRjx57JVGWSRRaGckPL4gH6EC6H/uP7CN9QyA8OUc1TTulAiTlmLuj4cZWrpSOu5/WyW7w/2MPR9xcMk6CV6zVtOxXY9T7A4rafj/Zgdev4FqKb8CoyZ5797edbSPiy034PeY8r8Zft7A/XLbvFn9+jIRhNoSccuAvJgWeaswhWIFkKWsWTxHlabPWnRUU/jl24dZ+C1/jj2B1le8hjKMKRtkN6itG2kz7Z5UaNH1ZEb11+/GLIYnIvv8RujOZj9Gt3JSZEKoW9qbcQrh4cT4RS1rCEavgo+rZqRnVssYJYA80TtQbKxIj2oEiNCg3qq61UscTInQ0tc2VZNhfjzHVBibPSYAOeFsTBqoKawMy3tdCaN6/5KlKgHY3gyQQxwoh3NXxk/Eq9CY1Rr0zyhZ4uwDwPAZYxyc0nvACExo6prviuGm5Y72WCFRDUFWbHBstxXhKn0v1syeI86eoRw3GlBlnbAggR5lYshgQEjoQjTYkOYzYixNHBp2DlLJFPECBVbhQG2IgkwEE2YG6MMVq+rHyZcbUAhEpCqvhMIMCKUXF+LDrOUEHexKCqSU1ds5YkKSZNKVmad1QxsWhqyczcshUXj66e3Nw9e8mcBVeY5pQtZM85l4JJC6QLRhd4lHLyKWc89UynnX7ms1Qcnxqr1lStes21NG7SkP4tNQvNW26lU8dR6rFrT92699zLwFkbMuLQkYYNH3mUG7VN9ZEaPZH7nBptapNYXH52pwaz2ZsEzetEJzMQ40ggbpMADjRPZodTjDzJTWZHZiSFMqiRTjiNJjEQjJ1YB93Y3cl9yi1o/CNu/DtyYaL7F+TCRLfJvef2AbVW1i+KLEAzC2dMDxm42ODQvbCX+Zv05Tb8rcBL6CX0EnoJvYReQv+L0BgjNPzPCj8BZF9TFaivfZYAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAHdElNRQfjBRIPDzdajS0VAAABFUlEQVQoz5XTsSvEYRgH8E+dEMpwcjFRSkmIibosJiYmVn+AYmFwURgsyiDZKSYdI8lokGIQpWRBWSllOMt79Xb97q771lPP8+15vu/zPs/7UhlrmIviJkzjAKkiWVdFpAW7yOAbC3jFJ7rxUqXeGP7QjwIWkcUqHtBerrAXy7gOdoM3HEU5FxhHLklgKJy4g9GIb438qdARXCaJ7CGPgQpXPEE6+EuYVDL1PPrCIJPQgcMoTuM43s4MTvGIHjTit0RkBbcYibgMBovBWegG5kveRhFfYWaltiHsez9KbsZ5gshmgsAPelPYxn0gO9GGCTzjPRK5QgOGUY8nzOIOPsq0ua4G5Mq02aVGbIW/UQgbytZS/A+dO0ULq/eDgAAAAABJRU5ErkJggg==");
			textNode.setAttribute("alt", "This source has been identified by Media Bias Fact Check as being moderately to strongly biased towards certain political causes through story selection and/or political affiliation.");
			textNode.setAttribute("title", "[Cite Unseen] This source has been identified by Media Bias Fact Check as being moderately to strongly biased towards certain political causes through story selection and/or political affiliation.");
			break;
		case "blog":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAQAAACRZI9xAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIGLSFyVogvAAABBklEQVQoz33QvSsFcBTG8Q83TEpRJinFYiKK5A9ATJJBBv+Dt/g/hFIGg5K3ZDApRXa3KJKymLiSvB/D/XW5Xfmd5Tnn9+30PKfMm5wbWYf23fnzRaHe7er9H8nXnqZiIONR1o1a1WnSYsK1s9Jd5boseCvsmv/92a1BRdLNtgrQXLGXnHWDqZ/2KYQvI6V2j7WD4QTlNJYmejEOZlK/nUfqdZh1mYZfRlFmJ/VdP44qTPsQwrM2tKR0m8XBhxJ0BBaF8KqOKpOW9Rd5GEBP0mOsJtmHSldCWEPGnRCWySVkCcwL4V4GG0I4KXeRnJyDA1CjHregkVanHqyoSifI7+zElBCevgGGn4rlwj7JeAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0xOFQwNjo0NTozMyswMDowMMx47LgAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMThUMDY6NDU6MzMrMDA6MDC9JVQEAAAAAElFTkSuQmCC");
			textNode.setAttribute("alt", "This source is a blog piece.");
			textNode.setAttribute("title", "[Cite Unseen] This source is a blog piece.");
			break;
		case "book":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAMCAQAAAAuLJ40AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIGFzuqna8sAAAAoUlEQVQY083MMUrDcABG8V9slhzBDhaEUileoc7am7jUqV0UwVu41Z4mU7EdSoSgQgcxbXHIUkTk75IhEQ/g277H4+PCg8ynL8/unaHrVmrjw9LUOVsjHbFEz0QpVbrRl2g5cumNF3UGgmHDLA40meOxqX4nf/CfkrgKT7QVVpWN9B16l/mGtWuFIAheXQnG8mrv3HmKzCS111PHclnN7H8AAWcs9Da1YJEAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMTEtMThUMDY6MjM6NTgrMDA6MDDtuwvBAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTExLTE4VDA2OjIzOjU4KzAwOjAwnOazfQAAAABJRU5ErkJggg==");
			textNode.setAttribute("alt", "This source is a published book.");
			textNode.setAttribute("title", "[Cite Unseen] This source is a published book.");
			break;
		case "community":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAQAAABaOFzUAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfhCRwQBzUDxxlFAAAA3klEQVQoz43RoUtDARDH8c8e8gRBGAaLyNQJ+yMsJrUMrIJiMRsMIhaLdWAwiEFxIIJJWDBZLCaDrAj+B2srlhfO8vb2tuK7cvC933F3v6Ni1F27s1QiDQ+uzI9BRwjPJUlPCJeQgFmQ4lTfq5a0xMGiRy+adoUQ+lp6uhaghgMbasgMnedNbW3w5YbNvDOEozx/eCrYfqJZjPu26tCbe2fWZDldnykEJ1Zs2UZdx8CerjkYSTJDxxNepd7tjI8mszxlZ8PvtMMXpbVD+BkVkv+/U0EyvujT7URloHr8AZRgPpMQ9+X1AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA5LTI4VDE2OjA3OjUzKzAwOjAwwPLC8QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wOS0yOFQxNjowNzo1MyswMDowMLGvek0AAAAASUVORK5CYII=");
			textNode.setAttribute("alt", "This source is community-created news");
			textNode.setAttribute("title", "[Cite Unseen] This source is community-created news");
			break;
		case "conspiracy":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAilBMVEUAAADRAADSAADSAADVAADUAADVAADTAADTAADPAADWAADUAADRAADTAADVAADVAADVAADTAADXAADUAADUAADVAADVAADYAADTAADVAADUAADUAADXAADTAADUAADWAADTAADbAADUAADRAADTAADVAADVAADMAADTAADUAADUAADMAADUAAD///8EUUTBAAAALHRSTlMACyIReIdzY3QQRIkWF4pDbW4mznc9PA11Ev52IGK+H0sOjSHNGIsPb0FkCn9yZYwAAAABYktHRC3N2kE9AAAAB3RJTUUH4gsSEwobdHKCYwAAAJVJREFUGNNNUOEagiAMHAkVmZBGpZlZkZrZ+z9fboAf+7E7bneDDwBXbMUgqoSL9WYruAzCLt0TZkp74bCYc5KSNMorDHKKFMeCgmZugoan35lwPl1KYtW1IqwZ3Bq34e6gaYMHHhA8fs/zJcMe4Bky+7YIHd4lVfSefsCu80X4jA61oiB0/RhG0ojyWwszxB8y2cmzP0oNBvU8ErEWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTExLTE4VDE5OjEwOjI3KzAwOjAw2ZybcAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMS0xOFQxOToxMDoyNyswMDowMKjBI8wAAAAASUVORK5CYII=");
			textNode.setAttribute("alt", "This source has been identified by Media Bias Fact Check as conspiracy-pushing.");
			textNode.setAttribute("title", "[Cite Unseen] This source has been identified by Media Bias Fact Check as conspiracy-pushing.");
			break;
		case "fake":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAilBMVEUAAADRAADSAADSAADVAADUAADVAADTAADTAADPAADWAADUAADRAADTAADVAADVAADVAADTAADXAADUAADUAADVAADVAADYAADTAADVAADUAADUAADXAADTAADUAADWAADTAADbAADUAADRAADTAADVAADVAADMAADTAADUAADUAADMAADUAAD///8EUUTBAAAALHRSTlMACyIReIdzY3QQRIkWF4pDbW4mznc9PA11Ev52IGK+H0sOjSHNGIsPb0FkCn9yZYwAAAABYktHRC3N2kE9AAAAB3RJTUUH4gsSEwobdHKCYwAAAJVJREFUGNNNUOEagiAMHAkVmZBGpZlZkZrZ+z9fboAf+7E7bneDDwBXbMUgqoSL9WYruAzCLt0TZkp74bCYc5KSNMorDHKKFMeCgmZugoan35lwPl1KYtW1IqwZ3Bq34e6gaYMHHhA8fs/zJcMe4Bky+7YIHd4lVfSefsCu80X4jA61oiB0/RhG0ojyWwszxB8y2cmzP0oNBvU8ErEWAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTExLTE4VDE5OjEwOjI3KzAwOjAw2ZybcAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMS0xOFQxOToxMDoyNyswMDowMKjBI8wAAAAASUVORK5CYII=");
			textNode.setAttribute("alt", "This source has been identified by Media Bias Fact Check as fake news.");
			textNode.setAttribute("title", "[Cite Unseen] This source has been identified by Media Bias Fact Check as fake news.");
			break;
		case "government":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAQCAYAAADwMZRfAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAVYAAAFWABqGegqwAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KTMInWQAAAY1JREFUOBGVkk0rhFEUgOeDkfFNfoCkWNhZy8JWU36MpWwoSvIHbCyxUspe+QN2rLwak8i3ZIbxPGNO3WTj1NM595xzz7nn3lvM/UgHSj7ba9UkLMEmjEEGtxBSwsjDVzhSPcNiG2rQTHCt3/if0oN3AfbgA9LNv23j5pnvvtZxhtFrUIEReIVHcLwieNwCOGoDBqAMD3AAyybZ6Qa6wWRtC3j8Z1D0ucn8Khg7gR3XOq2egd3n4Qh2YRrOYQtGwQbr8AbjsAGnUDfQCYpFpsCNhzABjnIM5vlC+i/AvDtQSgYdR+mCPuh3gZTB+ZXeNtr6zHN8pWmREEfz3dVKauuLXLUx703JR8BFbI6gY/qhFH2pbZG4hlb1GCdNclPaLU6ijiaR3xonThPF7OCf8G68C8VP5V3ojxPEvoJVfWLFzr7/CwzCGWRg8iVY1EL+nSqYrzTCWGSxAh7RH/sOQ2CDJ7CADe/BV3Rt3irsQ24WrOw4/+WKPXOQuwY321Xt3PW27WfTVhvTNh556to3E6lzHsVqpl0AAAAASUVORK5CYII=");
			textNode.setAttribute("alt", "This source has been identified as state-owned or -controlled media, or is a government source.");
			textNode.setAttribute("title", "[Cite Unseen] This source has been identified as state-owned or -controlled media, or is a government source.");
			break;
		case "news":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAQAAACRZI9xAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIGAjrqL3muAAAA7UlEQVQoz7XSsSuEcRjA8c/b/cRwiwGRdEkWIYYrm4XuL7AeKRkZxWAzmWzIZEMZbzBxm8FNzqJEIYlsN+AM96a797V6pud5+vZ9nnqeyIKicbfeJSPj0AGcicxYk47IqW6CmrpHnZi13QRsOnFpyEswYEkfqFhpQqqxScarmg5ZNyYFwYUuWUGvL6PuPARHGFFUsAuG9esBTw1d+GPNc+3gLYlUY8uHRTlwnETKynG29dvLtyIFq4mBe0lLSSm11fp/WGDeVEs9Ie+5gdRFYNpO6uL7DeTemIwg58p3C5D1GcXpnGWD2lynHmLjB8T8M93ZKoDZAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTExLTE4VDA2OjAyOjU4KzAwOjAwWhXZPgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMS0xOFQwNjowMjo1OCswMDowMCtIYYIAAAAASUVORK5CYII=");
			textNode.setAttribute("alt", "This source is a news article from a reputable news agency.");
			textNode.setAttribute("title", "[Cite Unseen] This source is a news article from a reputable news agency.");
			break;
		case "opinion":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAQAAABj5D8/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIGKh6LcTPVAAAA6ElEQVQY033PsS9DYRQF8F8fFqmhNXQxEekiMYhEbIzCajIYOonBaNA/wSxYRCJWYpVIxFvEKhKLxVILkafIC8/Qry+vht6znHO/k/OdS10slQUk7q37Nzfh8ceumrJKAYMdSzdhy5LHPK2DD8dGBPFgUjvwbTVTboPa51cmc2QjrC6NOtcwHXQr8gQ+VUO3RMOysnbQVVYkMnt2Ch021cSBp5ELhzLXPVfeaZrvigiZplNvBcua2ZwnMAPqvvOP5hzk/KQYv+olrN995fdVSj0dSsYMBT7szIRFV/rMuJYFBvpYXsVSz3/sDW0F53yCTAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0xOFQwNjo0MjozMCswMDowMB9M7VwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMThUMDY6NDI6MzArMDA6MDBuEVXgAAAAAElFTkSuQmCC");
			textNode.setAttribute("alt", "This source is an opinion piece.");
			textNode.setAttribute("title", "[Cite Unseen] This source is an opinion piece.");
			break;
		case "press":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAOCAQAAABj5D8/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIFNwH7U+xlAAAAn0lEQVQY083QOwrCYBAE4C8SsBF7QU8hll7HE3gMS8EL2AVbH5UHEK9gZRdsQkBN4W+RxGAaW2eaYWZ2F5YGS4UgCArLxo4+qiezcAITc315GcTGVaUvcnUBA5GJrN4S/ECHv6ucHVvJ0bmW5bNmppWqOTUrVVx1U3kzBXJp6cTWuri4Sb4qqZcETw6CYGPVOrSyEQR7RnYerbjm3dbwDQQtShI2Rg+SAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTExLTE4VDA1OjU1OjAxKzAwOjAwqSxJfAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0xMS0xOFQwNTo1NTowMSswMDowMNhx8cAAAAAASUVORK5CYII=");
			textNode.setAttribute("alt", "This source is a press release.");
			textNode.setAttribute("title", "[Cite Unseen] This source is a press release.");
			break;
		case "social":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAATCAQAAADcrC56AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIGAQAHDvPfAAABP0lEQVQoz23RO0hcURDG8Z/7MISAhYIGIxhCtFEbEWEJhFgHiWnEKmBlYyEI2lgpiKWt5SIWroigmEBMnW4vFkkhJBDyaKIBibo+QI7FXa93ZWeaYeZ/vhnORzr6XAkq9lwKPsTNTA3SIo9Gz+TRpsOkbA3hlY9J3SvyWUXLnUqHJbnaF/4a1XXbzCspiJBTtOO5bZSsOrlF5hUcOMSY1/pdO8K0P6biRV1mMCug24Vjv0XYklGMkTcyzr3XjqJfflpxjhHtJuNFw3ho0xd8NySo6EHkqycZPPYiAeHUmQA6vfMgh7ep73lqtlq1odGYdSgK1VwUBD8MOhFEmmIDGgwkGg2g1bhHOPM/bs5ZSJBvtqpXsGs/RviXrEnnWlURlOsAG/Jpqybuja8t37cz61MKKHupTjQrObRmVGe98Q0geXGLKN+EFwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0xOFQwNjowMTowMCswMDowMMotIj4AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMThUMDY6MDE6MDArMDA6MDC7cJqCAAAAAElFTkSuQmCC");
			textNode.setAttribute("alt", "This source is a social media post.");
			textNode.setAttribute("title", "[Cite Unseen] This source is a social media post.");
			break;
		case "tabloid":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAQAAACRZI9xAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfiCxIGIwCgvLX/AAAA60lEQVQoz43RMS+DQRgH8F+LMEgHqUUiamDhIzRpI0FsvoFFmvgEvoCpRh/AIAZWJDQ2m4iBxSIGUxOJkKBReobyujd9E55b7nK/3P/uOf6svmies6NuUNmV9yw8qyF8j83s8/YSEByBoe5GPiHNiC/IY0MpTQoR6RhWcKuWDhrXSYL25awrO4f+hNy71vaqqeJUzYVJxXQQdSWHnrTsahnxqZUOmrDlQxDcWTNgXlUjBoseo0cHZ4pmrPyCac8pEATHqUvY7gFBUIlbV83s91y8WPXSc8aNqZ/f7daYZUtKRr15cOnEgbb/1herOlytIrzt+QAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0xMS0xOFQwNjozNTowMCswMDowMFok5EUAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMTEtMThUMDY6MzU6MDArMDA6MDAreVz5AAAAAElFTkSuQmCC");
			textNode.setAttribute("alt", "This source is a tabloid article.");
			textNode.setAttribute("title", "[Cite Unseen] This source is a tabloid article.");
			break;
		case "rspDeprecated":
			textNode.setAttribute("src", " data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAACl0lEQVQ4jZ2UzUtUURjGf+fce+50ce51dMigyQkdJGVMCD8gCMudy6CFmS4MWrVzV39ELZNaZIhpm6CvTSBB2gSlA9EyKihahKWGd5w7M3e8p4XTdB1bdXbv18PD877PETS8pFKz/bY9pYRoLBFoTd73FzaCYCKa39eZVGp2PJGYOuu6/AukGoa8KhS4v7X14EcQjP/JG40A51yXQ0IggQ9SsmLbtJXLxIXAFIJ2y6JZyt5PlUp3MQwfAsgowIjrEhOCstY8sSyex+PcWVvjpu/zzjQBUEIw7DhMtLRcPKzUIoCRVGr2UiIxNeI4WFLya3eX25UK1xYXSaZSDA4NEZgmX0olur5/36MvBMcsC1fK3s+VSrcctO2pYdfFkhKA5aYmrt64QWtrKx2dnQBks1lMy9qnjyUEZxyHftu+KKWUmFHxmpo42ddHLBbbN6S1BuCtZfEsHgfABKSUe5pEn1TqwFZqKHzUGufCBcKjR4G/q5XRAECaJsVikVwuR7FYZGlpiVKpRLVa5U0qxZXpaXa/fdvDrc2Y0QAg1Jrm5mbGxsbqOc/z6MpkSLS0MDczw8D2NphmA5PIYYXlMplMph6vr6+Ty+U40dNDazLJ20ePaK+tW9fmZBiGBPovF1ko4HlePc7n84yOjgJw79YtBn7+rNeqWhOGIXLV92dfbm9TrgFlCwUezs/XGx3HAWBzc5MXc3N0GXtHHmjNa88j7/sPDD8MH38KguOOEKfSsRhthsHT9+9x0mk6MhnS6TRrq6tcn5zk/MYGMSkJtGbZ8+oeqouRVOrueCJxecRxUFKypjVfbRttGBzZ2eG01phCUNGalQgARAxYZ2QYp9qVIiUl3dUqPUFAe038So3BQoOLD/j9f/6T39EbEfZIJ3nIAAAAAElFTkSuQmCC");
			textNode.setAttribute("alt", "From WP:RSP, there is community consensus to deprecate the source. The source is considered generally unreliable, and use of the source is generally prohibited.");
			textNode.setAttribute("title", "[Cite Unseen] From WP:RSP, there is community consensus to deprecate the source. The source is considered generally unreliable, and use of the source is generally prohibited.");
			break;
		case "rspGenerallyUnreliable":
			textNode.setAttribute("src", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAMAAAAMs7fIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAq1BMVEUAAADEAADMAADMAADMAADMAADMAADVAADLAADMAADMAADNAADNAADMAADMAADLAADNAADMAADMAADMAADMAADMAADLAADMAADNAADLAADMAADRAADMAADQEhLbSUneW1vaSEjTIyPuq6v++/v////uqanTIiLOBwfdVlb+/Pz87u7ZPz/eWFjdV1fTISHfXl7uqKjPERHaR0fPEBD++vrtp6fcUVHSHx/eWlqG88BTAAAAHHRSTlMADW695vptDFjp6FZ6/nlsu+fl+fjkvLprVHgL0nKBsgAAAAFiS0dEJLQG+ZkAAAAHdElNRQfkAg4GLCzUeqyYAAAAtklEQVQY003Q2RKCMAwF0AgoChYtbqBBwNZd0VYQ///LLDv3KT2TyTQBUBloujE09JEJdcYTDPZhFKBlVzAl8YFxztnxRJyyg5wvV17mdieqy7TiBz5ZTclkABoerq+W3jgDPWC8IybmQCNVdCRdWIS8T+ESjIj3Sa5g/Ul7lIoNjPDIO8rQA5Oebi19c/UfsMm9ocuZ+MUaDknexdA0y8m2WtWmKORPCqR+cw7Tm7sLd+PtiscffvceuGkSePYAAAAldEVYdGRhdGU6Y3JlYXRlADIwMjAtMDItMTRUMDY6NDQ6NDQrMDA6MDBCbcELAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIwLTAyLTE0VDA2OjQ0OjQ0KzAwOjAwMzB5twAAAABJRU5ErkJggg==");
			textNode.setAttribute("alt", "From WP:RSP, editors show consensus that the source is questionable in most cases.");
			textNode.setAttribute("title", "[Cite Unseen] From WP:RSP, editors show consensus that the source is questionable in most cases.");
			break;
		default:
			break;
	}
	textNode.style.paddingRight = "5px";
	textNode.style.width = "17px";
	textNode.style.maxHeight = "17px";
	node.parentNode.prepend(textNode);
}
