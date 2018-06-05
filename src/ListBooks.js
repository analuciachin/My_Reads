import React, { Component } from 'react'
//import PropTypes from 'prop-types'

class ListBooks extends Component {
 
	render() {
		return (
			<div className="app">
			<div className="list-books">
            	<div className="list-books-title">
              		<h1>My Reads</h1>
            	</div>
				<div className="list-books-content">
					<div className="bookshelf">
                  		
					<h2 className="bookshelf-title">{this.props.currentShelf}</h2>
						<div className="bookshelf-books">
							<ol className='books-grid'>
								<li>
								{this.props.books.map((book) => (
									<div key={book.id} className='book'>
										<div className='book-top'>
											<div className='book-cover' style={{
												backgroundImage: `url(${book.coverURL})`, width: 128, height: 193}}>
											</div> {/*div book-cover*/}
											<div className='book-shelf-changer'>
                              					<select id='selectedShelf' onChange={() => this.props.onDeleteReading(book)}>
		                                			<option value='none' disabled>Move to...</option>
		                                			<option value='currentlyReading'>Currently Reading</option>
		                                			<option value='wantToRead'>Want to Read</option>
		                                			<option value='read'>Read</option>
		                                			<option value='none'>None</option>
		                            			</select>
                            				</div> {/*div book-shelf-changer*/}
										</div> {/*book-top*/}
										<div className='book-title'>{book.title}</div>
                        				<div className='book-authors'>{book.authors}</div>
                        				<div className='book-authors'>{book.shelf}</div>
									</div> //div book	
								))}
								</li>
							</ol>
						</div> {/*div bookshelf-books*/}
					</div> {/*div bookshelf*/}
				</div> {/*div list-books-content*/}
			</div> {/*div list-books*/}
			</div> /*div app*/
		)
	}

}

export default ListBooks

