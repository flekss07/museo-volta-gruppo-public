document.addEventListener('DOMContentLoaded',() => {
    getFromServer('test')
});

function getFromServer(url)
{
    fetch('/' + url)
    .then(response => {
        if(!response.ok)
            throw new Error(response.status);
        return response.json(); // prende la risposta
    })
    .then(data =>{
       const container = document.getElementById('container');
       container.textContent = data.text;
    })
    .catch(error=>{
        console.error('request error',error); // catch e log dell'errore
    });
}