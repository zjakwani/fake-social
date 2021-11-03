import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { UserProfile } from "../models/User"
import axios from "axios"
import { useParams } from "react-router-dom"
import { RouteParam } from "../models/RouteParam"


function Profile(): ReactElement {
  const [user, setUser] = useState<UserProfile | null>(null)
  const { id } = useParams<RouteParam>();
  const profileUrl: string = "https://jsonplaceholder.typicode.com/users/" + id

  useEffect(() => {
    axios.get(profileUrl)
    .then((response: AxiosResponse) => {
      setUser({
        id: response.data.id,
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
      } as UserProfile)
    }).catch((error) => {
      console.log("Error:", error)
    })
  }, [])

    return ( 
    <div>
      {user && <h2>{user.name}</h2>}
    </div> 
    );
  };
  
export default Profile;