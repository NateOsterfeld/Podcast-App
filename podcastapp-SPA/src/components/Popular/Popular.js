import React from 'react';
import PodcastCard from '../PodcastCard/PodcastCard';
import './Popular.css';
import { useSpring, animated } from 'react-spring';

const Popular = ({ podcasts, getEpisodes }) => {
    const fade = useSpring({from: {opacity:0}, opacity:1});
    
    return (
        <animated.div className="podcast-container" style={fade}>
            <h1 className="title">Popular</h1> {
                podcasts.map(podcast => {
                    return <PodcastCard 
                        key={podcast.id}
                        id={podcast.id}
                        title={podcast.name}
                        image={podcast.artworkUrl100}
                        publisher={podcast.artistName}
                        getEpisodes={getEpisodes}
                        margin={20}
                    />
                })
            }
        </animated.div>
    )    
}

export default Popular;