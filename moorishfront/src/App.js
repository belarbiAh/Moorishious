import React, {Component} from 'react';
import './App.css';
import './Forms/ListReference'
import ListReference from "./Forms/ListReference";
import AddReference from "./Forms/AddReference";
import axios from "axios";
import {Route, Link, BrowserRouter as Router} from 'react-router-dom';
import logo from "./resources/logo.png";
import './Forms/Menu.css';
import products from "./Forms/Products";


import AddUserInfo from "./Forms/AddUserInfo";
import productDetail from "./Forms/ProductDetail";

class App extends Component {

    state = {
        characters: []
    };

    removeCharacter = ref => {
        axios.post(`http://localhost:8080/deleteReference`, ref)
            .then(() => {
                const {characters} = this.state;
                this.setState({
                    characters: characters.filter((character) => {
                        return character.ref !== ref.ref;
                    })
                });
            })
            .catch(error => {
                console.log(error);
            })

    }

    handleSubmit = character => {
        this.setState({characters: [...this.state.characters, character]});
        console.log("hamidddddd", character);
    }

    componentWillMount() {
     /*   const config = {headers: {'Content-Type': 'multipart/form-data'}};
        axios.get(`http://localhost:8080/listReference`, config)
            .then(res => {
                console.log(res.data);
                this.setState({characters: res.data})
            })
            .catch((error) => {
                console.log(error);
            });*/
    }

    render() {
        // const {characters} = this.state;

        return (
            <>
                <Router>
                        <header>
                            <div className="logo">
                                <img src={logo} alt={"Moorish"}/>
                            </div>
                            <nav>
                                <ul>
                                    <li>
                                        <Link className="active cool" to="/table">List Reference</Link>
                                    </li>
                                    <li>
                                        <Link className="cool" to="/addReference">Add Reference</Link>
                                    </li>
                                    <li>
                                        <Link className="cool" to="/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link className="cool" to="/addUserInfo">Add User</Link>
                                    </li>
                                </ul>
                            </nav>
                            <div className="menu-toggle">
                                <i className="fa fa-bars" aria-hidden="true">
                                </i>
                            </div>
                        </header>

                    <div className="container">
                        <Route path="/table"
                               render={() => <ListReference
                                   removeCharacter={this.removeCharacter}
                               />}/>
                        <Route path="/addReference" render={() => <AddReference handleSubmit={this.handleSubmit}/>}/>
                        <Route path="/products" component={products}/>
                        <Route path='/product/:id' component={productDetail}/>
                        <Route path="/addUserInfo" component={AddUserInfo}/>
                    </div>
                </Router>



            </>
        );
    }
}

export default App;
