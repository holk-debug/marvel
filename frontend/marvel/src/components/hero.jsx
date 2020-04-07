import React from 'react';
import ReactModal from 'react-modal';
import HeroDetails from './hero-details';

ReactModal.setAppElement('#root')

class Hero extends React.Component {
    showDetails() {
        if(this.props.hero.isCollapsed) {
            return <ReactModal 
                        isOpen={this.props.hero.isCollapsed}
                        shouldCloseOnOverlayClick={false}
                        >
                            <HeroDetails hero={this.props.hero}></HeroDetails>
                    </ReactModal>
        }
    }

    render() {
        let imageCss = {
            backgroundImage: `url(${this.props.hero.url})`
        };

        if(this.props.isVisible) {
            return (
                <div className="grid-item" onClick={() => { this.props.customClickEvent(this.props.hero) }}>
                    <div className="grid-item-wrapper">
                        <div className="grid-item-container">
                            <div className="grid-image-top rex-ray">
                                <span className="centered project-image-bg rex-ray-image" style={imageCss}></span>
                            </div>
                            <div className="grid-item-content">
                                <span className="item-title">{this.props.hero.name}</span>
                                <span className="more-info">More</span>
                            </div>
                        </div>
                    </div>
                    { this.showDetails() }
                </div>  
            );
        } 

        return <div></div>;
        
    }
}

export default Hero;