function UserItem({ item }) {
  return (
    <tr>
      <td>#{item.id}</td>
      <td>{item.name}</td>
      <td>{item.address}</td>
      <td>{item.phone_number}</td>
      <td>{item.email}</td>
    </tr>
  );
}

export default UserItem;
