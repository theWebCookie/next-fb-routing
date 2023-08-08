import classes from './comment-list.module.css';

const CommentList = () => {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      <li>
        <p>Comment</p>
        <div>
          By <address>User</address>
        </div>
      </li>
      <li>
        <p>Comment</p>
        <div>
          By <address>User</address>
        </div>
      </li>
    </ul>
  );
};

export default CommentList;
