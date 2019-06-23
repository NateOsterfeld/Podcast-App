import React from 'react';
import './PodcastCard.css';

class PodcastCard extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, title, image, publisher, margin, website } = this.props;
        
        
        return (
            <div className="podcast fl" style={{margin: 0 + 'px ' + margin + 'px'}}>
                <div 
                    onClick = { () => this.props.getEpisodes(id, title, image, publisher, website) }
                    className="podcast-a">
                    <img src={image} alt="podcast" className="podcast-image" />
                    <p style={{width: 200 + 'px'}}>
                        <strong>{title}</strong>
                    </p>
                    <p>{publisher}</p>
                </div>
            </div>
        )    
    }
    
}

export default PodcastCard;