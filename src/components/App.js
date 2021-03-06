import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      adoptedPets: [],
      filters: {
        type: 'all',
      }
    };
  }

onChangeType = (e) =>{
    this.setState({ filters: {...this.state.filters, type: e.target.value} })
}

onFindPetsClick = () => {
    let url = '/api/pets';

    this.state.filters.type !== 'all' ? url += `?type=${this.state.filters.type}` : url


    fetch(url)
      .then(res => res.json())
      .then(pets => this.setState({ pets }))
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map(pet => {
      return pet.id === petId ?
        { ...pet, isAdopted: true } : pet
    });
    this.setState({ pets })
  }


render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
              onChangeType = {this.onChangeType}
              onFindPetsClick = {this.onFindPetsClick}
               />
            </div>
            <div className="twelve wide column">
              <PetBrowser
              pets = {this.state.pets}
              adoptedPets = {this.state.adoptedPets}
              onAdoptPet = {this.onAdoptPet} 
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
