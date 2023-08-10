import { useEffect, useState, useContext } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

const Comments = (props) => {
  const notificationCtx = useContext(NotificationContext);
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  useEffect(() => {
    if (showComments) {
      setIsFetchingComments(true);
      fetch(`/api/comment/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComments(false);
        });
    }
  }, [showComments]);

  const addCommentHandler = (commentData) => {
    notificationCtx.showNotification({
      title: 'Adding comment...',
      message: 'Adding comment for event',
      status: 'pending',
    });

    fetch(`/api/comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return response.json().then((data) => {
          throw new Error(data.message || 'Something went wrong!');
        });
      })
      .then(() => {
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully added comment for event!',
          status: 'success',
        });
      })
      .catch((error) => {
        notificationCtx.showNotification({
          title: 'Error!',
          message: error.message || 'Something went wrong!',
          status: 'error',
        });
      });
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
