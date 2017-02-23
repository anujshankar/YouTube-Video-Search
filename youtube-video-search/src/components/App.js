import React, { Component } from 'react'
import YTSearch from 'youtube-api-search'

class App extends Component {
  constructor() {
    super()
    this.state = {
      video: [],
      playingVideo: '' 
    }
  }

  update(videoData) {
    console.log(videoData)
    this.setState({ video: videoData })
  }

  playVideo(){
    
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <h2>Youtube Search</h2>
        <Search update={this.update.bind(this)} />
        <VideoList content={this.state.video} />
      </div>
    )
  }
}

export default App

class Search extends Component {
  update(e) {
    const searchTerm = e.target.value
    if (!searchTerm.length) {
      return
    }
    YTSearch({ key: 'AIzaSyAWIEcQLhj42-qlLJlUbE5S6ZwQj6_j3LQ', term: searchTerm }, (videos) => {
      this.props.update(videos)
    })
  }

  render() {
    return (<input type='text' onBlur={this.update.bind(this)} />)
  }
}

class VideoList extends Component {
  render() {
    console.log('1', this.props.content)
    let videoList = this.props.content.map(function (video, index) {
      return <li key={index}>
        <VideoThumbnail imageUrl={video.snippet.thumbnails.default.url} videoId={video.id.videoId} title={video.snippet.title}/>
      </li>
    })
    return (
      <ul>
        {videoList}
      </ul>
    )
  }
}

class VideoThumbnail extends Component {
  update(){

  }
  render() {
    return (
    <div>
      <img src={this.props.imageUrl} alt='img didnt load' onClick={this.update.bind(this)} />
      <div>{this.props.title}</div>
    </div>
    )
  }
}

class VideoPreview extends Component {
  render() {
    return (
    <div>
      <img src={this.props.imageUrl} alt='img didnt load' />
      <div>{this.props.title}</div>
    </div>
    )
  }
}


