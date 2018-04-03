import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import YTSearch from 'youtube-api-search';

import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyAtOLtlvila_Sd7B6_xLnSaWePXvCbUdMg';



//create a new component thatt produces some html
class App extends React.Component {
	constructor(props) {
		super(props);
		//constructor is the only place where you assgin state directly	
		this.state = {
			videos: [],
			selectedVideo: null
		}; 
		this.videoSearch('surfboards');
	}

	videoSearch(term) {		
		YTSearch({key: API_KEY, term: term}, (data) => {
			this.setState({
				videos: data,
				selectedVideo: data[0]
			});
		});	
	}

	render() {
		//returns a version of the function that runs only at every 1 second and not at each keystrike
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 2000);

		return (
			<div> 
				<SearchBar onSearchTermChange={term => this.videoSearch(term)}/>
				<VideoDetail video={this.state.selectedVideo}/>
				<VideoList 
					onVideoSelect={selectedVideo => this.setState({selectedVideo})}
					videos={this.state.videos}/>
			</div>
		);
	}
}

// take the components generated html and puts it into the DOM
ReactDOM.render(<App />, document.querySelector('.container'));
