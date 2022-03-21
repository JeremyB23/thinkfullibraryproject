function findAuthorById(authors, id) {
  let result = authors.find((author) => author.id === id);
  
  return result;
}

function findBookById(books, id) {
  let result = books.find((book) => book.id === id);

  return result;
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  const borrowed = books.filter((book) => book.borrows[0].returned === false);
  result.push(borrowed);
  const notBorrowed = books.filter((book) => book.borrows[0].returned === true);
  result.push(notBorrowed);
  
  return result;
}

function getBorrowersForBook(book, accounts) {
  let result = [];
  const bookBorrows = book.borrows;
  for (let i = 0; i < bookBorrows.length; i++) {
    let account = accounts.find((account) => account.id === bookBorrows[i].id);
    const accountWithReturned = { ...account, returned: bookBorrows[i].returned };
    result.push(accountWithReturned);
  } 
  return result.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
