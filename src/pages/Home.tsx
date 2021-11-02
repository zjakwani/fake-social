import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import User from "../models/User"
import axios from "axios"

const usersUrl = "https://jsonplaceholder.typicode.com/users/"

function Home(): ReactElement {
  const [users, setUsers] = useState<User[]>([])

  function p() {
    console.log(users)
  }

  useEffect(() => {
    axios.get(usersUrl)
    .then((response: AxiosResponse) => {
      setUsers(response.data.map((usr:any) => ({
        id: usr.id,
        name: usr.name,
        username: usr.username,
        email: usr.email
      } as User)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  }, [])

    return ( 
    <div>
      {users.map((user: User) => {
        return(
          <div key={user.id}>
            <h2>{user.name}</h2>
            <h3>{user.username}</h3>
            <h4>{user.email}</h4>
          </div>
        )
      })}
      <button onClick={p}>Test</button>
    </div> 
    );
  };
  
export default Home;