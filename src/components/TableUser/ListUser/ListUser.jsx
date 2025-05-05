import User from './User/User';

const ListUser = ({ listUser, onReload }) => {
  return (
    <tbody>
      {listUser.map((user, index) => (
        <User key={user._id} user={user} order={index + 1} onReload={onReload} />
      ))}
    </tbody>
  );
};
export default ListUser;
