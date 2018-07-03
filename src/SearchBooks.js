import React, { Component } from 'react'
//import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'
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
  		let bookTitle = [];
  		let bookShelf = [];
  		let optionSelected = document.getElementById('book'+ book.id).getElementsByTagName('option');
  		
  		BooksAPI.getAll().then((books) => { 
  			books.map((book) => {
  				bookTitle.push(book.title);
  				bookShelf.push(book.shelf)
  			})
  		})
  		BooksAPI.search(this.state.query).then((books) => { 
  			books.map((book) => {
  				for(var i=0; i<bookTitle.length; i++) {
  					console.log(book.title);
  					console.log(bookTitle[i]);
  					console.log(bookTitle);
  					if(book.title === bookTitle[i]) {
  						for (var j=0; j<optionSelected.length; j++) {
  							if(optionSelected[j].value === bookShelf[i]) {
        						optionSelected[j].disabled = true;
      						}
  						}
  					}
  				}	
  			})
  		})
  	}


	render() {

		{/*
		if (this.state.query) {
			BooksAPI.search(this.state.query).then((books) => { this.setState( {none: books} ); console.log(books) })
		}
		*/}

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