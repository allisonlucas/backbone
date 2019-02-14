import React, { Component } from 'react';
import './App.css';
import data from './data.json';

class App extends Component {
  // normally we would dispatch an action call to HttpClient.get('/parbyWarker') in ComponentDidMount()
  // to get the data from the backend database. Since we have no database in this code challenge, it is simply
  // being read in from a local data.json file.
  state = {
    data,
    newPrice: null
  }

  _parseDate = (date) => {
    const dateParsed = new Date(date).toString();
    const dateArr = dateParsed.split(' ');
    const newArr = dateArr.splice(1, 3);
    const dateString = newArr.join(' ');
    return dateString;
  }

  _listData = () => {
    const { data } = this.state;
    return data.map((d,i) => {
      return (
        <li key={d.id} className="tableRow">
          <div className="tableItem">
            Parby Warker {d.name}
          </div>
          <div className="tableItem">
            ${d.price}
          </div>
          <div className="tableItem">
            <input placeholder="new price" onChange={ e => this.setState({ newPrice: e.target.value })}></input>
            <button onClick={ () => {
              // normally this would dispatch an action that would make a call to the api to update this item in the database
              // since we have no database in this code challenge, it is simply being updated in local state
              // normally, call the HttpClient file like:
              // HttpClient.putFormData({ '/updatePrice', this.state.data })
              const itemToModify = this.state.data.findIndex(el => el.id === d.id)
              this.state.data[itemToModify].price = this.state.newPrice;
              this.forceUpdate();
            } }>
              Update Price
            </button>
          </div>
          <div className="tableItem">
            {d.code}
          </div>
          <div className="tableItem">
            {d.creator}
          </div>
          <div className="tableItem">
            {this._parseDate(d.last_modified)}
          </div>
          <div className="tableItem">
            <button onClick={ () => {
              // normally this would dispatch an action that would make a call to the api to delete this item from the database
              // since we have no database in this code challenge, it is simply being updated in local state
              // normally, call the HttpClient file like:
              // HttpClient.deleteFormData({ '/deleteItem', d.id })
              this.setState({
                data: this.state.data.filter(el => el.id !== d.id)
              })
            } }>
              Delete Item
            </button>
          </div>
        </li>
      );
    })
  }

  render() {
    return (
      <div>
        <header className="app-header">
          <div className="tableContainer">
            <div className="tableHeader">
              <div className="tableHeaderItem">
                PRODUCT
              </div>
              <div className="tableHeaderItem">
                PRICE
              </div>
              <div className="tableHeaderItem">
                UPDATE PRICE
              </div>
              <div className="tableHeaderItem">
                CODE
              </div>
              <div className="tableHeaderItem">
                CREATED BY
              </div>
              <div className="tableHeaderItem">
                LAST MODIFIED
              </div>
              <div className="tableHeaderItem">
                DELETE
              </div>
            </div>
          </div>
          { this._listData() }
        </header>
      </div>
    );
  }
}

export default App;
