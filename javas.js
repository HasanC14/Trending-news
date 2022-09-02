const LoadCtagories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => display(data.data))
}
const display = ctagories => {
    ctagories.news_category.forEach(ctagory => {
        const news = document.getElementById('ctagories');
        const div = document.createElement('div');
        news.appendChild(div);
        div.innerHTML = `
        <button type="button" class="btn ">${ctagory.category_name}</button>
        `;
    });
}
LoadCtagories();
