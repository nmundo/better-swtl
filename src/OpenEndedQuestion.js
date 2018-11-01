import React from 'react'
import { Form, Header, Container, Message } from 'semantic-ui-react'

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
                <Form size='massive'>
                    <Message error id={`errorMessage${question.id}`} />
                    <Form.Field>
                        <input type='text' name='answer' />
                    </Form.Field>
                </Form>
            </Container>
        )
    }
}

export default OpenEndedQuestion