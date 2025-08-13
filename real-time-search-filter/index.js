const searchInput = document.getElementById('search');
const userlists = document.getElementById('userlist');
const listItems = document.getElementsByTagName('li');

searchInput.addEventListener('keyup', function() {
    const filter = searchInput.value.toLowerCase()
    // console.log(searchInput.value.toLowerCase());
    Array.from(listItems).forEach((item) => {
        const text = item.textContent.toLowerCase()
        if(text.includes(filter)) {
            item.classList.remove('hidden')
        }
        else {
            item.classList.add('hidden')
        }
    })
})


