function findAccountById(accounts, id) {
const result = accounts.find((account) => account.id === id);

  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1);
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let borrowIds = [];
  for (let book in books){
    let currentBook = books[book];
    let currentBookBorrows = currentBook.borrows;
    let borrows = currentBookBorrows.map( (borrows) => borrows.id);
    for (borrow in borrows){
      borrowIds.push(borrows[borrow]);
    }
  }
  
  let result = borrowIds.filter((id) => id === account.id);


  return result.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksCheckedOut = [];
  for (let book in books){
    let currentBook = books[book];
    let currentBookBorrows = currentBook.borrows;
    let borrow = currentBookBorrows.find( (borrow) => borrow.returned === false && borrow.id === account.id);
    if (borrow){
      booksCheckedOut.push(currentBook);
    }
  }
  let result = [];
  for (let i = 0; i < booksCheckedOut.length; i++) {
    let author = authors.find((author) => booksCheckedOut[i].authorId === author.id);
    const bookWithAuthor = { ...booksCheckedOut[i], author: author};
    result.push(bookWithAuthor);
  }
 return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
