import React, { Component } from 'react'
import YTSearch from 'youtube-api-search'
import '../index.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      video: [],
      currVideo: {}
    }
  }
  update(videoData) {
    this.setState({ video: videoData })
  }

  playVideo(videoData) {
    this.setState({ currVideo: videoData })
  }

  render() {
    return (
      <div className="App">
        <h2>Youtube Search</h2>
        <Search update={this.update.bind(this)} />
        <VideoList content={this.state.video} playVideo={this.playVideo.bind(this)} />
        <VideoPreview play={this.state.currVideo} />
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
    let videoList = this.props.content.map((video, index) => {
      return <li key={index}>
        <VideoThumbnail imageUrl={video.snippet.thumbnails.default.url} videoId={video.id.videoId} title={video.snippet.title} playVideo={this.props.playVideo} />
      </li>
    })
    return (
      <ul className='video-list'>
        {videoList}
      </ul>
    )
  }
}

class VideoThumbnail extends Component {
  player() {
    this.props.playVideo({ videoId: this.props.videoId, title: this.props.title })
  }
  render() {
    console.log('Inside VideoThumbnail', this.props.playVideo)
    return (
      <div>
        <img src={this.props.imageUrl} alt='Sorry!' onClick={this.player.bind(this)} />
        <div>{this.props.title}</div>
      </div>
    )
  }
}

class VideoPreview extends Component {
  render() {
    if (!this.props.play.videoId) {
      return (<div></div>)
    }
    else {
      const url = `https://www.youtube.com/embed/${this.props.play.videoId}`
      const title = this.props.play.title
      return (
        <div>
          <iframe src={url} height={"350px"} width={"500px"} />
          <h3>Title : {title}</h3>
        </div>
      )
    }
  }
}
