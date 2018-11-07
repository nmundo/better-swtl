import React from 'react'
import { Grid, Step, Button, Header, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionContainer from './QuestionContainer.js'

class QuizContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {answerHistory: []};
    }

    checkAnswer() {
        let questionContainer;
        let questionContainers = document.getElementsByClassName('questionContainer');
        for (let i = 0; i < questionContainers.length; i++) {
            if (window.getComputedStyle(document.getElementById(`question${i}`)).getPropertyValue('display') !== 'none') {
                questionContainer = questionContainers[i];
            }
        }

        let questionType = parseInt(questionContainer.dataset.questionType);
        let correctAnswer = questionContainer.dataset.answer.replace(/&quot/g, '"');
        let questionId = parseInt(questionContainer.dataset.id);
        let answeredCorrectly;
        let selectedAnswer = '';

        if (this.state.answerHistory[questionId] == null) {
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
            let steps = document.getElementById('questionSteps').children;
            if (answeredCorrectly) {
                this.setState({answerHistory: [...this.state.answerHistory, true]});
                toast.success('Good Job!');
                steps[questionId].classList.add('success');
                this.goToNextQuestion(questionId)
            } else {
                this.setState({answerHistory: [...this.state.answerHistory, false]});
                steps[questionId].classList.add('failed');
                this.showError(questionId, correctAnswer);
            }
        } else {
            this.goToNextQuestion(questionId);
        }
    }

    goToNextQuestion(questionId) {
        let steps = document.getElementById('questionSteps').children;

        document.getElementById(`question${questionId}`).style.display = 'none';
        steps[questionId].classList.remove('active');
        try {
            document.getElementById(`question${questionId + 1}`).style.display = 'block';
            document.getElementById(`question${questionId + 1}`).getElementsByTagName('input')[0].focus();
            steps[questionId + 1].classList.add('active');
        } catch (e) {
            document.getElementById('success').style.display = 'block';
            document.getElementById('submitButton').style.display = 'none';
            document.getElementById('nextChapterButton').style.display = 'block';
            document.getElementById('nextChapterButton').focus();
            setTimeout(() => this.setScore(), 150);
        }
    }

    showError(questionId, correctAnswerID) {
        let correctAnswer = this.props.questions[questionId].answers[correctAnswerID] || this.props.questions[questionId].correctAnswer;
        let errorDiv = document.getElementById(`errorMessage${questionId}`);
        //errorDiv.innerText = 'The correct answer is: \n';
        errorDiv.getElementsByTagName('code')[0].innerText = correctAnswer;
        document.getElementById(`question${questionId}`).getElementsByTagName('form')[0].classList.add('error');
    }

    getScore() {
        console.log(this.state.answerHistory);
        return this.state.answerHistory.filter(answer => answer).length;
    }

    setScore() {
        let scores = JSON.parse(localStorage.getItem('scores'));
        scores[this.props.chapterId] = this.getScore();
        console.log(scores);
        localStorage.setItem('scores',  JSON.stringify(scores));
    }

    keyPress(e) {
        if (e.keyCode === 13) this.checkAnswer();
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
                    <Grid.Column width={12} onKeyDown={e => this.keyPress(e)}>
                        {this.props.questions.map((question, i) => {
                            return <QuestionContainer question={question} questionNumber={i} key={i}/>
                        })}
                        <div id='success'>
                            <Header as='h1' icon textAlign='center'>
                                <Icon name='check circle' style={{color: '#34d158'}} />
                                <Header.Content>Finished!</Header.Content>
                                <Header.Subheader>
                                    <div>{this.getScore()}/{this.state.answerHistory.length}</div>
                                </Header.Subheader>
                            </Header>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={2} />
                    <Grid.Column width={4}>
                        <Button basic icon labelPosition='left' as={Link} to={`/chapters/${this.props.chapterId - 1}`}>
                            Previous Chapter
                            <Icon name='left arrow' />
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='center'>
                        <Button basic as={Link} to='/'>
                            Chapter Listing
                        </Button>
                    </Grid.Column>
                    <Grid.Column width={4} textAlign='right'>
                        <Button icon labelPosition='right' id='submitButton' onClick={() => this.checkAnswer()}>
                            Next Question
                            <Icon name='right arrow' />
                        </Button>
                        <Button icon labelPosition='right' id='nextChapterButton' as={Link} to={`/chapters/${parseInt(this.props.chapterId) + 1}`} style={{display: 'none'}}>
                            Next Chapter
                            <Icon name='right arrow' />
                        </Button>
                    </Grid.Column>
                </Grid.Row>
                <ToastContainer autoClose={2000} hideProgressBar={true} />
            </Grid>
        )
    }
}

export default QuizContainer