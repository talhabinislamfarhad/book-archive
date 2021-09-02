// All id of html 
const searchInput = document.getElementById('search-input-field');
const bookContainer = document.getElementById('book-container');
const errorMessage = document.getElementById('error-message');
const countData = document.getElementById('count');
// Add spinner function 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner-container').style.display = displayStyle;
}
// Add toggleSearchResultDiv function
const toggleSearchResultDiv = displayStyle => {
    document.getElementById('count-div').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('count').style.display = displayStyle;
}
// Search button function
const loadBook = () => {
    const searchField = searchInput.value;
    // Clear data 
    countData.innerHTML = "";
    bookContainer.innerHTML = "";
    searchInput.value = "";
    errorMessage.innerHTML = "";
    // Error handaling
    if (searchField === "") {
        toggleSearchResultDiv('none');
        errorMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Please Enter a Valid Book Name!</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        return;
    }
    // Show spinner 
    toggleSpinner('block');
    toggleSearchResultDiv('none');
    toggleSearchResult('none');
    const url = `https://openlibrary.org/search.json?q=${searchField}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data, data.docs))
}
//Display data
const displayBook = (data, books) => {
    const count = books.length;
    const AllBookCount = data.numFound;
    countData.innerHTML = `<span class="fw-bold text-secondary fs-5">Showing : ${AllBookCount} OF ${count} Found Result</span>`;
    // Error handaling
    if (books.length === 0) {
        errorMessage.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong> No Result Found !</strong>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
    } else if (books.length > 0) {
        toggleSearchResultDiv('block');
        toggleSearchResult('none');
    }
    // Foreach loop
    books.forEach(book => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
           <img src="${imgUrl ? imgUrl : 'N/A'}" class="card-img-top" style="height:300px" alt="${book.title}" />
            <h6 class="card-title p-3"><span class="fw-bold text-success fs-5">Name :</span> ${book.title}</h6>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" style = "font-size:1rem; font-weight:500"><span class="fw-bold text-success fs-5">Author :</span> ${book.author_name ? book.author_name[0] : 'N/A'}</li>
                <li class="list-group-item" style = "font-size:1rem; font-weight:500"><span class="fw-bold text-success fs-5">Publisher :</span> ${book.publisher ? book.publisher[0] : 'N/A'}</li>
                <li class="list-group-item" style = "font-size:1rem; font-weight:500"><span class="fw-bold text-success fs-5">First Publish Year :</span> ${book.first_publish_year ? book.first_publish_year : 'N/A'}</li>
            </ul>
        </div>`;
        bookContainer.appendChild(div);
    });
    toggleSpinner('none');
    toggleSearchResult('block');
    errorMessage.innerHTML = "";
}