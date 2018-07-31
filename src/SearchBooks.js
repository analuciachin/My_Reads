import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {

	constructor(props) {
		super(props);
		this.bookId = [];
  	this.bookShelf = [];
  	this.upsertShelfProperty = this.upsertShelfProperty.bind(this);
  		this.state  = {
			query: '',
			none: []
		}
       
		this.props.booksOnShelf.map((book) => {
			this.bookId.push(book.id);
  		this.bookShelf.push(book.shelf)
		})
	}

	//add shelf property to the books in the search section
	upsertShelfProperty(book)  {
    let isBookFoundInShelf = false;
		this.bookId.map((bookIdOnShelf, index) => {
			if (bookIdOnShelf === book.id) {
        isBookFoundInShelf = true;
        book.shelf = this.bookShelf[index];        
			} else if (!isBookFoundInShelf) {        
				book.shelf = 'none';       
			}
      return book;
		})
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
		
		let empty = []
		if (query) {
			BooksAPI.search(query).then((books) => {
				if(Array.isArray(books)) {  //handled invalid queries
					let booksCopy = books.map((book) => {                     
						this.upsertShelfProperty(book);              
						if( !book.imageLinks ) {  //handled books without smallThumbnail
							book.imageLinks = {};
							book.imageLinks.smallThumbnail = '';
						}
            return book;
					})
					this.setState({ none: booksCopy} )					
				}
			})
		}
		else {			
			this.setState( {none: empty} )  //search results are not shown when all the text is deleted
		}
	}

	moveToShelf = (book) => {      
		let selectedShelf = document.getElementById('book'+ book.id);
		let shelfTo = selectedShelf.options[selectedShelf.selectedIndex].value;
		let count=0;

    for (var i=0; i<this.bookId.length; i++) {
      if (this.bookId[i] === book.id) {
        this.bookShelf[i] = shelfTo;
        count++;
      }
    }

    if(count === 0) {
      this.bookId.push(book.id);
      this.bookShelf.push(shelfTo);
    }
	
  	let noneCopy = this.state.none.map((bookFromQuery) => {
      let bookFromQueryCopy = {...bookFromQuery}; //creating a shallow copy of bookFromQuery
  		if (bookFromQuery.id === book.id) {
  		   bookFromQueryCopy.shelf = shelfTo; 
  		}
  		return bookFromQueryCopy;
  	});
		this.setState({none: noneCopy});
    this.props.onChangeShelves(book); //props from the parent (main page)		
	}

	disableCurrentShelfOption = (book) => {   
		let optionSelected = document.getElementById('book'+ book.id).getElementsByTagName('option');		
	  for (var i=0; i< this.bookId.length; i++) {
		  if (this.bookId[i] === book.id) {
		    for (var j=0; j<optionSelected.length; j++) {
			    if (optionSelected[j].value === this.bookShelf[i]) {
					optionSelected[j].disabled = true;
				 	optionSelected[0].selected = true;
				  }
				  else {
					  optionSelected[j].disabled = false;
				  }
			  }
		  }
	  }
	}


	render() {

		return (
			<div>
				<div className="search-books">
            		<div className="search-books-bar">
              			<Link className="close-search" to="/">Close</Link>
              			<div className="search-books-input-wrapper">
		                {/*
		                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
		                  You can find these search terms here:
		                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

		                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
		                  you don't find a specific author or title. Every search is limited by search terms.
		                */}
                			<input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
              			</div>
            		</div>
            		<div className="search-books-results">              			
            		</div>
          		</div>
				<ListBooks onDisableShelfOption={this.disableCurrentShelfOption} onChangeShelves={this.moveToShelf} books={this.state.none} currentShelf="none" />
			</div>

		)
	}
}

export default SearchBooks 