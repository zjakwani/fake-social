import { AxiosResponse } from "axios";
import { ReactElement, useEffect, useState } from "react";
import { Album } from "../models/Album"
import axios from "axios"
import { RouteParam } from "../models/RouteParam"
import { useParams } from "react-router-dom"
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css"

// Album page imports SLIDER to display a slideshow
function AlbumPage(): ReactElement {

  // Hook for photos array in state
  const [photos, setPhotos] = useState<Album[]>([])

  // Router params from react router
  const { id } = useParams<RouteParam>();

  // api endpoint
  const photosUrl: string = "https://jsonplaceholder.typicode.com/albums/" + id + "/photos"

  // triggers on page load
  useEffect(() => {
    axios.get(photosUrl)
    .then((response: AxiosResponse) => {
      // Maps Json to Album schema
      setPhotos(response.data.map((item:any) => ({
        id: item.id,
        title: item.title,
        url: item.url,
      } as Album)))
    }).catch((error) => {
      console.log("Error:", error)
    })
  },[])

  // Imported slider object from Awesome Slider
  const slider = (photos.length > 0)  ?
    <AwesomeSlider>
    {photos.map((album: Album) => {
        return <div><img src={album.url} alt="Link invalid"/></div>
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