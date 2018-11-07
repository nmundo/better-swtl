import React from 'react'
import { Form, Header, Container, Message } from 'semantic-ui-react'
import Highlight from 'react-highlight'

class OpenEndedQuestion extends React.Component {

    render() {
        let question = this.props.question;
        return (
            <Container
                className={'questionContainer'}
                id={'question' + question.id}
                data-id={question.id}
                data-question-type={question.questionType}
                data-answer={question.correctAnswer}>

                <Header as='h3'>{question.questionText}</Header>
                    <Highlight className='javascript'>{question.subText}</Highlight>
                <Form size='huge'>
                    <Form.Field>
                        <input autoFocus type='text' name='answer' />
                    </Form.Field>
                    <Message error id={`errorMessage${question.id}`}>
                        The correct answer is:
                        <Highlight className='javascript' />
                    </Message>
                </Form>
            </Container>
        )
    }
}

export default OpenEndedQuestion