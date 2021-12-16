import "./TripCreate.css"
import { useState } from "react"

const opts = {
    name: null,
    destination: null,
    startDate: null,
    endDate: null,
    maxAttendees: null,
    tags:[],
    description:null
}

const TripCreate = () => {
    const [tripOptions, setTripOptions] = useState(opts);
    const saveTrip = (e) => {
        e.preventDefault();
        console.log(tripOptions);
    }

    return(
        <form action="POST" className="form">
            <p>Název tripu</p>
            <input type="text" 
            name="name" 
            placeholder="Drancování tichomoří" 
            value={tripOptions.name}
            onInput={e => setTripOptions({...tripOptions, name: e.target.value})} />
            <p>Destinace</p>
            <input type="text" 
            name="destination" 
            placeholder="Karibik" 
            value={tripOptions.destination}
            onInput={e => setTripOptions({...tripOptions, destination: e.target.value})} />
            <p>Datum odjezdu</p>
            <input type="date" 
            name="startDate" 
            placeholder="datum odjezdu" 
            value={tripOptions.startDate}
            onChange={e => setTripOptions({...tripOptions, startDate: e.target.value})} />
            <p>Datum příjezdu</p>
            <input type="date" 
            name="endDate" 
            placeholder="datum příjezdu" 
            onChange={e => setTripOptions({...tripOptions, endDate: e.target.value})}
            value={tripOptions.endDate} />
            <p>Maximální počet lidí</p>
            <select name="maxAttendees" 
            value={tripOptions.maxAttendees} 
            onChange={e => setTripOptions({...tripOptions, maxAttendees: e.target.value})}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            <p>Popis tripu</p>
            <textarea 
            name="description" 
            placeholder="Plenění a drancování karibiku arrr"
            value={tripOptions.description}
            onInput={e => setTripOptions({...tripOptions, description: e.target.value})}>

            </textarea>
            <button onClick={e => saveTrip(e)}>Uložit</button>
        </form>
    )
}

export default TripCreate