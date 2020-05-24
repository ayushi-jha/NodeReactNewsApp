import React, { Component } from 'react';
import './App.css';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Cards from "./Cards";
import Search from "./Search";
import Article from "./Article";
import Favorites from "./Favorites";
import Switch from "react-switch";
import { MdBookmark, MdBookmarkBorder } from 'react-icons/md';
import _ from "lodash";
import { withRouter } from 'react-router-dom';
import ASelect from "./ASelect";
import ReactTooltip from 'react-tooltip';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Switch as RouteSwitch, Route, Link } from 'react-router-dom';
class App extends Component {

   constructor() {
    super();
    var checked_ls = true;
    if (localStorage.getItem("news_switch") === "false")
    {
      checked_ls = false;
    }
    this.state = { 
          checked: checked_ls,
        data_old: null,
        results: [],
        articleView: false,
        bookmark: false,
        search_param: null
     };
    this.handleSwitch = this.handleSwitch.bind(this);
    this.handleArticle = this.handleArticle.bind(this);
  }

  handleSwitch(checked) 
  {
    this.setState({ checked });
    if (checked)
    {
      localStorage.setItem("news_switch", "true");
    }
    else 
    {
      localStorage.setItem("news_switch", "false");
    }
  }
  handleArticle(bool_a, bool_b) {this.setState({articleView: bool_a, bookmark: bool_b}); this.set_search(null);}
  set_search(input_search) {this.setState({search_param: input_search})}
  render() {
    return (
      <>
      <BrowserRouter>
      <Navbar collapseOnSelect className="gradient-for-nav" expand="lg" bg="primary" variant="dark" style={{ marginBottom: 10 }}>
      <ASelect set_search={this.set_search.bind(this)} />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" className="ml-auto"/>
      <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
    
      <Nav.Link as={Link} to="/" href="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/World" href="/World">World</Nav.Link>
      <Nav.Link as={Link} to="/Politics" href="/Politics">Politics</Nav.Link>
      <Nav.Link as={Link} to="/Business" href="/Business">Business</Nav.Link>
      <Nav.Link as={Link} to="/Technology" href="/Technology">Technology</Nav.Link>
      <Nav.Link as={Link} to="/Sports" href="/Sports">Sports</Nav.Link>
    </Nav>
        <Nav>
    <Nav.Link as={Link} to="/favorites" href="/favorites" className="active" data-tip="Bookmark" data-effect="solid" data-place="bottom" id="bookmark-tooltip">{(this.state.bookmark)?<MdBookmark size={24} />:<MdBookmarkBorder size={24} />}</Nav.Link>
    {(!this.state.articleView)?<>
      <p className="nav navbar-text" style={{ color: "#FFFFFF", "font-size": "18px" }}>NYTimes</p>
      <Nav.Link as={Link}><Switch onChange={this.handleSwitch} checked={this.state.checked} uncheckedIcon={false} checkedIcon={false} /></Nav.Link>
      <p className="navbar-text" style={{ color: "#FFFFFF", "font-size": "18px" }}>Guardian</p></>
  :""}
    </Nav>
    </Navbar.Collapse>
  </Navbar>
  <div className="App">
  <ReactTooltip />
  <ToastContainer autoClose={2000} type={"warning"} transition={Zoom} hideProgressBar={true} />
      </div>
      <Route path='/search' render={() => <Search message={this.state.search_param} check={this.state.checked} handleArticle={this.handleArticle}/>} />
        <RouteSwitch>
        <Route path='/article' render={() => <Article handleArticle={this.handleArticle}/>} />
        <Route path="/World" render={() => <Cards message="world" check={this.state.checked} handleArticle={this.handleArticle}/>} />
        <Route path="/Politics" render={() => <Cards message="politics" check={this.state.checked} handleArticle={this.handleArticle}/>} />
        <Route path="/Business" render={() => <Cards message="business" check={this.state.checked} handleArticle={this.handleArticle}/>} />
        <Route path="/Technology" render={() => <Cards message="technology" check={this.state.checked} handleArticle={this.handleArticle}/>} />
        <Route path="/Sports" render={() => <Cards message="sports" check={this.state.checked} handleArticle={this.handleArticle}/>} />
        <Route path="/favorites" render={() => <Favorites handleArticle={this.handleArticle}/>} />
        <Route exact path="/" render={() => <Cards message="home" check={this.state.checked} handleArticle={this.handleArticle}/>} />
      </RouteSwitch>
      </BrowserRouter>
      </>
    );
  }
}

export default App;