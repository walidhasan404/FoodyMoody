function DeliveryTabular({index,delivery,refetch}) {
  return (
    <tr className="hover">
      <th>{index}</th>
      <td>{delivery.name}</td>
      <td>{ delivery.phoneNumber}</td>
      <td>Number of parcel delivered</td>

      <td>Average review</td>
    </tr>
  );
}
export default DeliveryTabular