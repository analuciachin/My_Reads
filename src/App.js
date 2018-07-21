import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReadsHeader from './MyReadsHeader'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'


class BooksApp extends React.Component {
  state = {    
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: [],
      booksOnShelf: []
  }
  
  componentDidMount() {
    let updateStateBooks = {
      currentlyReading: [],
      wantToRead: [],
      read: [],
      none: []
    }

    BooksAPI.getAll().then((books) => {
      this.setState({ booksOnShelf: books });

      books.map((book) => {
        if(book.shelf === 'currentlyReading') {
          updateStateBooks['currentlyReading'].push(book);
        }
        else if (book.shelf === 'wantToRead') {
          updateStateBooks['wantToRead'].push(book);
        }
        else if (book.shelf === 'read') {
          updateStateBooks['read'].push(book);
        }
      return updateStateBooks;
      })

      this.setState( updateStateBooks );
    })
  }

  changeShelves = (book) => {

    this.setState((state) => {
      let shelfFrom = book.shelf;
      
      let selectedShelf = document.getElementById('book'+ book.id);
      let shelfTo = selectedShelf.options[selectedShelf.selectedIndex].value;

      let updatedState = {};
      updatedState[shelfFrom] = state[shelfFrom].filter(b => book.id !== b.id);
      updatedState[shelfTo] = state[shelfTo].concat(book);

      BooksAPI.update(book, shelfTo).then(book.shelf=shelfTo);

      return updatedState;

    })
  }

  disableCurrentShelfOption = (book) => {
    let optionSelected = document.getElementById('book'+ book.id).getElementsByTagName('option');
    for (var i=0; i<optionSelected.length; i++) {
      if(optionSelected[i].value === book.shelf) {
        optionSelected[i].disabled = true;
        optionSelected[0].selected = true;
      }
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div>  
            <MyReadsHeader />
            <ListBooks onDisableShelfOption={this.disableCurrentShelfOption} onChangeShelves={this.changeShelves} books={this.state.currentlyReading} currentShelfTitle="Currently Reading" />
            <ListBooks onDisableShelfOption={this.disableCurrentShelfOption} onChangeShelves={this.changeShelves} books={this.state.wantToRead} currentShelfTitle="Want to Read" />
            <ListBooks onDisableShelfOption={this.disableCurrentShelfOption} onChangeShelves={this.changeShelves} books={this.state.read} currentShelfTitle="Read" />
          </div>
        )} />
        
        <Route path="/search" render={() => (
          <div>
            <SearchBooks />
          </div>
        )} />

      </div>
    )
  }
}

export default BooksApp