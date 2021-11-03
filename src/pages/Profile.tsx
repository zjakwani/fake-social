import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { UserProfile, Address, Company } from "../models/User"
import { Post } from "../models/Post"
import { Album } from "../models/Album"
import axios from "axios"
import { useParams } from "react-router-dom"
import { RouteParam } from "../models/RouteParam"
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import Grid from "@mui/material/Grid"

function Profile(): ReactElement {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  const { id } = useParams<RouteParam>();
  const profileUrl: string = "https://jsonplaceholder.typicode.com/users/" + id
  const postsUrl: string = profileUrl + "/posts"
  const albumsUrl: string = profileUrl + "/albums"

  function fetchPosts() {
    axios.get(postsUrl)
    .then((response: AxiosResponse) => {
      setPosts(response.data.map((item:any) => ({
        id: item.id,
        title: item.title,
      } as Post)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  function fetchAlbums() {
    axios.get(albumsUrl)
    .then((response: AxiosResponse) => {
      setAlbums(response.data.map((item:any) => ({
        id: item.id,
        title: item.title,
      } as Album)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  function fetchProfile() {
    axios.get(profileUrl)
    .then((response: AxiosResponse) => {
      setUser({
        id: response.data.id,
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
        address: {
          street: response.data.address.street,
          suite: response.data.address.suite,
          city: response.data.address.city,
          zipcode: response.data.address.zipcode,
        } as Address,
        phone: response.data.phone,
        website: response.data.website,
        company: {
          name: response.data.company.name,
          catchPhrase: response.data.company.catchPhrase,
          bs: response.data.company.bs,
        } as Company,
      } as UserProfile)
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  useEffect(() => {
    fetchProfile()
    fetchPosts()
    fetchAlbums()
  })

    return ( 
    <div>

      {user && (
        <div>
          <h2>{user.name}</h2>
          <h3>{user.phone}</h3>
        </div>
      )}
      
      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Posts</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {posts.map((post: Post) => {
                return(
                  <Grid item>
                    <Button variant="contained" href={"/posts/" + post.id}>{post.title}</Button>
                  </Grid>
                )
              })}
            </Grid> 
          </AccordionDetails>
        </Accordion>

        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Albums</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              {albums.map((album: Album) => {
                return(
                  <Grid item>
                    <Button variant="contained" href={"/albums/" + album.id}>{album.title}</Button>
                  </Grid>
                )
              })}
            </Grid> 
          </AccordionDetails>
        </Accordion>

       
    </div>
    );
  };
  
export default Profile;