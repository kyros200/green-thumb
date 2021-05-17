import rarely from "../images/icons/1-drop.svg";
import regularly from "../images/icons/2-drops.svg";
import daily from "../images/icons/3-drops.svg";
import high from "../images/icons/high-sun.svg";
import low from "../images/icons/low-sun.svg";
import no from "../images/icons/no-sun.svg";
import falsee from "../images/icons/pet.svg";
import truee from "../images/icons/toxic.svg";

const iconFormat = {
    rarely: rarely,
    regularly: regularly,
    daily: daily,
    high: high,
    low: low,
    no: no,
    true: truee,
    false: falsee,
}

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

            if(window.innerWidth < 600) {
                document.querySelector('.result-plants-mobile').classList.toggle('active');
            } else {
                document.querySelector('.result-plants-desktop').classList.toggle('active');
            }
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
    let plantClass = ".result-plants-desktop";
    if(window.innerWidth < 600) {
        plantClass = ".result-plants-mobile";
    }

    let stringChildren = ``;

    if(!plants.error) {
        plants.map((p) => {
            stringChildren += `
            <div class="result-plant-box ${p.staff_favorite ? "favorite" : ""}">
                <div class="top-side">
                    <img src="${p.url}" />
                </div>
                <div class="bottom-side">
                    <div class="plant-name">
                        <b>${p.name}</b>
                    </div>
                    <div class="plant-info">
                        <div class="plant-price">
                            <b>$${p.price}</b>
                        </div>
                        <div class="plant-specs">
                            <img src="${iconFormat[p.toxicity]}" />
                            <img src="${iconFormat[p.sun]}" />
                            <img src="${iconFormat[p.water]}" />
                        </div>
                    </div>
                </div>
            </div>
            `;
        })
    }

    document.querySelector(plantClass).innerHTML = stringChildren;
}

export { filterLogic };