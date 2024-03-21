document.addEventListener("DOMContentLoaded", () => {
  const author = document.querySelector(".author");
  const quote = document.querySelector(".quote");
  const tagsContainer = document.querySelector(".tags-container");
  const newQuote = document.querySelector(".new-quote");
  const copyQuote = document.querySelector(".copy-quote");

  async function updateContent() {
    const response = await fetch("https://api.quotable.io/quotes/random");
    const dataArr = await response.json();
    const data = dataArr[0];

    if (response.ok) {
      author.textContent = data.author;
      quote.textContent = data.content;
      for (tag of data.tags) {
        let tagDiv = document.createElement("div");
        tagDiv.className = "tag";
        tagDiv.textContent = tag;
        tagsContainer.append(tagDiv);
      }
    } else {
      quote.textContent = "An error occured";
      console.log(data);
    }
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(quote.textContent);
      console.log('Content copied to clipboard');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }
  
  newQuote.addEventListener("click", updateContent);
  copyQuote.addEventListener("click", copyToClipboard);

  updateContent();
});