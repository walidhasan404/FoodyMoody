import React from "react";
import { useLocation } from "react-router-dom";

function ReviewForm() {
  const location = useLocation();
  const { parcel } = location.state || {};

  return (
    <div>
      <h1>Review Form</h1>
      {parcel ? (
        <div>
          <p>Parcel Type: {parcel.parcelType}</p>
          <p>Delivery Date: {parcel.deliveryDate}</p>
          {/* Render other parcel details and form elements */}
        </div>
      ) : (
        <p>No parcel data available.</p>
      )}
    </div>
  );
}

export default ReviewForm;
