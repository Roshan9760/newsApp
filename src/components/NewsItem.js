import React, { Component } from 'react'

export class NewsItem extends Component {
   
  render() {

    let {title,description,urlToImage,url,author,publishedAt,source} = this.props
    return (
      <div>
          <div className="card" >
                <span class="position-absolute top-0  translate-middle badge rounded-pill bg-danger"
                style={{left:'90%',zIndex:'1'}}>{source} </span>
               
                <img src={urlToImage} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><small className="text-body-secondary">by {author?author:"Unknow"} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={url} className="btn btn-dark btn-primary" target='blank'>Read More</a>
                </div>
            </div>
            
      </div>
    )
  }
}

export default NewsItem
