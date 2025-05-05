import Contract from './Contract/Contract';

const ListContracts = ({ listContracts, onReload }) => {
  return (
    <tbody>
      {listContracts.map((contract, index) => (
        <Contract key={contract._id} contract={contract} order={index + 1} onReload={onReload} />
      ))}
    </tbody>
  );
};

export default ListContracts;
