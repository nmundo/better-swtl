import React, { Component } from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';
import QuizContainer from './QuizContainer.js';
import data from './questions.json';

class ChapterContainer extends Component {
    render() {
        const chapter = data.chapters[this.props.match.params.id];
        return (
            <Container>
                <Header textAlign='center' as='h1'>
                    {`${chapter.name}: ${chapter.description}`}
                </Header>
                <Segment raised id='mainContainer'>
                    <QuizContainer questions={chapter.questions} chapterId={this.props.match.params.id} />
                </Segment>
            </Container>
        );
    }
}

export default ChapterContainer;
