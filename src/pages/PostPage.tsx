import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Post, Comment } from "../models/Post"
import axios from "axios"
import { RouteParam } from "../models/RouteParam"
import { useParams } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

// Page for a specific Post correlated with a UID
function PostPage(): ReactElement {
  // Hook for post title
  const [post, setPost] = useState<Post | null>(null)
  // Hook for all comments on post
  const [comments, setComments] = useState<Comment[]>([])

  // Router parameter of post id
  let { id } = useParams<RouteParam>();
  if (id == null) {
    id = "1"
  }

  // Api endpoints utilizing id from router
  const postUrl: string = "https://jsonplaceholder.typicode.com/posts/" + id
  const commentsUrl: string = postUrl + "/comments"
  const deleteCommentUrl = (id: number) => {
    return ("https://jsonplaceholder.typicode.com/comments/" + String(id))
  } 

  // GET request to fetch array of comments 
  function fetchComments() {
    axios.get(commentsUrl)
    .then((response: AxiosResponse) => {
      // Maps JSON to comment model
      setComments(response.data.map((item:any) => ({
        id: item.id,
        body: item.body,
      } as Comment)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  // GET request to fetch post title
  function fetchPost() {
    axios.get(postUrl)
    .then((response: AxiosResponse) => {

       // Casts JSON to post object
      setPost({
        id: response.data.id,
        title: response.data.title
      } as Post)
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  // onClick Functions for the DELETE buttons to send API calls
  const deleteComment = (id: number) => {
    setComments(comments.filter(comment => comment.id !== id))
    axios.delete(deleteCommentUrl(id))
    .catch((error) => {
      console.log("Error:", error)
    })
  }
  const deletePost = () => {
    axios.delete(postUrl)
    .catch((error) => {
      console.log("Error:", error)
    })
  }
  // Onclick Function for adding a comment's API call
  const addComment = (id: number, val: string) => {
    axios.post(commentsUrl, {
      id: id,
      body: val,
    })
    .catch((error) => {
      console.log("Error:", error)
    })
  }


  // Hooks for the EDIT POST dialog
  const [openPost, setOpenPost] = useState(false)
  const [postInput, setPostInput] = useState("")

  const handleClickOpenPost = () => {
    setOpenPost(true);
  };
  const handleClosePost = () => {
    setOpenPost(false);
    setPostInput("")
  };
  // On Submit, updates the current post in state
  const handleCloseSubmitPost = (val: string) => {
    setOpenPost(false);
    setPost({
      id: Number(id),
      title: val,
    })
    setPostInput("")
  };

  

  
// Hooks for Text Input for Adding a comment
  const [openComment, setOpenComment] = useState(false)
  const [commentInput, setCommentInput] = useState("")

  const handleClickOpenComment = () => {
    setOpenComment(true);
  };
  const handleCloseComment = () => {
    setOpenComment(false);
    setCommentInput("")
  };
  // On Submit, Adds a comment to state array
  const handleCloseSubmitComment = (val: string) => {
    setOpenComment(false);
    // Calculates next id in sequence
    const newCommentId = comments[comments.length - 1].id
    // Functionally appends to the state array
    setComments([...comments, {
      id: newCommentId,
      body: val,
    }])
    setCommentInput("")
    // makes API call
    addComment(newCommentId, val)
  };

  // Triggers API get requests on page load
  useEffect(() => {
    fetchComments()
    fetchPost()
  },[])


  return ( 
  <div>
    {/* Header bar for post title */}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            {(post && ("Post: " + post.title))}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>


    {/* Maps list of comments to cards */}
    {comments.map((comment) => {
      return (
        <Card>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {("Comment: " + comment.body)}
          </Typography>
          <Button onClick={() => deleteComment(comment.id)}>Delete</Button>
        </Card>
      )
    })}

    {/* Delete edit and comment buttons with corresponding onclick functions */}
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" href="/" onClick={deletePost}>Delete Post</Button>
          <Button color="inherit" onClick={handleClickOpenPost}>Edit Post</Button>
          <Button color="inherit" onClick={handleClickOpenComment}>Comment</Button>
        </Toolbar>
      </AppBar>
    </Box>

    {/* 2 dialog boxes for commenting and editing a post */}
    <Dialog open={openPost} onClose={handleClosePost}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Content"
            fullWidth
            variant="standard"
            value = {postInput}
            onChange = {e => {setPostInput(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePost}>Cancel</Button>
          <Button onClick={() => handleCloseSubmitPost(postInput)}>Confirm</Button>
        </DialogActions>
    </Dialog>
    <Dialog open={openComment} onClose={handleCloseComment}>
        <DialogTitle>Create Comment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="New Comment"
            fullWidth
            variant="standard"
            value = {commentInput}
            onChange = {e => {setCommentInput(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseComment}>Cancel</Button>
          <Button onClick={() => handleCloseSubmitComment(commentInput)}>Confirm</Button>
        </DialogActions>
    </Dialog>
  </div> 
  )
  }
  
export default PostPage;