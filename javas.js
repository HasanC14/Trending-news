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
    loader(true);
}

const CardDisplay = ctagories => {
    NewsCount(ctagories.length);
    const card = document.getElementById('card');
    card.innerHTML = '';
    const drop = document.getElementById('drop');
    drop.classList.remove('d-none');
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
                        <button type="button" class="btn btn-outline-info" data-bs-toggle="modal"
                                    data-bs-target="#exampleModal">
                                    Read More
                                </button>
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
const modal = (MoadlDetails) => {
    console.log(MoadlDetails);
    const modal = document.getElementById('exampleModal');
    const p = document.createElement('div');
    p.classList.add('modal-dialog');
    p.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="ModalBody">
            <p>${MoadlDetails}</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
    </div>`;
    modal.appendChild.add(p);
}



const NewsCount = (count) => {
    const DataCount = document.getElementById('DataCount');
    DataCount.innerHTML = ``;
    const Data = document.createElement('div');
    DataCount.appendChild(Data);
    Data.innerHTML = `
    <h2 class="text-center bg-light p-5">${count} News Found</h2>`;
}


const loader = (isloading) => {
    const loader = document.getElementById('loader');
    if (isloading) {
        loader.classList.remove('d-none')
    }
    else {
        loader.classList.add('d-none')
    }
}

const sort = (states) => {

}