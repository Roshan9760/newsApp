import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
// import PropTypes from 'prop-types'



export class News extends Component {

  static defaultProps ={
      
       country:"in",
       pageSize :6,
       category:""

  }
  // static propTypes ={
        
  //         country:propTypes.string,
  //         pageSize:propTypes.number,
  //         category:propTypes.string
  // }

  constructor(){
      super();
      console.log("This is from Constructor call")
      this.state ={
            articles :[],
            loading:false,
            page:1
      }
  }
   async componentDidMount(){
      
     this.setState({loading:true})
     let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dbca9d3c9f54f8d843841535c7c0ee4&page=1&pageSize=${this.props.pageSize}`)
    let response = await data.json();
    console.log(response)
    this.setState({
      articles:response.articles,
      totalResults:response.totalResults,
      loading:false
    })
    
  }

   previoushandler =async ()=>{
   
    this.setState({loading:true})
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dbca9d3c9f54f8d843841535c7c0ee4&page=${this.state.page-1}&pageSize=${this.props.pageSize}`)
    let response = await data.json();
    console.log(response)
    this.setState({
         articles:response.articles,
         page:this.state.page-1,
         loading:false
      })         

  }  

   nextHandler =async ()=>{
    
    this.setState({loading:true})
    let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=1dbca9d3c9f54f8d843841535c7c0ee4&page=${this.state.page+1}&pageSize=${this.props.pageSize}`)
    let response = await data.json();
    console.log(response)
    this.setState({
         articles:response.articles,
         page:this.state.page+1,
         loading:false
      })
  }

  render() {
    return (
      <div className='container  my-6 ' >
          <h1 className='text-center' style={{margin:'40px 0px'}}>Here is Your Top Headline </h1>
          {
              this.state.loading && <Spinner/>
          }
          <div className='row'>
              
             {
                // set loading before the render of news article/item
                !this.state.loading &&  this.state.articles.map((element)=>{
                         
                  return  <div className='col-md-4'  key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,60)+'...' :""} description={element.description?element.description.slice(0,80)+'....':""}
                              urlToImage={element.urlToImage?element.urlToImage:("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcBAj-DyfRWh6sFbvNF9xQIjAcWy3Q-X-HORqxJkVGWp0T4D33Q3DRCk-ZiBsBAhA7DcQ&usqp=CAU")}
                               url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name}
                            />
                          </div>
                        
                   })
              }  
          </div>
            <div className='container d-flex justify-content-between'>
                  <button  disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.previoushandler}>&laquo; Previous</button>
                  <button  disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.nextHandler}>Next &raquo;</button>
            </div>
      </div>
    )
  }
}

export default News
