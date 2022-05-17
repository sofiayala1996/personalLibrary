class Libro{
    constructor(titulo, autor, ISBN) {
        this.titulo = titulo;
        this.autor   = autor;
        this.ISBN = ISBN
    }
    mostrarLibro() {
        return `Titulo: ${this.titulo} Autor: ${this.autor} ISBN: ${this.ISBN}`
    }
}

function agregarLibro(){
    //Obtener elementos del formulario
    let titulo = document.getElementById("inputTitulo").value;
    let autor = document.getElementById("inputAutor").value;
    let ISBN = document.getElementById("inputISBN").value;
    //Sumarlos al array Libros
    Libros.push(new Libro(titulo, autor, ISBN));
    //Actualizar el localStorage
    const actualizar = (clave, valor) => {localStorage.setItem(clave, valor) }; 
    actualizar("librosAlmacenados", JSON.stringify(Libros));
mostrandoLibros();
}

//Libros pre-guardados
const libro1 = new Libro("1Q84", "Haruki Murakami", "9780307476463");
const libro2 = new Libro("Inferno", "Dan Brown", "9780345806482");

const Libros = [ libro1 , libro2 ];

//Almacenar libros en localStorage
const guardarLocal = (clave, valor) => {localStorage.setItem(clave, valor) }; 
if(
    ! localStorage.getItem("librosAlmacenados")
){
    guardarLocal("librosAlmacenados", JSON.stringify(Libros));
}

//Ingresar libro nuevo
document.querySelector("#btn").addEventListener('click', () => {
    agregarLibro();
    $('#exampleModalCenter').modal('hide');
})

//API
async function f1(isbn){
    return fetch(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=hcdoOv4di8KDwLGjGi5me0trcc0fq0R5`)
    .then(response => response.json())
    .then(data => data.results[0].summary);
}

async function mostrandoLibros() {
    const save = localStorage.getItem("librosAlmacenados");
    const change = JSON.parse(save);
    const list = document.querySelector('#book-list');
    list.innerHTML = ""
    for (const libro of change) {
        const variable = await f1(libro.ISBN);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src = "https://covers.openlibrary.org/b/isbn/${libro.ISBN}-S.jpg"></td>
        <td>${libro.titulo}</td>
        <td>${libro.autor}</td>
        <td>${libro.ISBN}</td>
        <td>${variable}</td>
        <td><button type="button" id="boton-5" class="btn btn-danger delete ">X</button></td>`;
    list.appendChild(row);
    }
    
}
mostrandoLibros();

//Eliminar un libro agregado
function deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

document.querySelector('#book-list').addEventListener('click', (e) => {
    deleteBook(e.target);})
    
function removeBook(isbn) {
        const books = localStorage.getBooks();
    
        books.forEach((book, index) => {
          if(book.isbn === isbn) {
            books.splice(index, 1);
          }
        });

        localStorage.setItem('books', JSON.stringify(books));
      }




