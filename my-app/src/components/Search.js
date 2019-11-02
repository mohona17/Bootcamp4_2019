import React from 'react';

class Search extends React.Component {
	//Capture the text that is typed into the textbox and store this value using the filterUpdate() function
	filterUpdate() {
		//Here you will need to update the value of the filter with the value from the textbox
		const val = this.myValue.value
		//this updates filter text 
		this.props.filterUpdate(val)
	}
	render() {
		//You will need to save the value from the textbox and update it as it changes
		//You will need the onChange value for the input tag to capture the textbox value

		return (
			<form>
				<input 
				type="text" 
				//Note: You will need to understand how to use ref values from form inputs
				ref = {(value) => {this.myValue = value}}
				placeholder="Type to Filter" 
				//use the onChange listener function
				onChange = {this.filterUpdate.bind(this)}
				/>
			</form>
		);
	}
}
export default Search;
