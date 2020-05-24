import React, { Component, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { EmailShareButton, FacebookShareButton, TwitterShareButton, EmailIcon, FacebookIcon, TwitterIcon } from "react-share";

class Example extends Component {
  componentDidMount() {
    
    this.setState ({show:true});
  }
  componentDidUpdate(prevProps,prevState) {
    if (!this.state)
    {
      return;
    }
    if (!prevState)
    {
      return;
    }
    if (prevState.show !== this.state.show)
    {
      this.props.share_bm_1(this.state.show);
        // this.setState ({show:!this.state.show});
      }
      if (this.props.show_now !== prevProps.show_now)
      {
        this.setState({show:true});
      }
  }

handleShow (e) {
  e.preventDefault();
  e.stopPropagation();
  this.setState({show: true});
  this.props.share_bm_1(true);
  return true;
}
handleClose (e) {
  e.preventDefault();
  e.stopPropagation();
  this.setState({show: false});
  this.props.share_bm_1(false);
  return false;
}
handleTouch (e) {
  e.stopPropagation();
  e.preventDefault();
}
render() 
{
  if (!this.state)
  {
    return null;
  }
  return (
      <>
        <Modal show={this.state.show} onHide={this.handleClose.bind(this)} onClick={this.handleTouch.bind(this)}>
          <Modal.Header closeButton onClick={this.handleClose.bind(this)}>
            <Modal.Title>{(this.props.source_title !== "")?<><b>{this.props.source_title}</b><br/></>:null}{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body onClick={this.handleTouch.bind(this)}><div className="container"><div className="row justify-content-center"><div className="col-4 mx-auto text-center">Share via<br /></div></div>
          <div className="row justify-content-center">
          <div className="col-4 mx-auto text-center"><FacebookShareButton url={this.props.message} hashtag="#CSCI_571_NewsApp"><FacebookIcon size={32} round={true} /></FacebookShareButton></div>
          <div className="col-4 mx-auto text-center"><TwitterShareButton url={this.props.message} hashtags={["CSCI_571_NewsApp"]}><TwitterIcon size={32} round={true} /></TwitterShareButton></div>
          <div className="col-4 mx-auto text-center"><EmailShareButton url={this.props.message} subject="#CSCI_571_NewsApp" body=""><EmailIcon size={32} round={true} /></EmailShareButton></div>
          </div></div></Modal.Body>
        </Modal>
      </>
    );
  }
}
export default Example;