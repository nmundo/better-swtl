import React from 'react'
import { Form, Header, Container, Message } from 'semantic-ui-react'

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
                <Form size='massive'>
                    <Message error id={`errorMessage${question.id}`} />
                    {question.answers.map((answer, i) => <AnswerChoice text={answer} index={i} key={i}/>)}
                </Form>
            </Container>
        )
    }
}

export default MultipleChoiceQuestion