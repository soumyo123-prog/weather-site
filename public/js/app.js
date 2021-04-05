const searchForm = document.querySelector('form');
const inputEl = document.querySelector('input');
const date = document.getElementById('date');
const place = document.getElementById('place');
const desc = document.getElementById('description');
const real = document.getElementById('real');
const app = document.getElementById('app');
const minMax = document.getElementById('minMax');

// Implementing the spinner functionality
const spinner = document.getElementsByClassName('loader')[0];
spinner.style.display = 'none';

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //Clearing the values of current search before a new one
    place.innerHTML = null;
    desc.innerHTML = null;
    real.innerHTML = null;
    app.innerHTML = null;
    minMax.innerHTML = null;
    date.innerHTML = null;

    // Showing spinner when data loads
    spinner.style.display='block';
    place.innerHTML = null;

    const location = inputEl.value;
    const url = "/weather?location="+location;

    fetch(url)
    .then(res => {
        res.json().then(data => {
            if (data.error) {
                place.innerHTML = data.error;
            } else {
                place.innerHTML = data.location;
                desc.innerHTML = data.description;
                real.innerHTML = data.temperature;
                app.innerHTML = "Feels Like "+data.apparent;
                minMax.innerHTML = "Min/Max : "+data.min+" / "+data.max;
                date.innerHTML = new Date();
            }
        })

        // Closing the spinner after the data arrives
        spinner.style.display = 'none';
    })
    .catch(err => {
        console.log(err);
    })
})