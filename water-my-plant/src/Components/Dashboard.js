import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import axiosWithAuth from './axiosWithAuth/axiosWithAuth';

export default function Dashboard(props) { 
    const [plants,setPlants] = useState(null)
    const [waterd,setWater] = useState(null)
    // const myfunction = ()=> {
    //     axios.get('https://wmp-api.herokuapp.com/api/plants').then(res => console.log(res.data))
    // }
    useEffect(()=> {
        axiosWithAuth().get('https://wmp-api.herokuapp.com/api/plants').then(res => 
        setPlants(res.data)
        )
    },[waterd])
    
    const water = (id)=> {
        axiosWithAuth().put(`https://wmp-api.herokuapp.com/api/plants/${id}`,{lastWatered: new Date().toString()})
        .then(res =>{ console.log(res.data);
            var myDate = new Date();
            setWater(myDate.toString())})
        .catch(e=> console.log(e)) }
    return(
    <div>   
            <h2>My Plants</h2> 
        <div className="tablecontainer">

        <table>
            <tr><th>Species</th><th>Nick name</th><th>H2o Interval</th><th>H2o Amount</th><th>Last Watered</th><th>Date/Time to be watered</th><th>Water</th></tr>
            {plants && plants.map(el => {
                // var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
                // d.setUTCSeconds(el.lastWatered);
                // console.log(myDate.toGMTString()+" "+myDate.toLocaleString());
                return  <tr><td>{el.speciesID}</td><td>{el.nickname}</td><td>{el.h2oInterval}</td><td>{el.h2oAmount}</td><td>{el.lastWatered}</td><td><button onClick={()=>water(el.plantID)}>Water</button></td></tr>
            })}
            

        </table>
    </div>
    </div>
)
}