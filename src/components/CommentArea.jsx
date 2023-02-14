import { useEffect, useState } from "react";
import CommentList from "./CommentList";
import AddComment from "./AddComment";
import Loading from "./Loading";
import Error from "./Error";

const CommentArea = (props) => {
  /*  state = {
    comments: [],
    isLoading: false,
    isError: false,
  }; */
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  /*   // componentDidMount = async () => {
  //   try {
  //     let response = await fetch(
  //       'https://striveschool-api.herokuapp.com/api/comments/' +
  //         this.props.asin,
  //       {
  //         headers: {
  //           Authorization: ' your-auth-token-goes-here',
  //         },
  //       }
  //     )
  //     console.log(response)
  //     if (response.ok) {
  //       let comments = await response.json()
  //       this.setState({ comments: comments, isLoading: false, isError: false })
  //     } else {
  //       console.log('error')
  //       this.setState({ isLoading: false, isError: true })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({ isLoading: false, isError: true })
  //   }
  // } */
  useEffect(
    () => {
      fetchComments();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [props.asin]
  );

  const fetchComments = async () => {
    try {
      let response = await fetch(
        "https://striveschool-api.herokuapp.com/api/comments/" + props.asin,
        {
          headers: {
            "Content-type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2VhM2UyZDVmZTk4NDAwMTM0ZDNkNzAiLCJpYXQiOjE2NzYyOTU3MjYsImV4cCI6MTY3NzUwNTMyNn0.1Ac80W2IOfCSGSH6_IYlwsK5lu1ivQsPLMrlpeCp7jI",
          },
        }
      );
      console.log(response);
      if (response.ok) {
        let comments = await response.json();
        setComments(
          comments
          /*  isLoading: false,
          isError: false,  */
        );
        setIsLoading(false);
        setHasError(false);
      } else {
        console.log("error");
        /* this.setState({ isLoading: false, isError: true }) */
        setIsLoading(false);
        setHasError(true);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      setHasError(true);
    }
  };

  return (
    <div className="text-center">
      {isLoading && <Loading />}
      {hasError && <Error />}
      <AddComment asin={props.asin} />
      <CommentList commentsToShow={comments} />
    </div>
  );
};

export default CommentArea;
