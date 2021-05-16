const plantpersonDesktop = () => {
    //in Desktop, always make plantperson in the middle of what is left of the background
    //right-leaf + green background space - plantperson.width/2
    let a = document.getElementsByClassName("plantperson")[0];
    a.style.right = `${361 + (window.innerWidth - 1222)/2 - 167}px` 
}

const plantpersonMobile = () => {
    //In Mobile, make plantperson appear properly in space
    let b = document.getElementById("img-plantperson-mobile");
    b.setAttribute("width", `${593 - (window.innerWidth * 1.286) + 100 }px`);
}

const formatHeader = () => {
    if(window.innerWidth < 600) {
        plantpersonMobile();
    } else {
        plantpersonDesktop();
    }
}

export { formatHeader }