import React from 'react'
import { Form, Header, Container, Message } from 'semantic-ui-react'
import Highlight from 'react-highlight'

class FillInTheBlankQuestion extends React.Component {

    render() {
        let question = this.props.question;
        let incompleteStatement = this.props.question.incompleteStatement.split('__');
        return (
            <Container
                className={'questionContainer'}
                id={'question' + question.id}
                data-id={question.id}
                data-question-type={question.questionType}
                data-answer={question.correctAnswer}>

                <Header as='h3'>{question.questionText}</Header>
                <Form size='huge'>
                    <Form.Field inline transparent='true'>
                        <label>{incompleteStatement[0]}</label>
                        <div className='ui transparent input'>
                            <input autoFocus type='text' name='answer' className='fillInTheBlankField'/>
                        </div>
                        <label>{incompleteStatement[1]}</label>
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

export default FillInTheBlankQuestion