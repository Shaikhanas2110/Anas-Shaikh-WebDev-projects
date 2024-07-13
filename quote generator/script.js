document.addEventListener('DOMContentLoaded',() => {
    const display = document.getElementById("quote");
    const btn = document.getElementById("btn");
    const apikey = '4t2aTFC63SXKmhZ4K/CDig==X4WFfuF12HdJFoIy'

    async function getQuote() {

            const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
                headers: { 'X-Api-Key': apikey }
            });

            const data = await response.json();
            const quote = data[0];
            display.textContent = `"${quote.quote}" - ${quote.author}`;      
    }

    btn.addEventListener("click",getQuote);
    document.addEventListener("keydown",() => {
        if(key == "Enter") {
            getQuote();
        }
    })

    getQuote();
});
