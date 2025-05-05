import Candidate from './Candidate/Candidate';

const ListCandidates = ({ listCandidates, onReload }) => {
  return (
    <tbody>
      {listCandidates.map((candidate, index) => (
        <Candidate key={index} candidate={candidate} order={index + 1} onReload={onReload} />
      ))}
    </tbody>
  );
};
export default ListCandidates;
