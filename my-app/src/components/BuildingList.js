import React from 'react';


class BuilingList extends React.Component {
	render() {
		const { data, filterText, selectedUpdate, deleteListing, deleted} = this.props;
		console.log('This is my directory file', data);	
		console.log("Deleted listings",{deleted})
		const buildingList = data
			//This filters the list of buildings based off of the search 
			.filter(directory =>{
				//remove names that do not match current filter text  
				console.log("filter text: ", filterText)
				//If listing was deleted, do not print
				if(!deleted.has(directory.id)){
					//Returning either the code or the name of the listing that matches the filterText
					return ((directory.name.toLowerCase().indexOf(filterText.toLowerCase()) >= 0) || 
					(directory.code.toLowerCase().indexOf(filterText.toLowerCase()) >= 0))
				}
			})
			.map(directory => {
				//If listing was deleted, do not print
				if(!deleted.has(directory.id)){
					return (
						//Create an onClick listener action that will allow you to click on a building name and capture the ID
						<tr key={directory.id}
							onClick={() => selectedUpdate(directory.id)}>
							<td>{directory.code} </td>
							<td> {directory.name} </td>
							<button onClick={() => deleteListing(directory.id)}>Delete</button> 
						</tr>
						//the button above allows you to delete a listing
					);
				}
		});

		return <div>{buildingList}</div>;
	}
}
export default BuilingList;
