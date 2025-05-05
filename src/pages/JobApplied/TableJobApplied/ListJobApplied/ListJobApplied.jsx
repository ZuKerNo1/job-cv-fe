import JobApplied from './JobApplied/JobApplied';

const ListJobApplied = ({ listJobApplied }) => {
  return (
    <tbody>
      {listJobApplied.map((jobApplied, index) => (
        <JobApplied key={jobApplied._id} jobApplied={jobApplied} order={index + 1} />
      ))}
    </tbody>
  );
};
export default ListJobApplied;
