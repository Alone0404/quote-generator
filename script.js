const quoteContainer = document.querySelector('#quote-container'),
    quoteText = document.querySelector('#quote'),
    authorText = document.querySelector('#author'),
    twitterBtn = document.querySelector('#twitter'),
    newQuoteBtn = document.querySelector('#new-quote'),
    loader = document.querySelector('#loader')

let apiQuotes = [];

// Show loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author field is black and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }   
    // Check Quote lenth to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert('Error')
        // Catch Error Here
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteText.author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
twitterBtn.addEventListener('click', newQuote);
newQuoteBtn.addEventListener('click', getQuotes); 

// On Load
getQuotes();
