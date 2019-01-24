import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {
    formatDate(date) {
        const options = {
            month: 'short',
            day: '2-digit',
            year: 'numeric'
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }
    renderComments(comments) {
        if (comments === null) {
            return (<div></div>);
        }
        return(
            <div>
                <h4>Comments</h4>
                <ul class = "list-unstyled">
                    {comments.map(comment => (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>{`-- ${comment.author}, ${this.formatDate(comment.date)}`}</p>
                    </li>
                ))}
                </ul>
            </div>
        );
    }
    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        );
    }
    render() {
        if (this.props.dish == null) {
            return <div></div>;
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            </div>
            
            
        );
    }
}

export default DishDetail;
