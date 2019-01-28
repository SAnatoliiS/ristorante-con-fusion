import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem
} from "reactstrap";
import { Link } from "react-router-dom";

const formatDate = date => {
  const options = {
    month: "short",
    day: "2-digit",
    year: "numeric"
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
};

const RenderComments = ({ comments }) => {
  if (comments === null) {
    return <div />;
  }
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul className="list-unstyled">
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

const DishDetail = ({ dish, comments }) => {
  if (dish == null) {
    return <div />;
  }
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={dish} />
        <RenderComments comments={comments} />
      </div>
    </div>
  );
};

export default DishDetail;
