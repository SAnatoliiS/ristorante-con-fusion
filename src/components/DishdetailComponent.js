import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

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
    <div>
      <h4>Comments</h4>
      <ul className="list-unstyled">
        <Stagger in>
          {comments.map(comment => (
            <Fade key={comment.id} in>
              <li>
                <p>{comment.comment}</p>
                <p>{`-- ${comment.author}, ${formatDate(comment.date)}`}</p>
              </li>
            </Fade>
          ))}
        </Stagger>
      </ul>
    </div>
  );
};

const RenderDish = ({ dish }) => {
  return (
    <FadeTransform
      in
      transformProps={{ exitTransform: "scale(0.5) translateY(-50%)" }}
    >
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => !val || val.length >= len;

class CommentForm extends React.Component {
  state = {
    isModalOpen: false
  };
  handleSubmit = values => {
    this.toggleModal();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  };
  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  };
  render() {
    return (
      <React.Fragment>
        <Button outline color="secondary" onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg" />
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <div className="container">
            <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    className="form-control"
                    name="rating"
                    validators={{ required }}
                  >
                    <option disabled selected>
                      Choose Rating
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                  <Errors
                    className="text-danger"
                    model=".rating"
                    show="touched"
                    messages={{
                      required: "This field is required"
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    className="form-control"
                    name="author"
                    id="author"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "This field is required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </Row>
                <Row className="form-group">
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    className="form-control"
                    name="comment"
                    id="comment"
                    rows="6"
                  />
                </Row>
                <Row className="form-group">
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Row>
              </LocalForm>
            </ModalBody>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
const DishDetail = ({ dish, comments, postComment, isLoading, errMess }) => {
  if (isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{errMess}</h4>
        </div>
      </div>
    );
  } else if (dish == null) {
    return <div />;
  }
  return (
    <React.Fragment>
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
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={dish} />
          </div>

          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={comments} />
            <CommentForm postComment={postComment} dishId={dish.id} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DishDetail;
