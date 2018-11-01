import React, { Component } from 'react';
import { Segment, Container, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import QuizContainer from './QuizContainer.js';
import data from './questions.json';

class ChapterContainer extends Component {
    render() {
        const chapter = data.chapters[this.props.match.params.id];
        return (
            <Container>
                <Header textAlign='center' as='h1'>
                    <Link to='/'>
                        <Icon name='list ol' />
                    </Link>
                    <Header.Content>{`${chapter.name}: ${chapter.description}`}</Header.Content>
                </Header>
                <Segment raised id='mainContainer'>
                    <QuizContainer questions={chapter.questions}/>
                </Segment>
            </Container>
        );
    }
}

export default ChapterContainer;
