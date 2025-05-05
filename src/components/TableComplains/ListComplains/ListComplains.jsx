import Complain from './Complain/Complain';

const ListComplains = ({ listComplain, onReload }) => {
  return (
    <tbody>
      {listComplain.map((complain, index) => (
        <Complain key={complain._id} complain={complain} order={index + 1} onReload={onReload} />
      ))}
    </tbody>
  );
};
export default ListComplains;
