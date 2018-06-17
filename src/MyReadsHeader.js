import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MyReadsHeader extends Component {
 
	render() {
		return (
			<div>
				<div className="list-books-title">
      				<h1>My Reads</h1>
      			</div>
      			<Link to="/search">Search Books</Link>
    		</div>
		)
	}

}

export default MyReadsHeader