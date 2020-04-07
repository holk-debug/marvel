import React from 'react';
import Hero from '../components/hero';
import {connect} from 'react-redux';
import * as actionCreators from '../actions';
import Loader from '../components/loader';

class HeroesContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          heroFilter: ''
        }
      }

      handleChange = (e) => {
        this.setState({
            heroFilter: e.target.value
        })
      }

    componentDidMount() {
        if(this.props.heroes.length === 0) {
            this.props.getSuperheroes();
        }       
    }

    getDetailsForHero(hero) {
        if(!hero.details) {
            this.props.getHeroDetails(hero.id)
                .then(() => {
                    this.props.toggleHeroDetails(hero.id);
                })
        } else {
            this.props.toggleHeroDetails(hero.id);
        }
    }

    mapHero(hero) {
        const query = this.state.heroFilter.toUpperCase(); 
        let isMatchToQuery = (hero.name.toUpperCase()).includes(query);
        return <Hero 
            key={hero.id} 
            hero={hero} 
            isVisible={isMatchToQuery}
            customClickEvent={() => this.getDetailsForHero(hero)}
        ></Hero>
    }

    render() {
        if(this.props.isLoading) {
            return <Loader></Loader>
        }

        return (
            <div className="container">
                <div className="grid-row">
                    <input className="filter-field" type="text" id="filter" 
                        value={this.state.poetFilter} 
                        onChange={this.handleChange}/>
                    {this.props.heroes.map((hero) => this.mapHero(hero))}
                </div>  
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect (mapStateToProps, actionCreators)(HeroesContainer);