import React from 'react'
import { Form, Header, Container, Message } from 'semantic-ui-react'

class FillInTheBlankQuestion extends React.Component {

    render() {
        let question = this.props.question;
        let incompleteStatement = this.props.question.incompleteStatement.split('_');
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
                    <Form.Field inline transparent>
                        <label>{incompleteStatement[0]}</label>
                        <div className='ui transparent input'>
                            <input type='text' name='answer' className='fillInTheBlankField'/>
                        </div>
                        <label>{incompleteStatement[1]}</label>
                    </Form.Field>
                </Form>
            </Container>
        )
    }
}

export default FillInTheBlankQuestion