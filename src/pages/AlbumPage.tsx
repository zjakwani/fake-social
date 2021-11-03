import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Album } from "../models/Album"
import axios from "axios"
import { RouteParam } from "../models/RouteParam"
import { useParams } from "react-router-dom"
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"

function AlbumPage(): ReactElement {
  const [photos, setPhotos] = useState<Album[]>([])
  const { id } = useParams<RouteParam>();
  const photosUrl: string = "https://jsonplaceholder.typicode.com/albums/" + id + "/photos"

  useEffect(() => {
    axios.get(photosUrl)
    .then((response: AxiosResponse) => {
      setPhotos(response.data.map((item:any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      } as Album)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  })

  const slider = (photos.length > 0)  ?
    <AwesomeSlider>
    {photos.map((album: Album) => {
        return <div><img src={album.url}/></div>
    })}
    </AwesomeSlider>
    : null


  return ( 
  <div>
    {slider}
  </div> 
  )
  }
  
export default AlbumPage;