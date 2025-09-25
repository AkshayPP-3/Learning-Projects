const library = [];
function Book(pages,book,author,read){
    this.id=crypto.randomUUID();
    this.pages=pages;
    this.book=book;
    this.author=author;
    this.read=read;
}

document.addEventListener('DOMContentLoaded', function() {
    const newBookBtn = document.querySelector(".new-book-btn");
    const bookDialog = document.querySelector(".book-dialog");
    const cancelBtn = document.querySelector("#cancel-btn");

    console.log("Button found:", newBookBtn);
    console.log("Dialog found:", bookDialog);
    console.log("Cancel button found:", cancelBtn);

   
    if (newBookBtn && bookDialog) {
        newBookBtn.addEventListener('click', () => {
            console.log("Button clicked!"); 
            try {
                if (typeof bookDialog.showModal === 'function') {
                    bookDialog.showModal();
                    console.log("Dialog opened with showModal()");
                } else {
                   
                    bookDialog.setAttribute('open', '');
                    bookDialog.style.display = 'block';
                    console.log("Dialog opened with fallback method");
                }
            } catch (error) {
                console.error("Error opening dialog:", error);
            }
        });
    } else {
        console.error("Button or dialog not found!");
    }

    
    if (cancelBtn && bookDialog) {
        cancelBtn.addEventListener('click', () => {
            console.log("Cancel clicked!"); 
            if (typeof bookDialog.close === 'function') {
                bookDialog.close();
            } else {
                bookDialog.removeAttribute('open');
                bookDialog.style.display = 'none';
            }
        });
    }
});





function addBookToLibrary() {
    

}