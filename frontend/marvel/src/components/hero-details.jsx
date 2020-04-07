import React from 'react';

class HeroDetails extends React.Component {
    POWERSTATS = [
        {
            propertyName: 'intelligence',
            translation: 'Inteligence'
        },
        {
            propertyName: 'strength',
            translation: 'Strength'
        },
        {
            propertyName: 'speed',
            translation: 'Speed'
        },
        {
            propertyName: 'durability',
            translation: 'Durability'
        },
        {
            propertyName: 'power',
            translation: 'Power'
        },
        {
            propertyName: 'combat',
            translation: 'Combat'
        },
    ];

    BIOGRAPHY = [
        {
            propertyName: 'full-name',
            translation: 'Full name'
        },
        {
            propertyName: 'alter-egos',
            translation: 'Alter Egos'
        },
        {
            propertyName: 'aliases',
            translation: 'Aliases'
        },
        {
            propertyName: 'place-of-birth',
            translation: 'Place of birth'
        },
        {
            propertyName: 'first-appearance',
            translation: 'First appearance'
        },
        {
            propertyName: 'publisher',
            translation: 'Publisher'
        },
        {
            propertyName: 'alignment',
            translation: 'Alignment'
        },
    ];

    renderPowerstat(powerstat, key) {
        return <div key={key}><span><b>{powerstat.translation}</b>: </span><span>{this.props.hero.details.powerstats[powerstat.propertyName]}</span></div>;
    }

    renderList(listItem, index) {
        return <li key={index}>{listItem}</li>
    }

    renderBiography(biography, key) {
        let property = this.props.hero.details.biography[biography.propertyName];
        if(Array.isArray(property)) {
            return <div key={key}><span><b>{biography.translation}</b>: </span><ul>{property.map((listItem, index) => this.renderList(listItem, index))}</ul></div>;
        }

        return <div key={key}><span><b>{biography.translation}</b>: </span><span>{property}</span></div>;
    }

    render() {
        return (
            <div className="container">
                <div className="item-title">{this.props.hero.name}</div>
                <div className="description">
                    <img src={this.props.hero.url} className="description-image" />
                    <div className="description-wrapper">
                        <div className="item-title">Powerstats</div>
                        {this.POWERSTATS.map((powerstat, index) => this.renderPowerstat(powerstat, index))}
                    </div>
                </div> 
                <div className="description">
                    <div className="description-wrapper">
                        <div className="item-title">Biography</div>
                        {this.BIOGRAPHY.map((biography, index) => this.renderBiography(biography, index))}
                    </div>
                </div>
            </div>
        )
    }
}

export default HeroDetails;