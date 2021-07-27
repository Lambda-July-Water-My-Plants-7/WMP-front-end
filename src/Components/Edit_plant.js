import React, {useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import { axiosWithAuth } from "../utils/axiosWithAuth"



const EditPlant = ({plant, setPlant}) => {
    const {push} = useHistory()
    const {id} = useParams()

    //useEffect for initial load for plant data--GET
    useEffect(() => {
        axiosWithAuth()
            .get(`/api/plants/${id}`)  
            .then(res => {
                setPlant(res.data)
            })
            .catch(err => {
                console.log("GET ERR AXIOX", err)
            })
    }, [id])

    //changeHandler
    const changeHandler = e => {
        e.preventDefault()
        setPlant({
            ...plant,
            [e.target.name]: e.target.value
        })
    }

    //saveItem onSubmit-->PUT
    const saveItem = e => {
        e.preventDefault()
        axiosWithAuth()
            .put(`/api/plants/${id}`, plant) 
            .then(res => {
                setPlant(plant)
                // push(`/homepage`)
            })
            .catch(err => {
                console.log("UPDATE PLANT ERR", err)
            })
    }

    const deletePlant = e => {
        e.preventDefault()
        axiosWithAuth()
            .delete(`/api/plants/${id}`)
            .then(res => {
                setPlant(plant)
                // push(`/homepage`)
            })
            .catch(err => {
                console.log("DELETE ERR", err)
            })
    }

    return(
        <div className='container'>
            <div className='list_div'>
                <h2>Edit Plant</h2>
                <p>Fill out the updated information</p>
                <form className='form' onSubmit={saveItem}>
                    <label htmlFor="speciesId" />SpeciesID
                    <input
                        id="speciesId"
                        type="number"
                        name="speciesId"
                        placeholder="speciesId"
                        value={newPlant.speciesID}
                        onChange={changeHandler}
                    />
                    <label htmlFor="h2oInterval" /> H2OInterval
                    <input
                        id="h2oInterval"
                        type="number"
                        name="h2oInterval"
                        placeholder="h2oInterval"
                        value={newPlant.h2oInterval}
                        onChange={changeHandler}
                    />
                    <label htmlFor='h2oAmount' />H2OAmount
                    <input
                        id="h2oAmount"
                        type="text"
                        name="h2oAmount"
                        placeholder="h2oAmount"
                        value={newPlant.h2oAmount}
                        onChange={changeHandler}
                    />
                    <label htmlFor="nickname" />Nickname
                    <input
                        id="nickname"
                        type="text"
                        name="nickname"
                        placeholder="nickname"
                        value={newPlant.nickname}
                        onChange={changeHandler}
                    />
                                     
                    <button type='submit'>Save</button>
                    <button type='submit' onClick={deletePlant}>Delete</button>

                </form>
            </div>
        </div>
    )
}

export default EditPlant