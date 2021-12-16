import "./TripChoose.css"
import { ImAirplane, ImCross } from "react-icons/im"
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
  } from "react-simple-maps";
const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";


const TripChoose = () => {
    return(
        <div className="trip-choose-wrap shadow rounded-15">
            <div className="user-wrap">
                <div className="user-image">
                    <img src="circle4.jpg" alt="user photo" />
                </div>
                <h5>Tomáš, 26</h5>
                <p className="user-bio">
                    Jmenuji se tomáš a jsem alkoholik
                </p>
                <div className="trip-controls">
                    <div className="rounded-50 bg-green color-white">
                        <ImAirplane />
                    </div>
                    <div className="rounded-50 bg-red color-white">
                        <ImCross />
                    </div>
                </div>
            </div>
            <div className="map-wrap">
                <ComposableMap
                    projection="geoAlbers"
                    projectionConfig={{
                        scale: 800
                    }}
                    >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                        geographies.map(geo => (
                            <Geography
                            key={geo.rsmKey}
                            geography={geo}
                            fill="#DDD"
                            stroke="#FFF"
                            />
                        ))
                        }
                    </Geographies>
                    <Marker coordinates={[-101, 53]} fill="#777">
                        <text textAnchor="middle" fill="#F53">
                        Canada
                        </text>
                    </Marker>
                    <Marker coordinates={[-102, 38]} fill="#777">
                        <text textAnchor="middle" fill="#F53">
                        USA
                        </text>
                    </Marker>
                    <Marker coordinates={[-103, 25]} fill="#777">
                        <text textAnchor="middle" fill="#F53">
                        Mexico
                        </text>
                    </Marker>
                </ComposableMap>
            </div>
        </div>
    )
}

export default TripChoose