import { ChangeEvent, useEffect, useState } from "react"
import { FeaturePage } from ".."
import Card from "../components/Card"
import Pagination from "rc-pagination/lib/Pagination"

import { fetchFeaturePage } from "../helpers/home"
import "rc-pagination/assets/index.css"

const Home = () => {
    const [featurePage, setFeaturePage] = useState<FeaturePage>({} as FeaturePage)
    const [currentPage, setCurrentPage] = useState(0)
    const [magType, setMagType] = useState("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFeaturePage(currentPage, magType).then((data) => {
            setFeaturePage(data)
            setLoading(false)
        })

    }, [])

    useEffect(() => {
        if(!loading) {
            fetchFeaturePage(currentPage, magType).then((data) => {
                setFeaturePage(data)
                setLoading(false)
            })
        }

    }, [currentPage, magType])


    const handleChangeMagType = (e: ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault()

        setMagType(e.target.value)
    }

  return (
    <>
        <form className="mb-5 flex gap-20 items-center">
            <div className="flex items-center gap-6">
                <label className="text-2xl font-bold" htmlFor="magType">Filtrar por mag_type</label>
                <select 
                    className="p-2 text-xl bg-slate-700 text-white font-bold rounded-sm" 
                    id="magType"
                    onChange={handleChangeMagType}
                    value={magType}
                >
                    <option value="">all</option>
                    <option value="md">md</option>
                    <option value="ml">ml</option>
                    <option value="ms">ms</option>
                    <option value="mw">mw</option>
                    <option value="me">me</option>
                    <option value="mi">mi</option>
                    <option value="mb">mb</option>
                    <option value="mlg">mlg</option>
                </select>
            </div>

            <h2 className="text-2xl font-bold">Total de elementos: {""}
                <span className="font-normal">{featurePage?.pagination?.total}</span>
            </h2>
        </form>

        <div className="grid grid-cols-3 gap-4">
            {featurePage?.data?.length > 0 ? (
                featurePage?.data?.map((feature) => (
                    <Card
                        key={feature.id}
                        id={feature?.id}
                        externalId={feature.attributes.external_id}
                        title={feature.attributes.title}
                        magnitude={feature.attributes.magnitude}
                        magType={feature.attributes.mag_type}
                        place={feature.attributes.place}
                        time={feature.attributes.time}
                        tsunami={feature.attributes.tsunami}
                        longitude={feature.attributes.longitude}
                        latitude={feature.attributes.latitude}
                        externalUrl={feature.links.external_url}
                    />
                ))
            ): (
                <p className="text-2xl font-bold">No se encontraron elementos</p>
            )}
            
        </div>

        <Pagination 
            pageSize={featurePage?.pagination?.per_page}
            total={featurePage?.pagination?.total}
            current={currentPage}
            onChange={(page) => setCurrentPage(page)}
            className="m-10 font-bold flex justify-center"
        />
    </>
  )
}

export default Home