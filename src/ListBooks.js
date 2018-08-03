import React from 'react'

function ListBooks(props) {
 
	return (
		<div className="list-books-content">
			<div className="bookshelf">
			<h2 className="bookshelf-title">{props.currentShelfTitle}</h2>
				<div className="bookshelf-books">
					<ol className='books-grid'>
						<li>
						{props.books.map((book) => (
							<div key={book.id} className='book'>
								<div className='book-top'>
									<div className='book-cover' style={{
										backgroundImage: `url(${book.imageLinks.smallThumbnail})`, width: 128, height: 193}}>
									</div> {/*div book-cover*/}
									<div className='book-shelf-changer'>
                      					<select id={'book' + book.id} onClick={() => props.onDisableShelfOption(book)} onChange={() => props.onChangeShelves(book)}>
                                			<option value='none'>Move to...</option>		                                			
                                			<option value='currentlyReading' disabled={book.shelf === 'currentlyReading'}>Currently Reading</option>
                                			<option value='wantToRead' disabled={book.shelf === 'wantToRead'}>Want to Read</option>
                                			<option value='read' disabled={book.shelf === 'read'}>Read</option>
                                			<option value='none' disabled={book.shelf === 'none'}>None</option>
                            			</select>
                    				</div> {/*div book-shelf-changer*/}
								</div> {/*book-top*/}
								<div className='book-title'>{book.title}</div>
                				<div className='book-authors'>{book.authors}</div>
							</div> //div book	
						))}
						</li>
					</ol>
				</div> {/*div bookshelf-books*/}
			</div> {/*div bookshelf*/}
		</div> /*div list-books-content*/
	)
}



export default ListBooks

