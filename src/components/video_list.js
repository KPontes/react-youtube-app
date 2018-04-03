import React from 'react';
import VideoListItem from './video_list_item';

//Functional component take props as an argument
const VideoList = (props) => {
	//map iterates through each video from the array
	const videoItems = props.videos.map((video) => {
		return (
			<VideoListItem
				onVideoSelect = {props.onVideoSelect}
				key={video.etag} 
				video={video} /> 
		);
	});


	return (
		<ul className="col-md-4 list-group">
			{videoItems}
		</ul>
	);
};

export default VideoList;