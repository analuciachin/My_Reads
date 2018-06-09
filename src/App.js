import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import ListBooks from './ListBooks'
/*
const books = [
  {
    "id": "1",
    "coverURL": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
    "title": "To Kill a Mockingbird",
    "authors": "Harper Lee",
    "shelf": "Currently Reading"
  },
  {
    "id": "2",
    "coverURL": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api", 
    "title": "Ender's Game",
    "authors": "Orson Scott Card",
    "shelf": "Currently Reading" 
  }
]
*/

class BooksApp extends React.Component {
  state = {
    currentlyReading: [
      {
        "id": "0",
        "coverURL": "http://books.google.com/books/content?id=PGR2AwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73-GnPVEyb7MOCxDzOYF1PTQRuf6nCss9LMNOSWBpxBrz8Pm2_mFtWMMg_Y1dx92HT7cUoQBeSWjs3oEztBVhUeDFQX6-tWlWz1-feexS0mlJPjotcwFqAg6hBYDXuK_bkyHD-y&source=gbs_api",
        "title": "To Kill a Mockingbird",
        "authors": "Harper Lee",
        "shelf": "currentlyReading"
      },
      {
        "id": "1",
        "coverURL": "http://books.google.com/books/content?id=yDtCuFHXbAYC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72RRiTR6U5OUg3IY_LpHTL2NztVWAuZYNFE8dUuC0VlYabeyegLzpAnDPeWxE6RHi0C2ehrR9Gv20LH2dtjpbcUcs8YnH5VCCAH0Y2ICaKOTvrZTCObQbsfp4UbDqQyGISCZfGN&source=gbs_api", 
        "title": "Ender's Game",
        "authors": "Orson Scott Card",
        "shelf": "currentlyReading"
      }
    ],
    wantToRead: [
      {
        "id": "3",
        "coverURL": "http://books.google.com/books/content?id=uu1mC6zWNTwC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73pGHfBNSsJG9Y8kRBpmLUft9O4BfItHioHolWNKOdLavw-SLcXADy3CPAfJ0_qMb18RmCa7Ds1cTdpM3dxAGJs8zfCfm8c6ggBIjzKT7XR5FIB53HHOhnsT7a0Cc-PpneWq9zX&source=gbs_api",
        "title": "1776",
        "authors": "David McCullough",
        "shelf": "wantToRead"
      },
      {
        "id": "4",
        "coverURL": "http://books.google.com/books/content?id=wrOQLV6xB-wC&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72G3gA5A-Ka8XjOZGDFLAoUeMQBqZ9y-LCspZ2dzJTugcOcJ4C7FP0tDA8s1h9f480ISXuvYhA_ZpdvRArUL-mZyD4WW7CHyEqHYq9D3kGnrZCNiqxSRhry8TiFDCMWP61ujflB&source=gbs_api",
        "title": "Harry Potter and the Sorcerer's Stone",
        "authors": "J.K. Rowling",
        "shelf": "wantToRead"
      }
    ],
    read: [
      {
        "id": "5",
        "coverURL": "http://books.google.com/books/content?id=pD6arNyKyi8C&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE70Rw0CCwNZh0SsYpQTkMbvz23npqWeUoJvVbi_gXla2m2ie_ReMWPl0xoU8Quy9fk0Zhb3szmwe8cTe4k7DAbfQ45FEzr9T7Lk0XhVpEPBvwUAztOBJ6Y0QPZylo4VbB7K5iRSk&source=gbs_api",
        "title": "The Hobbit",
        "authors": "J.R.R. Tolkien",
        "shelf": "read" 
      },
      {
        "id": "6",
        "coverURL": "http://books.google.com/books/content?id=1q_xAwAAQBAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE712CA0cBYP8VKbEcIVEuFJRdX1k30rjLM29Y-dw_qU1urEZ2cQ42La3Jkw6KmzMmXIoLTr50SWTpw6VOGq1leINsnTdLc_S5a5sn9Hao2t5YT7Ax1RqtQDiPNHIyXP46Rrw3aL8&source=gbs_api", 
        "title": "Oh, the Places You'll Go!",
        "authors": "Seuss",
        "shelf": "read" 
      }
    ]
    
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    //showSearchPage: false
  }


  changeShelves = (book) => {
    this.setState((state) => {
      let shelfFrom = book.shelf;
      console.log(shelfFrom);
      let shelfTo = document.getElementById('selectedShelf').value;  
      console.log(shelfTo);
      let updatedState = {};
      updatedState[shelfFrom] = state[shelfFrom].filter(b => book.id !== b.id);
      updatedState[shelfTo] = state[shelfTo].concat(book); 
      

      return updatedState; //{ 
        
        //reading: state.reading.filter(b => book.id !== b.id),
        //wantToRead: state.wantToRead.concat(book)
        //selectedShelf: state.selectedShelf.push(book.id)
      //}
    })
  }

  render() {
    return (
      <div className="app">
        <ListBooks onChangeShelves={this.changeShelves} books={this.state.currentlyReading} currentShelf="Currently Reading" />
        <ListBooks onChangeShelves={this.changeShelves} books={this.state.wantToRead} currentShelf="Want to Read"/>
        <ListBooks onChangeShelves={this.changeShelves} books={this.state.read} currentShelf="Read"/>
      </div>
    )
  }
}

export default BooksApp