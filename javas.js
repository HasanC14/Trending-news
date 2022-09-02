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

    ctagories.forEach(ctagory => {
        console.log(ctagory.title);
        const card = document.getElementById('card');
        const CardBody = document.createElement('div');
        card.appendChild(CardBody);
        CardBody.classList.add('row');
        CardBody.innerHTML = `
        <div class="col-12 mb-3">
            <div class="card shadow-lg p-3 mb-3 bg-white rounded  ">
                <img src="${ctagory.thumbnail_url}" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">${ctagory.title}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk
                        of the
                        card's
                        content.</p>
                </div>
                <div class="card-body">
                    <div class="d-flex justify-content-around">
                        <div><img src="#" alt="..."><span>Name</span></div>
                        <i class="fa-regular fa-eye"></i>
                        <i class="fa-solid fa-arrow-right"></i>
                    </div>
            </div>
    </div>
        `;
    });
}
