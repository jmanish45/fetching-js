const qurl = "https://api.api-ninjas.com/v1/quotes";

const quote = document.getElementById("quote");
const author = document.getElementById("author");
const newbtn =document.getElementById("new-quote");
const tweetbtn = document.getElementById("tweet");
tweetbtn.addEventListener("click", tweet);

newbtn.addEventListener("click", getQuote);


async function getQuote() {
    quote.textContent = "Loading...";
    author.textContent = "";

    const response = await fetch(qurl, {
        headers: {
            "X-Api-Key": config.apiKey
        }
        
    });

    const data =  await response.json();

    quote.textContent = data[0].quote;
    author.textContent = data[0].author;
    // console.log(data[0].quote);
    // console.log(data[0].author);

    
}
function tweet() {
    const tweetText = `${quote.textContent} - ${author.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
}

