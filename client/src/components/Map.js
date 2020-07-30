/*global google*/
import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} from "react-google-maps";
class Map extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    directions: null,
  };

  componentDidMount() {
    const directionsService = new google.maps.DirectionsService();

    const destination_id = localStorage.getItem("placeId");
    const origin = { placeId: "ChIJPZnsYhtOqEcRncTWrtTqxrk" };
    const destination = { placeId: destination_id };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
    this.calculateDeliveryTime();
  }

  calculateDeliveryTime() {
    const destination_id = localStorage.getItem("placeId");
    const distanceMatrixService = new google.maps.DistanceMatrixService();
    distanceMatrixService.getDistanceMatrix(
      {
        origins: [{ placeId: "ChIJPZnsYhtOqEcRncTWrtTqxrk" }],
        destinations: [{ placeId: destination_id }],
        travelMode: "BICYCLING",
        drivingOptions: {
          departureTime: new Date(Date.now() + 100), // for the time N milliseconds from now.
          trafficModel: "pessimistic",
        },
      },
      callback
    );
    function callback(response, status) {
      // See Parsing the Results for
      // the basics of a callback function.
      if (status === "OK") {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.text;
            var duration = element.duration.value;
            var from = origins[i];
            var to = destinations[j];
            console.log("distance: " + distance);
            console.log("duration: " + duration);
            console.log("from: " + from);
            console.log("to: " + to);
            localStorage.clear();
            localStorage.setItem("duration", duration);
          }
        }
      }
    }
  }

  render() {
    console.log("Props from the Mapjs", this.props);
    const GoogleMapExample = withGoogleMap((props) => (
      <GoogleMap defaultCenter={{ lat: 52.52, lng: 13.41 }} defaultZoom={13}>
        <DirectionsRenderer directions={this.state.directions} />
      </GoogleMap>
    ));

    return (
      <div>
        <GoogleMapExample
          containerElement={
            <div style={{ height: `500px`, width: `auto`, margin: 10 }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }
}

export default Map;
