document.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
    return;
  }

  const adminPage = document.getElementById('admin');
  adminPage.style.display = 'block';

  const adminForm = document.getElementById('adminForm');
  const productLists = document.getElementById('productList');
  const savedProducts = JSON.parse(localStorage.getItem('products')) || [];

  const ol = document.createElement('ol'); 
  productLists.append(ol);

  const productMesseg = document.createElement('p');
  productMesseg.textContent = "Hali maxsulot yo'q";
  productMesseg.style.textAlign = "center"
  productMesseg.style.color = "#0d0c0eaf"
  productMesseg.style.fontWeight = '600'
  productMesseg.style.fontSize = '20px'
  productMesseg.style.letterSpacing = '5px'
  productLists.append(productMesseg);

  function checkIfEmpty() {
    if (savedProducts.length === 0) {
      productMesseg.style.display = 'block';
    } else {
      productMesseg.style.display = 'none';
    }
  }

  savedProducts.forEach(product => {
    const listItem = document.createElement('li');
    
    const name = document.createElement('h3');
    const price = document.createElement('strong');
    const descrip = document.createElement('p');
    name.innerHTML = `Nomi: ${product.name}`;
    price.innerHTML = `Narxi: ${product.price}$`;
    descrip.innerHTML = `<strong>Tavsifi</strong>: ${product.description}`;
   
    listItem.append(name, price, descrip);
    ol.append(listItem);
  });

  checkIfEmpty();

  adminForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const price = document.getElementById('price').value;
    const description = document.getElementById('discrip').value;

    const listItem = document.createElement('li');
    
    const itemName = document.createElement('h3');
    const itemPrice = document.createElement('strong');
    const itemDescrip = document.createElement('p');
    itemName.innerHTML = `Nomi: ${name}`;
    itemPrice.innerHTML = `Narxi: ${price}$`;
    itemDescrip.innerHTML = `<strong>Tavsifi</strong>: ${description}`;
    
    listItem.append(itemName, itemPrice, itemDescrip);
    ol.append(listItem);

    
    const product = { name, price, description };
    savedProducts.push(product);
    localStorage.setItem('products', JSON.stringify(savedProducts));

       checkIfEmpty();

    adminForm.reset();
  });
});
