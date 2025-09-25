const library = [];
function Book(pages,book,author,read){
    this.id=crypto.randomUUID();
    this.pages=pages;
    this.book=book;
    this.author=author;
    this.read=read;
}
// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    const newBookBtn = document.querySelector(".new-book-btn");
    const bookDialog = document.querySelector(".book-dialog");
    const cancelBtn = document.querySelector("#cancel-btn");

    // Debug: Check if elements are found
    console.log("Button found:", newBookBtn);
    console.log("Dialog found:", bookDialog);
    console.log("Cancel button found:", cancelBtn);

    // Show dialog when "Add New Book" button is clicked
    if (newBookBtn && bookDialog) {
        newBookBtn.addEventListener('click', () => {
            console.log("Button clicked!"); // Debug log
            try {
                if (typeof bookDialog.showModal === 'function') {
                    bookDialog.showModal();
                    console.log("Dialog opened with showModal()");
                } else {
                    // Fallback for browsers that don't support showModal()
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

    // Close dialog when "Cancel" button is clicked
    if (cancelBtn && bookDialog) {
        cancelBtn.addEventListener('click', () => {
            console.log("Cancel clicked!"); // Debug log
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