function createProductItemDomElementFunction(product){
   const productItemDomElement = document.createElement('div')
   productItemDomElement.className = 'product'
   

   productItemDomElement.innerHTML = `
      <img src="./${product.url}" alt="${product.name}">
      <h4>${product.name}</h4>
      <span>$${product.price.toLocaleString()}</span>
   `

   return productItemDomElement


}


const categories = [
   {
      categoryId: 0,
      categoryName: 'cameras',
   },

   {
      categoryId: 1,
      categoryName: 'smartphones',
   },

   {
      categoryId: 2,
      categoryName: 'games',
   },

   {
      categoryId: 3,
      categoryName: 'televisions',
   },
]

const products = [
  {
    name: 'Sony Playstation 5',
    url: 'images/playstation_5.png',
    categoryId: 2,
    price: 499.99,
  },
  {
    name: 'Samsung Galaxy',
    url: 'images/samsung_galaxy.png',
    categoryId: 1,
    price: 399.99,
  },
  {
    name: 'Cannon EOS Camera',
    url: 'images/cannon_eos_camera.png',
    categoryId: 0,
    price: 749.99,
  },
  {
    name: 'Sony A7 Camera',
    url: 'images/sony_a7_camera.png',
    categoryId: 0,
    price: 1999.99,
  },
  {
    name: 'LG TV',
    url: 'images/lg_tv.png',
    categoryId: 3,
    price: 799.99,
  },
  {
    name: 'Nintendo Switch',
    url: 'images/nintendo_switch.png',
    categoryId: 2,
    price: 299.99,
  },
  {
    name: 'Xbox Series X',
    url: 'images/xbox_series_x.png',
    categoryId: 2,
    price: 499.99,
  },
  {
    name: 'Samsung TV',
    url: 'images/samsung_tv.png',
    categoryId: 3,
    price: 1099.99,
  },
  {
    name: 'Google Pixel',
    url: 'images/google_pixel.png',
    categoryId: 1,
    price: 499.99,
  },
  {
    name: 'Sony ZV1F Camera',
    url: 'images/sony_zv1f_camera.png',
    categoryId: 0,
    price: 799.99,
  },
  {
    name: 'Toshiba TV',
    url: 'images/toshiba_tv.png',
    categoryId: 3,
    price: 499.99,
  },
  {
    name: 'iPhone 14',
    url: 'images/iphone_14.png',
    categoryId: 1,
    price: 999.99,
  },
];


const searchProductsInput = document.getElementById('search-products-input')
const categoriesContainer = document.getElementById('categories')
const productsContainer = document.getElementById('products-body')

const categoryDomCheckBoxBlocks = []
const productsDomElements = []

categories.forEach((category)=>{
   const categoryCheckboxBlock = createCategoryCheckboxBlock(category) 
   categoriesContainer.append(categoryCheckboxBlock)
   categoryDomCheckBoxBlocks.push(categoryCheckboxBlock)
})

searchProductsInput.addEventListener('input',handleSearchingAndFiltering)
 Array.from(categoryDomCheckBoxBlocks).forEach(checkboxBlockDom=>{
   checkboxBlockDom.querySelector('input[type="checkbox"]').addEventListener('change',handleSearchingAndFiltering)
   
 })

products.forEach((product)=>{
   const createProductItemDomElement = createProductItemDomElementFunction(product) 
   productsContainer.append(createProductItemDomElement)
   productsDomElements.push(createProductItemDomElement)


})

console.log(productsDomElements)

function createCategoryCheckboxBlock (category){
   const categoryCheckboxBlock = document.createElement('div')
   categoryCheckboxBlock.className = 'category'
   categoryCheckboxBlock.dataset.categoryName = category.categoryName


   categoryCheckboxBlock.innerHTML = `
      <input  id="${category.categoryName}"  class="category-check" type="checkbox" >
      <label for="${category.categoryName}"> ${category.categoryName}</label>
   `

   return categoryCheckboxBlock
}




function handleSearchingAndFiltering(event){
   const searchInputValue = searchProductsInput.value.trim().toLowerCase()
   const checkedCategoryNames = Array.from(categoryDomCheckBoxBlocks).filter(categoryDomBlock => categoryDomBlock.querySelector('input[type="checkbox"]').checked ).map(categoryDomBlock=> categoryDomBlock.dataset.categoryName)

   Array.from(productsDomElements).forEach((productsDomElement,index)=>{
      const productInfo = products[index] // index выступает в роли id , по индексу берем информацию о товарах из изначального массива товаров
     const ifMathesSearch = productInfo.name.trim().toLowerCase().includes(searchInputValue)
      
     const ifinCategories = checkedCategoryNames.length === 0 || checkedCategoryNames.includes(categories.find(category => category.categoryId === productInfo.categoryId).categoryName) // проверяем есть ли в массиве выбранных категорий наш товар ( смотрим по схожести имени категорий )
     
     if(ifMathesSearch && ifinCategories){
         productsDomElement.classList.remove('hidden')
     }else{
      productsDomElement.classList.add('hidden')
     }

   })
   
}