class Book{

    constructor(title,author,isbn){
         this.title = title;
         this.author = author;
         this.isbn = isbn;
    }
}
class UI{
    static addBookToList(book){
        const list =document.querySelector("#book-list")
        const row=document.createElement("tr") //<tr></tr>
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
        `;
        console.log(row)
        list.appendChild(row);
    }
    static clearAllFields(){
        document.querySelector("#title").value='';
        document.querySelector("#author").value='';
        document.querySelector("#isbn").value='';
        
    } 
    static showAlert(msg,className){
        const div=document.createElement("div"); //<div></div>
        div.className= `alert alert-${className}`;
        const var1=document.createTextNode(msg);
        div.appendChild(var1);
        const container =document.querySelector(".container");
        const form=document.querySelector("#book-form");
        container.insertBefore(div,form);
        setTimeout(function(){
            document.querySelector(".alert").remove()},5000)
        }

   static deleteBook(x){
        if(x.target.classList.contains('delete')){
            if(confirm("Are You Sure To Delete The Book ?")){
                x.target.parentElement.parentElement.remove();
            }
        }
   }



   // Jab Phale se kuch book Add krni ho --->>>>>


   static displayBooks() {
    // const StoredBooks = [
    //     {
    //         title: 'Book One',
    //         author: 'John Doe',
    //         isbn: '1234'
    //     },
    //     {
    //         title: 'Book One',
    //         author: 'John Doe',
    //         isbn: '1234'
    //     }
    // ];
    // const books = StoredBooks;
    const books = Store.getBooks();
    //  console.log("helelo"+books);
    //  console.log(typeof(books));
    books.forEach((book) => UI.addBookToList(book));

    }
}
//Storage Class: Handles storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }


    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = Store.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn === isbn)
            books.slice(index,1);

        })
        localStorage.setItem('books',JSON.stringify(books));
    }

}


//Event: Display Book
document.addEventListener('DOMContentLoaded', UI.displayBooks);


/*const AddBook = (e) =>{
    e.preventDefault()
    console.log("Test")
}*/

//Event: Add a Book
document.querySelector("#book-form").addEventListener('submit', (e) =>{
    
    // prevent default values
    e.preventDefault()
    
    //get from values
    const title = document.querySelector("#title").value;
    const author= document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;
    

    // Validate
    if(title== '' || author== '' || isbn ==  ''){
        //alert("Please FIll All The Fields")
        UI.showAlert("Please FIll All The Fields","danger");
        return;
    }
       //Instatiate a Book
        const book = new Book(title,author,isbn);

        //Add Book to UI
        UI.addBookToList(book);

        //Add Book to localStorage
        Store.addBook(book);

        // clear fields
        UI.clearAllFields();

        //Show the Success msg
        UI.showAlert("Book Added Succesfully","success");

    })
       // Event: remove a Book
        document.querySelector("#book-list").addEventListener("click",(x) => {
           // delete Book from UI
            UI.deleteBook(x);
            // Show the delete alert msg
            UI.showAlert("Book Deleted Succesfully","success");      

})