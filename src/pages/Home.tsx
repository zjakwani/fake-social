import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { User } from "../models/User"
import axios from "axios"
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'


// Home Page of Fake-Media
function Home(): ReactElement {

  // Hook defines the list of users dynamically from the User Model
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    // this api endpoint gives all users irrespective of id
    const usersUrl: string = "https://jsonplaceholder.typicode.com/users/"

    // GET request
    axios.get(usersUrl)
    .then((response: AxiosResponse) => {
      // Maps the response to set the state array
      setUsers(response.data.map((usr:any) => ({
        id: usr.id,
        name: usr.name,
        username: usr.username,
        email: usr.email
      } as User)))
      // logs any errors
    }).catch((error) => {
      console.log("Error:", error)
    })
  }, [])

    return ( 
    <div>
      <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
              Fake-Media
      </Typography>
      {users.map((user: User) => {
        return(
            <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Button variant="contained" href={"/profile/" + user.id}>{user.name}</Button>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Username: {user.username}
              </Typography>
              <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                Email: {user.email}
              </Typography>
            </AccordionDetails>
          </Accordion>
        )
      })}
    </div> 
    );
  };
  
export default Home;