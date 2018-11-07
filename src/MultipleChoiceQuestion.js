import React from 'react'
import { Form, Header, Container, Message } from 'semantic-ui-react'
import Highlight from 'react-highlight'

const AnswerChoice = props => {
    return <Form.Radio name='answer' label={props.text} value={props.index} />
};

class MultipleChoiceQuestion extends React.Component {

    render() {
        let question = this.props.question;
        return (
            <Container
                className={'questionContainer'}
                id={'question' + question.id}
                data-id={question.id}
                data-answer={question.correctAnswer}
                data-question-type={question.questionType}>

                <Header as='h3'>{question.questionText}</Header>
                <Form size='huge'>
                    {question.answers.map((answer, i) => <AnswerChoice text={answer} index={i} key={i}/>)}
                    <Message error id={`errorMessage${question.id}`}>
                        The correct answer is:
                        <Highlight className='javascript' />
                    </Message>
                </Form>
            </Container>
        )
    }
}

export default MultipleChoiceQuestion