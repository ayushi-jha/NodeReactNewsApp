import React, { Component, useState } from 'react';
import { Card, Modal, Button, Badge } from 'react-bootstrap';
import './App.css';
import { MdDelete, MdShare } from 'react-icons/md';
import { withRouter } from 'react-router-dom';
import Example from "./Example";
import ReactTooltip from 'react-tooltip';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { toast } from 'react-toastify';

class Favorites extends Component {
	componentDidMount() {
		ReactTooltip.hide();
		this.props.handleArticle(true, true);
		var list_bm = [];
		var list_ct = [];
		for (var key in localStorage) {
		  if (key.startsWith("?id="))
		  {
	  		list_bm.push(JSON.parse(localStorage.getItem(key)));
	  		list_ct.push(false);
		  }
		}
		this.setState({bookmarks_list: list_bm, show_now: false});
 	}

removeBookMark(delete_a, title_info, e) {
  e.stopPropagation();
  e.preventDefault();
  localStorage.removeItem(delete_a);
  var list_bm = [];
  var list_ct = [];
	for (var key in localStorage) {
	  if (key.startsWith("?id="))
	  {
			list_bm.push(JSON.parse(localStorage.getItem(key)));
			list_ct.push(false);
	  }
	}
	this.setState({bookmarks_list: list_bm, show_modal: list_ct});
	var disp = "Removing "+title_info;
toast(disp, {position: toast.POSITION.TOP_CENTER, className: 'toast-container',});
  return false;
}

handleLogin(params, e) {
	if (e.target.localName !== "span" && e.target.localName !== "circle" && e.target.localName !== "path")
	{
		var url_2 = "/article"+params;
    this.props.history.push(url_2);
	}
  }
 share_bm(params, e) {
 	e.stopPropagation();
 	e.preventDefault(); 
    this.setState({show_modal: params, show_now: !this.state.show_now});
  }
   share_bm_1(params, e) {
    this.setState({show_modal: params});
  }
	render() {		
		if (this.state === null)
		{
			return (<div className="sweet-loading d-sm-none d-md-block">
	        <BounceLoader
	          size={50}
	          color={"#123abc"}
	          loading={true}
	        /><span>Loading</span>
	      </div>);
		}
		if (this.state.bookmarks_list === null)
		{
			return (<div className="sweet-loading d-sm-none d-md-block">
	        <BounceLoader
	          size={50}
	          color={"#123abc"}
	          loading={true}
	        /><span>Loading</span>
	      </div>);
		}
		if (this.state.bookmarks_list.length === 0)
		{
			return (<div className="text-center">
	        <span>You have no saved articles</span>
	      </div>);
		}
		return (<><div className="container-fluid justify-content-center">
				<div className="row mx-auto justify-content-center">
			{	this.state.bookmarks_list.map(curr =>
          <><div className="col-xs-4 mr-4 mb-4 shadow bg-white rounded h-100" key={this.props.check} style={{"width": "20rem"}}>
				<div className="card-body" onClick={this.handleLogin.bind(this, curr.bm_id)}>
					<div>
					<p className="card-title text-left" key={curr.id}><b><i>{curr.trim_title}</i></b><MdShare onClick={this.share_bm.bind(this, curr.id)} /><MdDelete onClick={this.removeBookMark.bind(this, curr.bm_id, curr.trim_title)}/></p>
	          		{(this.state.show_modal===curr.id)?<Example share_bm_1={this.share_bm_1.bind(this,curr.id)} message={curr.url} source_title={curr.source} title={curr.title} show_now={this.state.show_now}/>:null}
	          		<img className="float-left img-thumbnail img-fluid" src={curr.image}/>
	          		<p className="float-left"><i>{curr.date.split('T')[0]}</i></p>
	          		<div className="float-right"><Badge variant="secondary" style={curr.style}>{curr.section}</Badge>{' '}<Badge variant="secondary" style={curr.news_style}>{curr.source}</Badge></div>
	          		</div>
				</div>
			</div>
          </>)}
          </div></div>
          </>
        );
	}
}

export default withRouter(Favorites);
