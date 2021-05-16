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

                console.log(this.textContent);

                //INSERT ONCHANGE LOGIC HERE!!!!!!!!!!!!!
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

export { filterLogic };