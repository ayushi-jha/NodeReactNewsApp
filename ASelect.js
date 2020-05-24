import React, { Component } from 'react';
import './App.css';
import Select from 'react-select';
import _ from "lodash";
import AsyncSelect, { makeAsyncSelect } from 'react-select/async';
import { withRouter } from 'react-router-dom';
class ASelect extends Component {

   constructor(props) {
    super(props);
    var aId = window.location.href;
    var search_param2 = "";
    if (aId.includes("search") === true)
    {
      aId = aId.split("?")[1];
      console.log("Pt1 : ", aId);
      var vars = aId.split("&");
      console.log("Pt2 : ", vars);
       for (var i=0;i<vars.length;i++) {
         var pair = vars[i].split("=");
         console.log("Pt3 : ", pair);
         if (pair[0] === "q")
         {
            search_param2 = pair[1];
            console.log("Pt4 : ", search_param2);
         }

       }
    }
    console.log("What's now : ", window.location.href, search_param2, aId);
    this.state = { 
        results: [],
        search_param: null,
        search_param2: search_param2,
        valueVariable : ''
     };
     if (search_param2 !== "" && search_param2 !== null)
     {
      search_param2 = decodeURI(search_param2);
      this.setState({valueVariable: {
        label: search_param2,
        value: search_param2
        }   
      });
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectedVal = this.selectedVal.bind(this);
  }

 async handleChange (inputValue, callback) {
    try {
      var url_to_send = "https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q="+inputValue;
      const response = await fetch(url_to_send,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "XXXX"
          }
        }
      );
      const options = await response.json();
      const resultsRaw = options.suggestionGroups[0].searchSuggestions;
      const data = resultsRaw.map(function(result){return {value:result.id, label:result.displayText}} );
      this.setState({ results:data });
      return callback(data);
    } catch (error) {
      console.error(`Error fetching search`, error);
    }
  }

  componentWillUnmount() {
    this.props.set_search("");
    this.setState({ results:null });
  }
  
handleInputChange(inputValue) {
    this.setState({ results:this.state.results });
  }

  selectedVal(inputValue) {
    var url_2 = "/search?q="+inputValue.label;
    this.setState({search_param: inputValue.label});
    this.props.set_search(inputValue.label);
    this.setState({ results:null });
    this.props.history.push(url_2);
  }
  onFocus() {
    this.props.set_search(null);
    this.setState({ results:null });
  }
get_val(inputValue) {
  return inputValue;
}
componentWillReceiveProps() {
var aId = window.location.href;
    var search_val = "";
    if (aId.includes("search") === true)
    {
      aId = aId.split("?")[1];
      console.log("Pt11 : ", aId);
      var vars = aId.split("&");
      console.log("Pt22 : ", vars);
       for (var i=0;i<vars.length;i++) {
         var pair = vars[i].split("=");
         console.log("Pt33 : ", pair);
         if (pair[0] === "q")
         {
            search_val = pair[1];
            console.log("Pt44 : ", search_val);
         }
       }
    }
    
    if (search_val !== "" && search_val !== null)
     {
      search_val = decodeURI(search_val);
      this.setState({search_param2: search_val,
          valueVariable : {
          label: search_val,
          value: search_val
          }});
    }
    else {
      this.setState({valueVariable : ''});
    }
}
  render() {
    return (
      <AsyncSelect value={this.state.valueVariable} placeholder={"Enter keyword .."} cacheOptions = {false} options={this.state.results} loadOptions={_.debounce(this.handleChange, 1000)} onFocus={this.onFocus.bind(this)} onInputChange={_.debounce(this.handleInputChange,1000)} onChange={this.selectedVal} id="left-menu" />
    );
  }
}

export default withRouter(ASelect);