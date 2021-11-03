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
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


function PostPage(): ReactElement {
  const [post, setPost] = useState<Post | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const { id } = useParams<RouteParam>();
  const postUrl: string = "https://jsonplaceholder.typicode.com/posts/" + id
  const commentsUrl: string = postUrl + "/comments"

  

  function fetchComments() {
    axios.get(commentsUrl)
    .then((response: AxiosResponse) => {
      setComments(response.data.map((item:any) => ({
        id: item.id,
        name: item.name,
        body: item.body,
      } as Comment)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  function fetchPost() {
    axios.get(postUrl)
    .then((response: AxiosResponse) => {
      setPost({
        id: response.data.id,
        title: response.data.title
      } as Post)
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  const [openPost, setOpenPost] = useState(false)
  const [postInput, setPostInput] = useState("")

  const handleClickOpenPost = () => {
    setOpenPost(true);
  };
  const handleClosePost = () => {
    setOpenPost(false);
    setPostInput("")
  };
  const handleCloseSubmitPost = (val: string) => {
    setOpenPost(false);
    setPost({
      id: Number(id),
      title: val,
    })
    setPostInput("")
  };

  useEffect(() => {
    fetchComments()
    fetchPost()
  },[])


  return ( 
  <div>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            {(post && post.title)}
          </Typography>
          <Button color="inherit">Delete</Button>
          <Button color="inherit" onClick={handleClickOpenPost}>Edit</Button>
        </Toolbar>
      </AppBar>
    </Box>
    {comments.map((comment) => {
      return (
        <Card>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {comment.name + ": " + comment.body}
          </Typography>
          <Button>Delete</Button>
        </Card>
      )
    })}
    <Dialog open={openPost} onClose={handleClosePost}>
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <DialogContentText>
            new content
          </DialogContentText>
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
  </div> 
  )
  }
  
export default PostPage;