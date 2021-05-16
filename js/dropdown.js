let sunlight;
const sunlightFormat = {
    "No sunlight": "no",
    "Low sunlight": "low",
    "High sunlight": "high",
};
let water;
const waterFormat = {
    "Rarely": "rarely",
    "Regularly": "regularly",
    "Daily": "daily",
};
let chew;
const chewFormat = {
    "No/They don't care": "true", //It's pet friendly
    "Yes": "false", //Pet chew, not pet friendly
};

const filterLogic = () => {
    document.querySelector('.sunlight').addEventListener('click', function() {
        this.querySelector('.dropdown').classList.toggle('open');
    })

    document.querySelector('.water').addEventListener('click', function() {
        this.querySelector('.dropdown').classList.toggle('open');
    })

    document.querySelector('.chew').addEventListener('click', function() {
        this.querySelector('.dropdown').classList.toggle('open');
    })

    for (const option of document.querySelectorAll(".option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                if(this.parentNode.querySelector('.option.selected')) {
                    this.parentNode.querySelector('.option.selected').classList.remove('selected');
                }

                this.classList.add('selected');
                this.closest('.dropdown').querySelector('.dropdown-selected span').textContent = this.textContent;

                //now the onChange logic
                updateRequest(this.parentNode.parentNode.parentNode.classList[0], this.textContent);
            }
        })
    }
    
    window.addEventListener('click', (e) => {
        const dropdown = document.querySelector('.dropdown')
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });
}

const updateRequest = (field, value) => {

    switch (field) {
        case "sunlight":
            sunlight = sunlightFormat[value];
            break;
        case "water":
            water = waterFormat[value];
            break;
        case "chew":
            chew = chewFormat[value];
            break;
        default:
            break;
    }

    if (sunlight && water && chew) {
        //if is the first time, change no-result screen to result screen
        if(document.querySelector('.no-result.open')) {
            document.querySelector('.no-result').classList.toggle('open');
            document.querySelector('.result').classList.toggle('open');
        }

        doRequest();
    }

}

const doRequest = () => {
    fetch(`https://front-br-challenges.web.app/api/v2/green-thumb/?sun=${sunlight}&water=${water}&pets=${chew}`)
    .then(res => res.json())
    .then(finalResult => {
        buildDivs(finalResult);
    })
}

const buildDivs = (plants) => {
    console.log(plants);
}

export { filterLogic };