// Loading Catagoriesa
const LoadCtagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories').then(function (response) {
        if (response.status == 200) {
            return response.json()
        }
    }).then((data) => {
        NavDisplay(data.data);
    }).catch(() => {
        console.log("Error");
    });
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

//Load News
const more = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => CardDisplay(data.data))
    loader(true);
}
const CardDisplay = ctagories => {
    // Sorting Algorithm
    ctagories.sort((a, b) => {
        return b.total_view - a.total_view;
    });
    //Total Data Found Message
    NewsCount(ctagories.length);
    //No Data Found Message
    if (ctagories.length === 0) {
        document.getElementById('Warning').classList.remove('d-none');
    }
    else document.getElementById('Warning').classList.add('d-none');

    let card = document.getElementById('card');
    card.innerHTML = '';
    //Creatig the News Card Section
    ctagories.forEach(ctagory => {
        let CardBody = document.createElement('div');
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
                        <div><img src="${ctagory.author.img}" alt="..." class="avatar me-2"><span>${ctagory.author.name ? ctagory.author.name : "No data Found"}</span></div>
                        <i class="fa-regular fa-eye mt-3"> <span class="ms-1">${ctagory.total_view ? ctagory.total_view : "No data"}</span> </i>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="modal('${ctagory._id}')">Read More</button>
                    </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        loader(false);
    });
}

//Modal
const modal = (_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${_id}`
    fetch(url)
        .then(res => res.json())
        .then(data => ModalDisplay(data.data))
}
const ModalDisplay = datas => {
    datas.forEach(data => {
        const modal = document.getElementById('modal_body');
        modal.innerHTML = '';
        const p = document.createElement('div');
        modal.appendChild(p);
        p.innerHTML = `
    <p>${data.details}</p>`;
    });
}

//Total News Count
const NewsCount = (count) => {
    const DataCount = document.getElementById('DataCount');
    DataCount.innerHTML = ``;
    const Data = document.createElement('div');
    DataCount.appendChild(Data);
    Data.innerHTML = `
    <h3 class="bg-light p-3">${count} News Found</h3>`;
}

//  Loading Animation
const loader = (isloading) => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}
