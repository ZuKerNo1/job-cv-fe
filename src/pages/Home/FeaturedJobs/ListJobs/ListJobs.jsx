import styles from '../../../../styles/FeaturedJobs.module.css';
import Job from './Job/Job';

const ListJobs = ({ listJobs }) => {
  return (
    <div className={styles.jobs_grid}>
      {listJobs.map((job) => (
        <Job key={job._id} job={job} />
      ))}
    </div>
  );
};
export default ListJobs;
