import React from 'react';
export default function GoogleMap(){
return(
    <div>
        <iframe className="googleMap"
  loading="lazy"
  allowfullscreen
  src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJf-_2nBRxyYcR4gCsR374I58&key=AIzaSyB9khLAFZAoqxu-wnRSGRn2COOUSBS6Do0">
</iframe>
    </div>
)
}