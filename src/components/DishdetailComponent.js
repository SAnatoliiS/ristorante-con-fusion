import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

 
const formatDate = (date) => {
    const options = {
        month: 'short',
        day: '2-digit',
        year: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

const RenderComments = ({ comments }) => {
    if (comments === null) {
        return (<div></div>);
    }
    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            <ul className = "list-unstyled">
                {comments.map(comment => (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>{`-- ${comment.author}, ${formatDate(comment.date)}`}</p>
                </li>
            ))}
            </ul>
        </div>
    );
};

const RenderDish = ({ dish }) => {
    return (
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>

    );
};

const DishDetail = ({ dish }) => {
    if (dish == null) {
        return <div></div>;
    }
    return (
        <div className="container">
            <div className="row">
                <RenderDish dish={dish} />
                <RenderComments comments={dish.comments} />
            </div>
        </div>

    );
};


export default DishDetail;
