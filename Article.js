import React, { Component } from 'react';
import './App.css';
import { withRouter } from 'react-router-dom';
import commentBox from 'commentbox.io';
import { MdBookmark, MdBookmarkBorder, MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from "react-share";
import ReactTooltip from 'react-tooltip';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
import { toast } from 'react-toastify';
import * as Scroll from 'react-scroll';
import { Link, Element , Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

class Article extends Component {
  componentDidMount() { 
    Events.scrollEvent.register('begin', function(to, element) {
      console.log("begin", arguments);
    });

    Events.scrollEvent.register('end', function(to, element) {
      console.log("end", arguments);
    });

    scrollSpy.update();


    this.props.handleArticle(true, false);
    commentBox('XXXX-proj', {className: 'commentbox'});
    this.setState({showexpand: true});
    var aId = this.props.location.search;
    if (localStorage.getItem(aId))
    {
      this.setState({bookmarked: true});
    }
    aId = aId.replace("?", "");
    var articleId = "";
    var source = "";
    var vars = aId.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if (pair[0] === "id")
               {
                  articleId = pair[1];
               }
               if (pair[0] === "source")
               {
                  source = pair[1];
               }
       }

    var url_to_pass = "";
    if (source === "guardian")
    {
      url_to_pass = 'Path-to-backend/article_guardian?param1=' + articleId;
    }
    else
    {
      url_to_pass = 'Path-to-backend/article_nytimes?param1=' + articleId;
    }   
    
    fetch(url_to_pass)
            .then(res => res.json())
            .then(response_article => this.setState({ response_article: JSON.parse(response_article), sc: source }));
  }
componentDidUpdate(prevProps,prevState) {
  commentBox('XXXX-proj', {className: 'commentbox'});

      if (prevProps !== this.props)
    {       
        this.setState({showexpand: true});
        var aId = this.props.location.search;
        aId = aId.replace("?", "");
        var articleId = "";
        var source = "";
        var vars = aId.split("&");
           for (var i=0;i<vars.length;i++) {
                   var pair = vars[i].split("=");
                   if (pair[0] === "id")
                   {
                      articleId = pair[1];
                   }
                   if (pair[0] === "source")
                   {
                      source = pair[1];
                   }
           }
        
        var url_to_pass = "";
        if (source === "guardian")
        {
          url_to_pass = 'Path-to-backend/article_guardian?param1=' + articleId;
        }
        else
        {
          url_to_pass = 'Path-to-backend/article_nytimes?param1=' + articleId;
        }   
        fetch(url_to_pass)
                .then(res => res.json())
                .then(response_article => this.setState({ response_article: JSON.parse(response_article), sc: source }));
    }
   }

addBookMark(article_data, title_info, e) {
  e.preventDefault();
  this.setState({bookmarked: true});
  localStorage.setItem(this.props.location.search, article_data);
  var disp = "Saving "+title_info;
  toast(disp, {position: toast.POSITION.TOP_CENTER, className: 'toast-container',});
}
removeBookMark(title_info, e) {
  e.preventDefault();
  this.setState({bookmarked: false});
  localStorage.removeItem(this.props.location.search);
  var disp = "Removing "+title_info;
  toast(disp, {position: toast.POSITION.TOP_CENTER, className: 'toast-container',});
}

expand_more(e) {
  this.setState({showexpand: false});
  this.scrollMore();
}

expand_less(e) {
  this.scrollToTop();
  this.setState({showexpand: true});
}

 componentWillUnmount() {
    Events.scrollEvent.remove('begin');
    Events.scrollEvent.remove('end');
  }
  scrollToTop() {
    scroll.scrollToTop({smooth: true});
  }
  scrollToBottom() {
    scroll.scrollToBottom();
  }
  scrollMore() {
    scroll.scrollMore(100, {smooth: true});
  }
  handleSetActive() {
    console.log('to');
  }

render() {
  commentBox('XXXX-proj', {className: 'commentbox'});
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
    if (!this.state.response_article)
    {
      return (<div className="sweet-loading d-sm-none d-md-block">
        <BounceLoader
          size={50}
          color={"#123abc"}
          loading={true}
        /><span>Loading</span>
      </div>);
    }

    var this_card = this.state.response_article.response;
        if (!this_card)
        {
          return (<div className="sweet-loading d-sm-none d-md-block">
        <BounceLoader
          size={50}
          color={"#123abc"}
          loading={true}
        /><span>Loading</span>
      </div>);
        }
    if (this.state.sc === "guardian")
    {
      var curr_card = this_card.content;
      if (!curr_card)
      {
        return (<div className="sweet-loading d-sm-none d-md-block">
        <BounceLoader
          size={50}
          color={"#123abc"}
          loading={true}
        /><span>Loading</span>
      </div>);
      }
      var temp_dict = {}
      temp_dict.title =curr_card.webTitle;
      var trimmedString = temp_dict.title.substr(0, 75);
      if(temp_dict.title.length > trimmedString.length)
      {
          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
          trimmedString += "...";
      }
      temp_dict.trim_title = trimmedString;
      temp_dict.id =curr_card.id;
      temp_dict.section =curr_card.sectionId.toUpperCase();
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
      temp_dict.url = curr_card.webUrl;
      temp_dict.date = curr_card.webPublicationDate;
      temp_dict.description = curr_card.blocks.body[0].bodyTextSummary;
      var trimmedDesc = temp_dict.description.substr(0, 500);
      if(temp_dict.description.length > trimmedDesc.length)
      {
          trimmedDesc = trimmedDesc.substr(0, Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(" ")));
          trimmedDesc += "...";
      }
      temp_dict.less_desc = trimmedDesc;
      temp_dict.source = "GUARDIAN";
      temp_dict.news_style = {color: "#FFFFFF", backgroundColor: "#14284A"};
      for (var mm_i=0; mm_i < curr_card.blocks.main.elements[0].assets.length; mm_i ++)
      {
        if (curr_card.blocks.main.elements[0].assets[mm_i].typeData.width >= 2000)
        {
          temp_dict.image = curr_card.blocks.main.elements[0].assets[mm_i].file;
        }
      }
      if (!temp_dict.image)
      {
        temp_dict.image = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
      }
      
    }
    else
    {
      var curr_card = this_card.docs[0];
      var temp_dict = {}
      if (!curr_card)
      {
        return (<div className="sweet-loading d-sm-none d-md-block">
        <BounceLoader
          size={50}
          color={"#123abc"}
          loading={true}
        /><span>Loading</span>
      </div>);
      }
      if (!curr_card.headline)
      {
        return (<div className="sweet-loading d-sm-none d-md-block">
        <BounceLoader
          size={50}
          color={"#123abc"}
          loading={true}
        /><span>Loading</span>
      </div>);
      }
      temp_dict.title = curr_card.headline.main;
      var trimmedString = temp_dict.title.substr(0, 75);
      if(temp_dict.title.length > trimmedString.length)
      {
          trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")));
          trimmedString += "...";
      }
      temp_dict.trim_title = trimmedString;
      temp_dict.section = curr_card.section_name.toUpperCase();
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
      temp_dict.id = curr_card._id;
      temp_dict.url = curr_card.web_url;
      temp_dict.date = curr_card.pub_date;
      temp_dict.description = curr_card.abstract;
      var trimmedDesc = temp_dict.description.substr(0, 500);
      if(temp_dict.description.length > trimmedDesc.length)
      {
          trimmedDesc = trimmedDesc.substr(0, Math.min(trimmedDesc.length, trimmedDesc.lastIndexOf(" ")));
          trimmedDesc += "...";
      }
      temp_dict.less_desc = trimmedDesc;
      temp_dict.source = "NYTIMES";
      temp_dict.news_style = {color: "#000000", backgroundColor: "#DDDDDD"};
      for (var mm_i=0; mm_i < curr_card.multimedia.length; mm_i ++)
      {
        if (curr_card.multimedia[mm_i].width >= 2000)
        {
          temp_dict.image = "https://www.nytimes.com/"+curr_card.multimedia[mm_i].url;
        }
      }
      if (!temp_dict.image)
      {
        temp_dict.image = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";
      }
    }
      temp_dict.bm_id = this.props.location.search;
      var a_data = JSON.stringify(temp_dict);
    return (
      <>
        <div className="card d-flex flex-row shadow p-3 mb-5 bg-white rounded">
          <div className="card-body">
              <div className="row"><div className="col-xs-12"><h3 className="card-title">{temp_dict.title}</h3></div></div>
              <div className="row"><div className="col"><i>{temp_dict.date.split('T')[0]}</i></div>
              <div className="col-xs-2 text-right"><FacebookShareButton url={temp_dict.url} hashtag="#CSCI_571_NewsApp"><FacebookIcon size={32} round={true} data-tip="Facebook" data-place="top" id="facebook-tooltip" /></FacebookShareButton>
              <TwitterShareButton url={temp_dict.url} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={32} round={true} data-tip="Twitter" data-place="top" id="twitter-tooltip" /></TwitterShareButton>
              <EmailShareButton url={temp_dict.url} subject="#CSCI_571_NewsApp" body={this.props.message}><EmailIcon size={32} round={true} data-tip="Email" data-place="top" id="email-tooltip" /></EmailShareButton>
              </div><div className="col-2 text-right">{(this.state.bookmarked)?<MdBookmark size={30} color="#DD143C" data-tip="Bookmark" data-place="top" id="bookmarked-tooltip" onClick={this.removeBookMark.bind(this, temp_dict.title)}/>:<MdBookmarkBorder size={30} color="#DD143C" data-tip="Bookmark" id="bookmarked-tooltip" onClick={this.addBookMark.bind(this, a_data, temp_dict.title)}/>}
              </div></div>
              <div className="row mt-2"><div className="col-xs-12"><img className="img-fluid" src={temp_dict.image} style={{objectFit: "cover"}}/></div></div>
              <div className="row"><div className="col-xs-12">{(this.state.showexpand)?<span className="limit_words">{temp_dict.description}</span>:<span>{temp_dict.description}</span>}</div></div>
              <div className="row"><div className="col text-right">{(this.state.showexpand)?<MdKeyboardArrowDown size={30} onClick={this.expand_more.bind(this)} />:<MdKeyboardArrowUp size={30} onClick={this.expand_less.bind(this)} />}</div></div>
          </div>
        </div>
        <div className="commentbox" id={temp_dict.id}/>
        <ReactTooltip effect="solid"/>
      </>
    );
  }
}

export default withRouter(Article);
