import React from 'react'
import { Grid, Step, Button, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import QuestionContainer from './QuestionContainer.js'

class QuizContainer extends React.Component {

    checkAnswer() {
        let questionContainer;
        let questionContainers = document.getElementsByClassName('questionContainer');
        for (let i = 0; i < questionContainers.length; i++) {
            console.log(i);
            if (window.getComputedStyle(document.getElementById(`question${i}`)).getPropertyValue('display') !== 'none') {
                questionContainer = questionContainers[i];
            }
        }

        let questionType = parseInt(questionContainer.dataset.questionType);
        let correctAnswer = questionContainer.dataset.answer.replace(/&quot/g, '"');
        let questionId = parseInt(questionContainer.dataset.id);
        let answeredCorrectly;

        let selectedAnswer = '';
        switch (questionType) {
            case 0:
                let radioButtons = questionContainer.getElementsByTagName('input');
                for (let i = 0; i < radioButtons.length; i++) {
                    if (radioButtons[i].checked) selectedAnswer = radioButtons[i].value
                }
                break;
            case 1:
            case 2:
                selectedAnswer = questionContainer.getElementsByTagName('input')[0].value;
                break;
            default:
                console.error('Somethings broken fam');
        }

        answeredCorrectly = selectedAnswer === correctAnswer;
        console.log('answered correctly:' + answeredCorrectly);
        answeredCorrectly ? this.goToNextQuestion(questionId) : this.showError(questionId, correctAnswer);
    }

    goToNextQuestion(questionId) {
        document.getElementById(`question${questionId}`).style.display = 'none';

        let steps = document.getElementById('questionSteps').children;
        steps[questionId].classList.remove('active');
        steps[questionId].classList.add('completed');

        try {
            document.getElementById(`question${questionId + 1}`).style.display = 'block';
            steps[questionId + 1].classList.add('active');
        } catch (e) {
            document.getElementById('success').style.display = 'block';
        }
    }

    showError(questionId, correctAnswerID) {
        let correctAnswer = this.props.questions[questionId].answers[correctAnswerID] || this.props.questions[questionId].correctAnswer;
        let errorDiv = document.getElementById(`errorMessage${questionId}`);
        errorDiv.innerText = `The correct answer is ${correctAnswer}`;
        document.getElementById(`question${questionId}`).getElementsByTagName('form')[0].classList.add('error');
    }

    keyPress(e){
        if(e.keyCode === 13){
            this.checkAnswer();
        }
    }

    render() {
        return (
            <Grid>
                <Grid.Row textAlign='center'>
                    <Grid.Column>
                        <Step.Group ordered id='questionSteps' size='mini'>
                            {this.props.questions.map((q, i) => <Step key={i} />)}
                        </Step.Group>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row style={{minHeight: '325px'}}>
                    <Grid.Column width={2} />
                    <Grid.Column width={12}>
                        {this.props.questions.map((question, i) => {
                            return <QuestionContainer question={question} questionNumber={i} key={i} onKeyDown={this.keyPress}/>;
                        })}
                        <div id='success'>
                            <Header as='h2' icon textAlign='center'>
                                <Icon name='check circle' style={{color: '#34d158'}} />
                                <Header.Content>Congratulations</Header.Content>
                                <Header.Subheader>
                                    <Link to='/'>Chapter Listing</Link>
                                </Header.Subheader>
                            </Header>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} />
                    <Grid.Column width={12} textAlign='right'>
                        <Button onClick={() => this.checkAnswer()}>Next</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default QuizContainer