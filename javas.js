// Navigation Bar
const LoadCtagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => NavDisplay(data.data))
}
const NavDisplay = ctagories => {
    ctagories.news_category.forEach(ctagory => {
        const news = document.getElementById('ctagories');
        const div = document.createElement('div');
        news.appendChild(div);
        div.innerHTML = `
        <button type="button" class="btn m-1" onclick="more('${ctagory.category_id}')">${ctagory.category_name}</button>
        `;
    });
}


LoadCtagories();



const more = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => CardDisplay(data.data))
}
const CardDisplay = ctagories => {
    const card = document.getElementById('card');
    card.innerHTML = '';
    ctagories.forEach(ctagory => {

        const CardBody = document.createElement('div');
        card.appendChild(CardBody);
        CardBody.classList.add('row');
        CardBody.innerHTML = `
        <div class="col-12 mb-3 d-flex justify-content-center align-items-center">
            <div class="card w-75 shadow-lg p-3 mb-3 bg-white rounded  ">
                <div class="row">
                    <div class="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                            <img src="${ctagory.thumbnail_url}"
                            class="card-img-top img-fluid w-75">
                    </div>
                    <div class="col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center align-items-center">
                    <div class="card-body">
                            <h5 class="card-title">${ctagory.title}</h5>
                            <p class="card-text">${ctagory.details.slice(0, 200)}${'...'}</p>
                            <div class="d-flex justify-content-around mt-5">
                        <div><img src="${ctagory.author.img}" alt="..." class="avatar me-2"><span>${ctagory.author.name}</span></div>
                        <i class="fa-regular fa-eye mt-3"> ${ctagory.total_view}</i>
                        <i class="fa-solid fa-arrow-right mt-3"></i>
                    </div>
                        </div>
                    </div>
                </div>
                <div class="card-body">          
                </div>
            </div>
        </div>
        `;
    });
}
