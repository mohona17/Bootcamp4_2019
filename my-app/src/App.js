import React from 'react';
import Search from './components/Search';
import ViewBuilding from './components/ViewBuilding';
import BuildingList from './components/BuildingList';
import Credit from './components/Credit';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      selectedBuilding: 0,
      deleted: new Set(),
      //I made data a state so we can add listings
      data: this.props.data,
      //This state tracks the ID of the new listings
      numberOfListings: this.props.data.length + 1
    };
  }

  filterUpdate(value) {
    //Here you will need to set the filterText property of state to the value passed into this function
    this.setState({
      filterText: value
    })
  }

  selectedUpdate(id) {
    //Here you will need to update the selectedBuilding property of state to the id passed into this function
    this.setState({
      selectedBuilding: id
    })
  }

  deleteListing(id) {
    //Creates a Hash Set of deleted listings so they are not printed to the UI
    const list = this.state.deleted.add(id)
    this.setState({
      deleted: list
    })
  }

  add(_code, _name, _lat, _long, _address) {

    //Element is a building
    let element = {
      id: null,
      code: _code,
      name: _name,
      coordinates: {
        latitude: null,
        longitude: null
      },
      address: null
    }

    //Checking if there was input for the coordinates and address
    if (_lat.length != 0) element.coordinates.latitude = _lat
    if (_long.length != 0) element.coordinates.longitude = _long
    if (_address.length != 0) element.address = _address

    console.log("My data", this.state.data)
    //Will not add listing with no code or name
    if (element.code.length != 0 && element.name.length != 0) {
      //Update the number of listings
      this.setState({
        numberOfListings: this.state.numberOfListings + 1
      })

      console.log("Number of Listings",this.state.numberOfListings)
      //Set ID
      element.id = this.state.numberOfListings
      console.log("Element ID",element.id)
      //Updating data
      const list = this.state.data.concat(element)
      this.setState({
        data: list
      })
    }
  }


  render() {
    return (
      <div className="bg">
        <div className="title">
          <h1><b>UF Directory App</b></h1>
        </div>
        <div>
          <h2>Add a listing here</h2>
          <form id="newListing">
            Code: <input name="code" ></input>
            Name: <input className="testinput" name="name"></input>
            <h4>Optional:</h4>
            Latitude: <input name="lat" ></input>
            Longitude: <input name="long" ></input>
            Address: <input className="testinput" name="address" ></input>
          </form>
          <button onClick={() => this.add( //grabbing the values from form
            document.getElementById("newListing").elements["code"].value,
            document.getElementById("newListing").elements["name"].value,
            document.getElementById("newListing").elements["lat"].value,
            document.getElementById("newListing").elements["long"].value,
            document.getElementById("newListing").elements["address"].value)}
          > Add a listing </button>
        </div>
        <h2>Available Listings:</h2>
        <Search
          filterText={this.state.filterText}
          filterUpdate={this.filterUpdate.bind(this)}
        />
        <main>
          <div className="row">
            <div className="column1">
              <div className="tableWrapper">
                <table className="table table-striped table-hover">
                  <tr>
                    <td>
                      <b>Code Building</b>
                    </td>
                  </tr>
                  <BuildingList
                    //properties/methods to pass to BuildingList
                    data={this.state.data} //made sure to pass in state, not property so that we can add listings
                    filterText={this.state.filterText}
                    selectedUpdate={this.selectedUpdate.bind(this)}
                    deleteListing={this.deleteListing.bind(this)}
                    deleted={this.state.deleted}
                  />
                </table>
              </div>
            </div>
            <div className="column2">
              <ViewBuilding
                selectedBuilding={this.state.selectedBuilding}
                data={this.state.data}
              />
            </div>
          </div>
          <Credit />
        </main>
      </div>
    );
  }
}

export default App;
