/*Menu task

Restaurant menusi yaratish

1. Menuga ovqat qo’shish funksiyasi bo’lsin object sifatida arrayga solib
2. Localstoragedagi menudagilardan qidirish fuksiyasi
3. Sorting fuksiyasi
4. Narxdan narxgacha filter funksiyasi qo’shing

 */

// LINK BUTTONS TO JS
const showBtn = document.querySelector('#show-btn');
const addBtn = document.querySelector('#add-btn');
const searchBtn = document.querySelector('#search-btn');
const sortBtn = document.querySelector('#sort-btn');
const filterBtn = document.querySelector('#filter-btn');

let showZone = document.querySelector('#show-zone');
let menuZone = document.querySelector('#menu');

showBtn.addEventListener('click', showFood);
addBtn.addEventListener('click', addFood);
searchBtn.addEventListener('click', searchFood);
sortBtn.addEventListener('click', sortFood);
filterBtn.addEventListener('click', filterFood);

let ALL_DISHES = JSON.parse(localStorage.getItem("Food")) || [];

// CREATE DISH OBJECT
function CreateFood(foodName, foodPrice) {
    this.foodName = foodName;
    this.foodPrice = foodPrice;
}

// // SHOW FOOD ???
// let showed = false;
// function showFood() {
//     if(showed = false) {
//         showBtn.innerText = 'HIDE'
//         showed = false;
//         show = ''

//         ALL_DISHES.forEach(food => {
//             show += `
//                 <div class="foods">
//                     <h4>${food.foodName}</h4>
//                     <span>.....................................</span>
//                     <p>$${food.foodPrice}</p>
//                 </div>
//             `
//         })
//         showZone.innerHTML = show
//     } else {
//         showBtn.innerText = 'SHOW'
//         showed = true;
//         showZone.innerHTML = ""
//     } 
// }

let showed = false;

function showFood() {
    if (showed === false) {
        showBtn.innerText = 'HIDE';
        showed = true;
        let show = '';

        ALL_DISHES.forEach(food => {
            show += `
                <div class="foods">
                    <h4>${food.foodName}</h4>
                    <span>.....................................</span>
                    <p>$${food.foodPrice}</p>
                </div>
            `;
        });

        showZone.innerHTML = show;
    } else {
        showBtn.innerText = 'SHOW';
        showed = false;
        showZone.innerHTML = "";
    }
}
// ADD DISH TO ALL_DISHES
function addFood() {
    // Get food name and price
    const foodName = prompt('Enter food name: ');
    const foodPrice = prompt('Enter food price: ');
    // Create new food
    const newFood = new CreateFood(foodName, foodPrice);
    ALL_DISHES.push(newFood)

    // Save to local storage
    localStorage.setItem("Food", JSON.stringify(ALL_DISHES))
}

// SEARCH DISH
function searchFood() {
    let searchedFoodName = prompt('Enter food name: ');
    let founFood = ALL_DISHES.find(food => food.foodName === searchedFoodName);
    
    if (founFood) {
        showZone.innerHTML = ""
        showZone.innerHTML += `
        <div class="searched-food">
            <h4>${founFood.foodName}</h4> 
            <span>---</span>
            <h4>${founFood.foodPrice}</h4>
        </div>
        `
    } else {
        alert('Food not found')
    }
}

// SORT DISHES
function sortFood() {
    ALL_DISHES.sort((a, b) => a.foodName.localeCompare(b.foodName))
    showZone.innerHTML = ""
    ALL_DISHES.forEach(food => {
        showZone.innerHTML += `
        <div class="sorted_food">
            <h4>${food.foodName}</h4>
            <span>.....................................</span>
            <h4>${food.foodPrice}</h4> 
        </div>
        `
    })
}

// FILTER DISHES
function filterFood() {
    console.log(ALL_DISHES);
    let priceFrom = +prompt("Enter price from:")
    let priceTo = +prompt("Enter price to:")
    let filteredFood = ALL_DISHES.filter(food => food.foodPrice >= priceFrom && food.foodPrice <= priceTo)

    showZone.innerHTML = ''
    filteredFood.forEach(food => {
        showZone.innerHTML += `
                <div class="filtered-food">
                    <h4>${food.foodName}</h4>
                    <span>.....................................</span>
                    <p>$${food.foodPrice}</p>
                </div>
        `
    })

}