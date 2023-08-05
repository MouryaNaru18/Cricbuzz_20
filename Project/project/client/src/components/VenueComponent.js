import { React } from "React";
function VenueComponent({ venueIds, details }) {
    const venue = Object.values(venueIds).find((venue) => venue.id === details.venue_id);
    return venue ? (
      <h6>
        Venue: {venue.venue_name}, {venue.city_name}, {venue.country_name}
      </h6>
    ) : null;
  }
export default VenueComponent;