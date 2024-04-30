import { Navigate, useParams } from "react-router-dom"
import { FeatureWithMessages } from ".."
import { FormEvent, useEffect, useState } from "react"
import axios from "axios"

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './feature.css'

const Feature = () => {

    const { featureId } = useParams()

    const [feature, setFeature] = useState<FeatureWithMessages>({} as FeatureWithMessages)
    const [message, setMessage] = useState("")

    if(featureId === undefined) {
        return <Navigate to="/" />
    }

    useEffect(() => {
        const fetchFeature = async () => {
            const { data } = await axios.get<FeatureWithMessages>(`http://localhost:8080/api/v1/features/${+featureId}`)
            setFeature(data)
        }

        fetchFeature()
    }, [])
    
    const { mag_type, magnitude, place, time, longitude, latitude, tsunami, title, external_id } = feature?.attributes || {}

    const handleSubmitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if(message.length < 1 && message.length > 150) {
            return
        }

        axios.post(`http://localhost:8080/api/v1/features/comment/create`, {
            feature_id: feature.id,
            body: message
        }).then(() => {
            axios.get<FeatureWithMessages>(`http://localhost:8080/api/v1/features/${+featureId}`)
            .then(({ data }) => {
                setFeature(data)
            })
        })
        
        setMessage("")
        

    }

  return (
    <>
      {feature && (
        <div className="mx-5">
          <h1 className="text-4xl font-bold text-slate-700 mt-10 mb-10">
            {title}
          </h1>

          <div className="flex flex-wrap gap-4 mb-5">
            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">MagType:</span> {mag_type}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">Place:</span> {place}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">Time:</span>{" "}
              {new Date(+time).toLocaleString()}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">Longitud:</span> {longitude}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">Latitud:</span> {latitude}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">Magnitude:</span> {magnitude}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">Tsunami:</span> {tsunami}
            </p>

            <p className="mb-3 font-normal text-2xl">
              <span className="font-bold">External id:</span> {external_id}
            </p>

            <p className="mb-3 font-bold text-2xl text-blue-600">
              <a target="_blank" href={feature?.links?.external_url}>
                External Url
              </a>
            </p>
          </div>

          {longitude && latitude && (
            <MapContainer
              center={[latitude, longitude]}
              zoom={8}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          )}

          <form onSubmit={handleSubmitForm} className="mt-5 flex gap-5">
            <input
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              className="w-full p-2"
              type="text"
              placeholder="Empieza escribiendo algo aquí..."
            />
            <input
              type="submit"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:cursor-pointer"
            />
          </form>

          <div className="grid grid-cols-1 gap-4 my-5">
            {feature?.comments?.length > 0 ? (
              feature?.comments?.map((comment) => (
                <p 
                    key={comment.id}
                    className="text-xl font-bold bg-gray-100 p-3 rounded-lg w-full"
                >{comment.body}</p>
              ))
            ) : (
              <p className="my-6 text-xl font-bold">No hay comentarios</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Feature