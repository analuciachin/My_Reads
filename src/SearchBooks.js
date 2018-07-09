import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListBooks from './ListBooks'
import * as BooksAPI from './BooksAPI'


class SearchBooks extends Component {

	state = {
		query: '',
		none: []
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
		if (this.state.query) {
			BooksAPI.search(this.state.query).then((books) => { this.setState( {none: books} ) })
		}
	}


  	changeShelves = (book, currentShelfValue) => {
    	this.setState((state) => {
      		//let shelfFrom = currentShelfValue;
      
      		let selectedShelf = document.getElementById('book'+ book.id);
      		let shelfTo = selectedShelf.options[selectedShelf.selectedIndex].value;

      		//let updatedState = {};
      		//updatedState[shelfFrom] = state[shelfFrom].filter(b => book.id !== b.id);
      		//updatedState[shelfTo] = state[shelfTo].concat(book); 
      
      		BooksAPI.update(book, shelfTo);
      		//console.log(book)
      		//return updatedState;
    	})
  	}

  	disableOptions = (book) => {
  		let bookId = [];
  		let bookShelf = [];
  		let optionSelected = document.getElementById('book'+ book.id).getElementsByTagName('option');
  		
  		BooksAPI.getAll().then((books) => { 
  			books.map((book) => {
  				bookId.push(book.id);
  				bookShelf.push(book.shelf)
  			})
  		})
  		BooksAPI.search(this.state.query).then((books) => { 
  			for(var x=0; x<books.length; x++) {
  				for (var i=0; i< bookId.length; i++) {
  					if (bookId[i] === book.id) {
  						console.log(i);
  						for (var j=0; j<optionSelected.length; j++) {
      						if (optionSelected[j].value === bookShelf[i]) {
        						optionSelected[j].disabled = true;
      						}
    					}
  					}
  				}
  			}
  		})
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
				<ListBooks onDisable={this.disableOptions} onChangeShelves={this.changeShelves} books={this.state.none} currentShelf="none" />
			</div>

		)
	}
}

export default SearchBooks 