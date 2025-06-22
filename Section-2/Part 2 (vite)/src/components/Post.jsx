import classes from './Post.module.css'

function Post({author, body}) {

return (
<div className={classes.post}>
  <h1>Heyyyaa Mnjoooo!!</h1>
  <p className={classes.author}>{author}</p>
  <p className={classes.text}>{body}</p>
</div>
);
}
export default Post;