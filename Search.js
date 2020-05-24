import React, { Component } from 'react';
import { Card, Badge } from 'react-bootstrap';
import './App.css';
import { withRouter, Redirect } from 'react-router-dom';
import Article from "./Article";
import { MdShare } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Example from "./Example";

class Search extends Component {
	componentDidMount() {
		this.props.handleArticle(true, false);
		var search_param = this.props.message;
		this.setState({search_param:this.props.message});
		if (search_param === null || search_param === "" || (!search_param))
		{
			var aId = this.props.location.search;
		    aId = aId.replace("?", "");
		    var articleId = "";
		    var vars = aId.split("&");
	       for (var i=0;i<vars.length;i++) {
		       var pair = vars[i].split("=");
		       if (pair[0] === "q")
		       {
		          search_param = pair[1];
		       }
	       }
	   }
		this.setState({show_now: false});
		var url_to_pass = "";
		if (this.props.check === true)
		{
			url_to_pass = 'Path-to-backend/search_guardian?param1=' + search_param;
		}
		else
		{
			url_to_pass = 'Path-to-backend/search_nytimes?param1=' + search_param;
		}		
		fetch(url_to_pass)
            .then(res => res.json())
            .then(response_body => this.setState({ response_body: JSON.parse(response_body) }));
 	}
    componentDidUpdate(prevProps,prevState) {
      if ((prevProps.message != this.props.message) || (prevProps.location != this.props.location))
      {
      	this.setState({show_now: false});
      	var search_param = this.props.message;
		if (search_param === null || search_param === "" || (!search_param))
		{
			var aId = this.props.location.search;
		    aId = aId.replace("?", "");
		    var articleId = "";
		    var vars = aId.split("&");
	       for (var i=0;i<vars.length;i++) {
		       var pair = vars[i].split("=");
		       if (pair[0] === "q")
		       {
		          search_param = pair[1];
		       }
	       }
	   }
      	var url_to_pass = "";
		if (this.props.check === true)
		{
			url_to_pass = 'Path-to-backend/search_guardian?param1=' + search_param;
		}
		else
		{
			url_to_pass = 'Path-to-backend/search_nytimes?param1=' + search_param;
		}	
      		fetch(url_to_pass)
                  .then(res => res.json())
                  .then(response_body => this.setState({ response_body: JSON.parse(response_body) }));
      }
      if (prevProps.check != this.props.check)
      {
      	this.setState({show_now: false});
      	var search_param = this.props.message;
		if (search_param === null || search_param === "" || (!search_param))
		{
			var aId = this.props.location.search;
		    aId = aId.replace("?", "");
		    var articleId = "";
		    var vars = aId.split("&");
	       for (var i=0;i<vars.length;i++) {
		       var pair = vars[i].split("=");
		       if (pair[0] === "q")
		       {
		          search_param = pair[1];
		       }
	       }
	   }
      	var url_to_pass = "";
		if (this.props.check === true)
		{
			url_to_pass = 'Path-to-backend/search_guardian?param1=' + search_param;
		}
		else
		{
			url_to_pass = 'Path-to-backend/search_nytimes?param1=' + search_param;
		}	
      		fetch(url_to_pass)
                  .then(res => res.json())
                  .then(response_body => this.setState({ response_body: JSON.parse(response_body) }));
      }
	 }
handleLogin(params, e) {
	if (e.target.localName !== "span" && e.target.localName !== "circle" && e.target.localName !== "path")
	{
	    var url_2 = "/article?id="+params;
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
		if (!this.state.response_body)
		{
			return (<div className="sweet-loading d-sm-none d-md-block">
	        <BounceLoader
	          size={50}
	          color={"#123abc"}
	          loading={true}
	        /><span>Loading</span>
	      </div>);
		}
		if (!this.state.response_body.response)
		{
			return (<div className="sweet-loading d-sm-none d-md-block">
	        <BounceLoader
	          size={50}
	          color={"#123abc"}
	          loading={true}
	        /><span>Loading</span>
	      </div>);
		}
		if (this.state.articleView === true)
		{
			return (<Article message={this.state.url_to_go}/>);
		}
		if (this.props.check === true)
		{
			if (!this.state.response_body.response)
		{
			return (<div className="sweet-loading d-sm-none d-md-block">
	        <BounceLoader
	          size={50}
	          color={"#123abc"}
	          loading={true}
	        /><span>Loading</span>
	      </div>);
		}
			if (this.state.checked === false)
			{
				this.setState({ checked: true });
				this.componentDidUpdate();
			}
			var all_cards = this.state.response_body.response.results;
			if (!this.state.response_body.response.results)
			{
				return (<div className="sweet-loading d-sm-none d-md-block">
		        <BounceLoader
		          size={50}
		          color={"#123abc"}
		          loading={true}
		        /><span>Loading</span>
		      </div>);
			}
			var toprint = [];
			for (var ac_i=0; ac_i < all_cards.length; ac_i++)
			{
				var temp_dict = {};
				temp_dict.title = all_cards[ac_i].webTitle;
				var trimmedString = temp_dict.title.substr(0, 75);
			      if(temp_dict.title.length > trimmedString.length)
			      {
			          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
			          trimmedString += "...";
			      }
			      temp_dict.trim_title = trimmedString;
				temp_dict.url = all_cards[ac_i].id+"&source=guardian";
				temp_dict.share_url = all_cards[ac_i].webUrl;
				temp_dict.section = all_cards[ac_i].sectionId.toUpperCase();
				switch(temp_dict.section) 
				{
					case "WORLD":
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#7C4EFF"};
						break;
					case "POLITICS":
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#419488"};
						break;
					case "BUSINESS":
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#4696EC"};
						break;
					case "TECHNOLOGY":
						temp_dict.style = {color: "#000000", backgroundColor: "#CEDC39"};
						break;
					case "SPORTS":
					case "SPORT":
						temp_dict.style = {color: "#000000", backgroundColor: "#F6C244"};
						break;
					default:
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#6E757C"};
				}
				temp_dict.date = all_cards[ac_i].webPublicationDate;
				temp_dict.description = all_cards[ac_i].blocks.body[0].bodyTextSummary;
				if (!all_cards[ac_i].blocks.main)
				{
					temp_dict.image = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
				}
				else {
				for (var mm_i=0; mm_i < all_cards[ac_i].blocks.main.elements[0].assets.length; mm_i ++)
				{
					if (all_cards[ac_i].blocks.main.elements[0].assets[mm_i].typeData.width >= 2000)
					{
						temp_dict.image = all_cards[ac_i].blocks.main.elements[0].assets[mm_i].file;
					}
				}}
				if (!temp_dict.image)
				{
					temp_dict.image = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
				}
				temp_dict.id = ac_i;
				toprint.push(temp_dict);
			}
		}
		else
		{
			if (!this.state.response_body.response)
			{
				return (<div className="sweet-loading d-sm-none d-md-block">
		        <BounceLoader
		          size={50}
		          color={"#123abc"}
		          loading={true}
		        /><span>Loading</span>
		      </div>);
			}
			if (!this.state.response_body.response.docs)
			{
				return (<div className="sweet-loading d-sm-none d-md-block">
		        <BounceLoader
		          size={50}
		          color={"#123abc"}
		          loading={true}
		        /><span>Loading</span>
		      </div>);
			}
			if (this.state.checked === true)
			{
				this.setState({ checked: false });
				this.componentDidUpdate();
			}
			var all_cards = this.state.response_body.response.docs;
			var toprint = [];
			for (var ac_i=0; ac_i < all_cards.length; ac_i++)
			{
				var temp_dict = {};
				temp_dict.title = all_cards[ac_i].headline.main;
				var trimmedString = temp_dict.title.substr(0, 75);
			      if(temp_dict.title.length > trimmedString.length)
			      {
			          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
			          trimmedString += "...";
			      }
			      temp_dict.trim_title = trimmedString;
				temp_dict.url = all_cards[ac_i].web_url+"&source=nytimes";
				temp_dict.share_url = all_cards[ac_i].web_url;
				temp_dict.section = all_cards[ac_i].news_desk.toUpperCase();
				switch(temp_dict.section) 
				{
					case "WORLD":
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#7C4EFF"};
						break;
					case "POLITICS":
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#419488"};
						break;
					case "BUSINESS":
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#4696EC"};
						break;
					case "TECHNOLOGY":
						temp_dict.style = {color: "#000000", backgroundColor: "#CEDC39"};
						break;
					case "SPORTS":
					case "SPORT":
						temp_dict.style = {color: "#000000", backgroundColor: "#F6C244"};
						break;
					default:
						temp_dict.style = {color: "#FFFFFF", backgroundColor: "#6E757C"};
				}
				temp_dict.date = all_cards[ac_i].pub_date;
				temp_dict.description = all_cards[ac_i].abstract;
				if (!all_cards[ac_i].multimedia)
				{
					temp_dict.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
				}
				else {
				for (var mm_i=0; mm_i < all_cards[ac_i].multimedia.length; mm_i ++)
				{
					if (all_cards[ac_i].multimedia[mm_i].width >= 2000)
					{
						temp_dict.image = "https://www.nytimes.com/"+all_cards[ac_i].multimedia[mm_i].url;
					}
				}}
				if (!temp_dict.image)
				{
					temp_dict.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
				}
				temp_dict.id = ac_i;
				toprint.push(temp_dict);
			}
		}
		if (toprint.length === 0)
		{
			return (<div className="text-center">
	        <span>No results</span>
	      </div>);
		}
		toprint = toprint.slice(0, 10);
		return (
			<><div className="container-fluid justify-content-center">
				<div className="row mx-auto justify-content-center">
				<div className="col-xs-4 ml-4" style={{"width": "20rem"}}><h3>Results</h3></div>
				<div className="col-xs-4 ml-4" style={{"width": "20rem"}}><p></p></div>
				<div className="col-xs-4 ml-4" style={{"width": "20rem"}}><p></p></div>
				<div className="col-xs-4 ml-4" style={{"width": "20rem"}}><p></p></div>
			{	toprint.map(curr =>
          <><div className="col-xs-4 ml-4 mb-3 shadow bg-white rounded h-100" key={this.props.check} style={{"width": "20rem"}}>
				<div className="card-body" onClick={this.handleLogin.bind(this, curr.url)}>
					<div>
					<p className="card-title text-left" key={curr.id}><b><i>{curr.trim_title}</i></b><MdShare onClick={this.share_bm.bind(this, curr.id)} /></p>
	          		{(this.state.show_modal===curr.id)?<Example share_bm_1={this.share_bm_1.bind(this,curr.id)} message={curr.share_url} source_title="" title={curr.title} show_now={this.state.show_now}/>:null}
	          		<img className="float-left img-thumbnail img-fluid" src={curr.image}/>
	          		<p className="float-left"><i>{curr.date.split('T')[0]}</i></p>
	          		<div className="float-right"><Badge variant="secondary" style={curr.style}>{curr.section}</Badge></div>
	          		</div>
				</div>
			</div>
          </>)}</div></div>
          </>
          		);
	}
}

export default withRouter(Search);
