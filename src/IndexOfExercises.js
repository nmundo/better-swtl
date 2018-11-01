import React, { Component } from 'react';
import { Grid, Header, Container, Segment, List } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import data from './questions.json';
import './App.css';

class IndexOfExercises extends Component {
    render() {
        return (
            <Container>
                <Header textAlign='center' as='h1'>Smarter Way To Learn JavaScript</Header>
                <Segment raised>
                    <List ordered size={'massive'}>
                        {data.chapters.map((chapter, i) => {
                            return (
                                <List.Item key={i}>
                                    <Link to={`/chapters/${i}`}>{chapter.description}</Link>
                                </List.Item>
                            )
                        })}
                    </List>
                </Segment>
            </Container>
        );
    }
}

export default IndexOfExercises;
