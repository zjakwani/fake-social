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

// Profile page for a given Profile ID
function Profile(): ReactElement {

  // Gets id from the Router parameters to display corresponding data
  const { id } = useParams<RouteParam>();

  // Hooks for the current user and lists of correlated posts and albums
  const [user, setUser] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [albums, setAlbums] = useState<Album[]>([])
  
  // API endpoints using ID from router
  const profileUrl: string = "https://jsonplaceholder.typicode.com/users/" + id
  const postsUrl: string = profileUrl + "/posts"
  const albumsUrl: string = profileUrl + "/albums"

  // Axios used to fetch Post array in JSON  and map to custom interface
  function fetchPosts() {
    axios.get(postsUrl)
    .then((response: AxiosResponse) => {
      // Maps and casts to defined model
      setPosts(response.data.map((item:any) => ({
        id: item.id,
        title: item.title,
      } as Post)))
      // logs any errors
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  // Axios used to fetch Album array in JSON and map to custom interface
  function fetchAlbums() {
    axios.get(albumsUrl)
    .then((response: AxiosResponse) => {
      // Maps and casts to defined model
      setAlbums(response.data.map((item:any) => ({
        id: item.id,
        title: item.title,
      } as Album)))
      // logs any errors 
    }).catch((error) => {
      console.log("Error:", error)
    })
  }

  // Axios get request fetches the unique profile by id
  function fetchProfile() {
    axios.get(profileUrl)
    // Maps JSON to predefined Profile model
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
      // logs any erorrs
    }).catch((error) => {
      console.log("Error:", error)
    })
  }
 
  // Triggers once on page load
  useEffect(() => {
    fetchProfile()
    fetchPosts()
    fetchAlbums()
  },[])

    return ( 
    <div>

      {/* User heading information */}
      {user && (
        <div>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
              {user.name}
          </Typography>
          <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Phone number: {user.phone}
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              website: {user.website}
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Company: {user.company.name}
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Company catch phrase: {user.company.catchPhrase}
          </Typography>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              Address: {user.address.street + " " + user.address.suite + " " + user.address.city + " " + user.address.zipcode}
          </Typography>
        </div>
      )}
      
      {/* Displays two collapsible items of posts and albums */}

      <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Posts
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>

              {/* posts contain a link to the post page to see comments */}

              {posts.map((post: Post) => {
                return(
                  <Grid item>
                    <Button variant="outlined" href={"/posts/" + post.id}>{post.title}</Button>
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
            <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
              Albums
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={4}>

              {/* albums contain a link to the album page for viewing*/}

              {albums.map((album: Album) => {
                return(
                  <Grid item>
                    <Button variant="outlined" href={"/albums/" + album.id}>{album.title}</Button>
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