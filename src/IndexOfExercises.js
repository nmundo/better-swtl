import React, { Component } from 'react';
import { Header, Container, Segment, Card } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import data from './questions.json';
import './App.css';

class IndexOfExercises extends Component {
    static getCardColor(chapter, i) {
        let score = JSON.parse(localStorage.getItem('scores'))[i];
        let totalQuestions = chapter.questions.length;
        let color;
        let percentScore = 100 * (score / totalQuestions);
        console.log(percentScore);
        if (percentScore >= 90) {
            color = 'green';
        } else if (percentScore >= 80 && percentScore < 90) {
            color = 'yellow';
        } else if (percentScore < 80) {
            color = 'red';
        }
        if (score === null || score === undefined) {
            color = null;
        }
        console.log(color);
        return color;
    }
    render() {
        return (
            <Container>
                <Header textAlign='center' as='h1'>Smarter Way To Learn JavaScript</Header>
                <Segment raised style={{padding: '2em'}}>
                    <Card.Group>
                        {data.chapters.map((chapter, i) => {
                            let score = JSON.parse(localStorage.getItem('scores'))[i];
                            return (
                                <Card centered color={IndexOfExercises.getCardColor(chapter, i)} as={Link} to={`/chapters/${i}`} key={i}>
                                    <Card.Content header={chapter.name} />
                                    <Card.Content description={chapter.description} />
                                    <Card.Content extra>
                                        {score >= 0  ? `Score: ${score}/${chapter.questions.length}` : 'Not attempted'}
                                    </Card.Content>
                                </Card>
                            )
                        })}
                    </Card.Group>
                </Segment>
            </Container>
        );
    }
}

export default IndexOfExercises;
