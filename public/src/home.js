function getTotalBooksCount(books) {
  let result = 0;
  const TotalBooksCount = books => result += 1;

  books.forEach(TotalBooksCount);
  return result;
}

function getTotalAccountsCount(accounts) {
  let result = 0;
  const TotalAccountsCount = accounts => result += 1;

  accounts.forEach(TotalAccountsCount);
  return result;
}

function getBooksBorrowedCount(books) {
  let result = 0;
  let bookBorrows = books.reduce ( ( acc, book) => [...acc, book.borrows[0]],[]);
  const BooksBorrowedCount = bookBorrows => result += bookBorrows.returned === false ? 1:0;

  bookBorrows.forEach(BooksBorrowedCount);
  return result;
}

function getMostCommonGenres(books) {
  let genres = [];
  const getGenre = (book) => genres.push(book.genre);
  
  books.forEach(getGenre);

  let result = [];
  for (let i = 0; i < genres.length;i++) {
    if (result.some(e=> e.name === genres[i])) {
      let currentGenreCount = result.find((genre) => genre.name === genres[i]);
      currentGenreCount.count +=1;
    } else {
      var genreCount = {name:genres[i], count:1}
      result.push(genreCount);
    }
  }
result.sort((genreA, genreB) => genreA.count < genreB.count ? 1: -1);

return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  let bookAndBorrows = books.map((book) => ({name: book.title, count: book.borrows.length}));
  bookAndBorrows.sort((bookA, bookB) => bookA.count < bookB.count ? 1 : -1);


  return bookAndBorrows.slice(0, 5);
}


function getMostPopularAuthors(books, authors) {
  let authorIdCount = [];
  let mostPopularBooks = getMostPopularBooks(books);
  for (let i = 0; i < mostPopularBooks.length; i++) {
    let matchingBook = books.find((book) => book.title === mostPopularBooks[i].name);
    let authorId = matchingBook.authorId;
    console.log(authorId);
    if (authorIdCount.some((authorId) => authorId.name === authorId)){
      let currentAuthor = authorIdCount.find((entry) => entry.name === authorId);
      currentAuthor.count += mostPopularBooks[i].count
    } else {
      var authorCount = {name:authorId, count:mostPopularBooks[i].count};
      authorIdCount.push(authorCount)
    }

  }  
  for (let i = 0; i < authorIdCount.length; i++) {
    let author = authors.find((author) => author.id === authorIdCount[i].name);
    let authorName = author.name.first + " " + author.name.last;
    authorIdCount[i].name = authorName;
  }
  authorIdCount.sort((authorA, authorB) => authorA.count < authorB.count ? 1 : -1);

return authorIdCount.slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
