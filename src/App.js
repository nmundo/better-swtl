import React, { Component } from 'react';
import { Grid } from 'semantic-ui-react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChapterContainer from './ChapterContainer';
import IndexOfExercises from './IndexOfExercises';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        if (!localStorage.getItem('scores')) localStorage.setItem('scores', '[]')
    }

    render() {
        return (
            <Router basename={'~hmundo00/web115/better-swtl-react'}>
                <Grid columns={3}>
                    <Grid.Column width={3}/>
                    <Grid.Column width={10}>
                        <Route exact path={'/'} component={IndexOfExercises}/>
                        <Route path={'/chapters/:id'} component={ChapterContainer}/>
                    </Grid.Column>
                    <Grid.Column width={3}/>
                </Grid>
            </Router>
        );
    }
}

export default App;