import React from 'react'
import OpenEndedQuestion from './OpenEndedQuestion';
import MultipleChoiceQuestion from './MultipleChoiceQuestion';
import FillInTheBlankQuestion from './FillInTheBlankQuestion';

class QuestionContainer extends React.Component {

    render() {
        let questionType = this.props.question.questionType;
        switch(questionType) {
            case 0:
                return <MultipleChoiceQuestion question={this.props.question} />;
            case 1:
                return <OpenEndedQuestion question={this.props.question} />;
            case 2:
                return <FillInTheBlankQuestion question={this.props.question} />;
            default:
                console.error('Somethings broken fam');
        }
    }
}

export default QuestionContainer