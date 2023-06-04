
// Your Code Here


async function createBook()
{
  //let id = document.getElementById('id');
    let title = document.getElementById('title');
    let year = document.getElementById('year');
    let description = document.getElementById('desc');
    let quan = document.getElementById('quantity');
    let img = document.getElementById('imageUrl');

    let  book = JSON.stringify({
    //    "id":id.value,
        "title": title.value,
        "year": year.year,
        "description": description.value,
        "quantity": quantity.value,
        "imageURL": img.value
      })

      let response = await fetch("http://localhost:3001/addBook",
                            {
                                headers: {
                                    "Content-type": "application/json"
                                  },
                               method: "POST",
                               body: book
                            }
      );
      let result = await response.json();
      console.log(result);
      location.reload();
}

async function updateBook(id)
{

  let quantID = "quantity"+id;
  console.log(quantID);
  let newQuantity = document.getElementById(quantID);
  console.log(newQuantity);
    let  book = JSON.stringify({
      "id":id,
      "quantity": newQuantity.value
    })

    let response = await fetch("http://localhost:3001/updateBook",
                          {
                              headers: {
                                  "Content-type": "application/json"
                                },
                             method: "PATCH",
                             body: book
                          }
    );
    let result = await response.json();
    console.log(result);
}

async function removeBook(id)
{

    let url = "http://localhost:3001/removeBook/"+id+"";
    console.log(url);
    let response = await fetch(url,
                          {
                              headers: {
                                  "Content-type": "application/json"
                                },
                             method: "Delete"
                          }
    );
    let result = await response.json();
    console.log(result);

    location.reload();
}


async function getBooks() {

  let response = await fetch('http://localhost:3001/listBooks')
  let books = await response.json()

  books.forEach(renderBook)
}

function renderBook(book) {
  let bookContainer = document.querySelector('.book-container')
  
  bookContainer.innerHTML += `
      <div class="col-sm-3">
          <div class="card" style="width: 100%;">
              ${book.imageURL ? `
                  <img class="card-img-top" src="${book.imageURL}" />
              `
              : ``}
              <div class="card-body">
                  <h5 class="card-title">${book.title}</h5>
                  
                  <p class="card-text">${book.description}</p>
                  <input type="text" maxlength="5" size ="5" id="quantity${book.id}" value ="${book.quantity}"/>
                  <button class="btn" onClick="updateBook(${book.id})">Save</button>
                  <button class="btn" onClick="removeBook(${book.id})">delete</button>
                  
              </div>
          </div>
      </div>
  `
}
getBooks();