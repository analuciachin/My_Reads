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

  		
  		BooksAPI.getAll().then((books) => { 
  			books.map((book) => {
  				this.bookId.push(book.id);
  				this.bookShelf.push(book.shelf)
  			})
  		})
	}

	// add shelf property to the books in the search section
	upsertShelfProperty(book)  {
		this.bookId.map((bookIdOnShelf, index) => {
			if (bookIdOnShelf === book.id) {
				book.shelf = this.bookShelf[index];
			} else {
				book.shelf = 'none';
			}
		})
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
		
		let empty = []
		if (query) {
			BooksAPI.search(query).then((books) => {
				if(Array.isArray(books)) {  //handled invalid queries
					books.map((book) => {
						this.upsertShelfProperty(book);  //handled books without smallThumbnail
  						if( !book.imageLinks ) {
  							book.imageLinks = {};
  							book.imageLinks.smallThumbnail = '';						
  						}
  					})

  					this.setState({ none: books} )					
				}
			})
		}
		else {			
			this.setState( {none: empty} )  //search results are not shown when all the text is deleted
		}
	}

  	changeShelves = (book) => {    	
      		
      		let selectedShelf = document.getElementById('book'+ book.id);
      		let shelfTo = selectedShelf.options[selectedShelf.selectedIndex].value;

      		BooksAPI.update(book, shelfTo).then((response) => {
      			//console.log(response);
      			this.bookId.push(book.id);
      			this.bookShelf.push(shelfTo);
      			let noneCopy = this.state.none.map((bookFromQuery) => {
      				if (bookFromQuery.id === book.id) {
      					//console.log(bookFromQuery);
      					bookFromQuery.shelf = shelfTo; 
      				}
      				return bookFromQuery;
      			});
      			//console.log(noneCopy);
      			this.setState({none: noneCopy});


      		})    	
  	}

  	disableCurrentShelfOption = (book) => {
  		let optionSelected = document.getElementById('book'+ book.id).getElementsByTagName('option');
  		//console.log(book);				
  		
		for (var i=0; i< this.bookId.length; i++) {
			if (this.bookId[i] === book.id) {
				for (var j=0; j<optionSelected.length; j++) {
					if (optionSelected[j].value === this.bookShelf[i]) {
						console.log(j)
						optionSelected[j].disabled = true;
						optionSelected[0].selected = true;
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
				<ListBooks onDisableShelfOption={this.disableCurrentShelfOption} onChangeShelves={this.changeShelves} books={this.state.none} currentShelf="none" />
			</div>

		)
	}
}

export default SearchBooks 