import Job from './Job/Job';

const ListJobs = ({ listJob, onReload }) => {
  return (
    <tbody>
      {listJob.map((job, index) => (
        <Job key={job._id} job={job} order={index + 1} onReload={onReload} />
      ))}
    </tbody>
  );
};
export default ListJobs;
