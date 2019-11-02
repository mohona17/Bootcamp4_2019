import React from 'react';
import BuilingList from './BuildingList';

class ViewBuilding extends React.Component {
	render() {
		const {data,selectedBuilding} = this.props; 
		console.log({selectedBuilding})
//Return additional details of the building to be rendered on the screen for the user
		if(selectedBuilding<1){ //IDs start at 1
			return (
				<div>
					<p>
						{' '}
						<p>Click on a name to view more information</p>
						
					</p>
				</div>
			);
		}
		//Assuming that a listing with an address must have coordinates
		else if((data[selectedBuilding-1].coordinates == null) || data[selectedBuilding-1].address == null){
			return(
				<div>
					<p>
						{' '}
						<p>No additional information</p>
					</p>
				</div>
			);
		}
		else{
			return(
				<div>
					<p>
						{' '}
						<p>Additional Information for <strong>{data[selectedBuilding-1].name}</strong></p>
						<p>Coordinates:</p>
								<blockquote>Latitude: {data[selectedBuilding-1].coordinates.latitude}</blockquote>
								<p> </p>
								<blockquote>Longitude: {data[selectedBuilding-1].coordinates.longitude}</blockquote>
						<p>Address: {data[selectedBuilding-1].address}</p>
						
					</p>
				</div>
			);
		}
	}
}
export default ViewBuilding;
