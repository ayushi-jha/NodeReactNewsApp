import React, { Component } from 'react';
import {Card, Badge} from 'react-bootstrap';
import './App.css';
import { withRouter, Redirect } from 'react-router-dom';
import Article from "./Article";
import { MdShare } from 'react-icons/md';
import ReactTooltip from 'react-tooltip';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import Example from "./Example";

class Cards extends Component {
	componentDidMount() {
		this.props.handleArticle(false, false);
		this.setState({show_now: false});
		var url_to_pass = "";
		if (this.props.check === true)
		{
			url_to_pass = 'Path-to-backend/news_guardian?param1=' + this.props.message;
			url_to_pass = url_to_pass.replace("sports", "sport");
		}
		else
		{
			url_to_pass = 'Path-to-backend/news_nytimes?param1=' + this.props.message;
		}		
		fetch(url_to_pass)
            .then(res => res.json())
            .then(response_body => this.setState({ response_body: JSON.parse(response_body) }));
 	}
    componentDidUpdate(prevProps,prevState) {
      if (prevProps.message != this.props.message)
      {
      	this.setState({show_now: false});
      	var url_to_pass = "";
		if (this.props.check === true)
		{
			url_to_pass = 'Path-to-backend/news_guardian?param1=' + this.props.message;
			url_to_pass = url_to_pass.replace("sports", "sport");
		}
		else
		{
			url_to_pass = 'Path-to-backend/news_nytimes?param1=' + this.props.message;
		}	
      		fetch(url_to_pass)
                  .then(res => res.json())
                  .then(response_body => this.setState({ response_body: JSON.parse(response_body) }));
      }
      if (prevProps.check != this.props.check)
      {
      	this.setState({show_now: false});
      	var url_to_pass = "";
		if (this.props.check === true)
		{
			url_to_pass = 'Path-to-backend/news_guardian?param1=' + this.props.message;
			url_to_pass = url_to_pass.replace("sports", "sport");
		}
		else
		{
			url_to_pass = 'Path-to-backend/news_nytimes?param1=' + this.props.message;
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
		if (!this.state)
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
			var toprint = [];
			for (var ac_i=0; ac_i < all_cards.length; ac_i++)
			{
				var temp_dict = {}
				temp_dict.id = ac_i;
				temp_dict.title = all_cards[ac_i].webTitle;
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
				var trimmedDesc = temp_dict.description.substr(0, 500);
			      if(temp_dict.description.length > trimmedDesc.length)
			      {
			          trimmedDesc = trimmedDesc.substr(0, Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(" ")));
			          trimmedDesc += "...";
			      }
			      temp_dict.less_desc = trimmedDesc;
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
				toprint.push(temp_dict);
			}
		}
		else
		{
			if (!this.state.response_body.results)
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
			var all_cards = this.state.response_body.results;
			var toprint = [];
			for (var ac_i=0; ac_i < all_cards.length; ac_i++)
			{
				var temp_dict = {}
				temp_dict.id = ac_i;
				temp_dict.title = all_cards[ac_i].title;
				temp_dict.url = all_cards[ac_i].url+"&source=nytimes";
				temp_dict.share_url = all_cards[ac_i].url;
				temp_dict.section = all_cards[ac_i].section.toUpperCase();
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
				temp_dict.date = all_cards[ac_i].published_date;
				temp_dict.description = all_cards[ac_i].abstract;
				var trimmedDesc = temp_dict.description.substr(0, 400);
			      if(temp_dict.description.length > trimmedDesc.length)
			      {
			          trimmedDesc = trimmedDesc.substr(0, Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(" ")));
			          trimmedDesc += "...";
			      }
			      temp_dict.less_desc = trimmedDesc;
				if (!all_cards[ac_i].multimedia)
				{
					temp_dict.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
				}
				else {
				for (var mm_i=0; mm_i < all_cards[ac_i].multimedia.length; mm_i ++)
				{
					if (all_cards[ac_i].multimedia[mm_i].width >= 2000)
					{
						temp_dict.image = all_cards[ac_i].multimedia[mm_i].url;
					}
				}}
				if (!temp_dict.image)
				{
					temp_dict.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
				}
				toprint.push(temp_dict);
			}
		}
			toprint = toprint.slice(0, 10);

		return (
			<>
			{	toprint.map(curr =>
          <><div className="card d-flex flex-row shadow p-3 mb-5 ml-4 mr-4 bg-white rounded hover_pointer" key={this.props.check}>
				<div className="card-body row" onClick={this.handleLogin.bind(this, curr.url)}>
					<div className="col-xs-12 col-md-3 mb-2 px-0"><img className="float-left img-thumbnail" src={curr.image}/></div>
					<div className="col ml-md-4">
						<div className="row mt-2"><div className="col-xs-12">
							<p className="card-title text-left" key={curr.id} style={{"font-size": "18px"}}><b><i>{curr.title}</i></b><MdShare size={24} onClick={this.share_bm.bind(this, curr.id)} /></p>
							{(this.state.show_modal===curr.id)?<Example share_bm_1={this.share_bm_1.bind(this,curr.id)} message={curr.share_url} source_title="" title={curr.title} show_now={this.state.show_now} />:null}
	          			</div>
	          		</div>
	          		<div className="row mt-2">
		          		<div className="col-xs-12"><p className="card-text text-left limit_words">{curr.description}</p></div>
	          		</div>
	          		<div className="row mt-2">
		          		<div className="col-6 text-left px-0"><p><i>{curr.date.split('T')[0]}</i></p></div>
		          		<div className="col text-right"><Badge variant="secondary" style={curr.style}>{curr.section}</Badge></div>
	          		</div>
	          		</div>
				</div>
			</div>
          </>)}
          <article/>
          </>
          		);
	}
}

export default withRouter(Cards);
