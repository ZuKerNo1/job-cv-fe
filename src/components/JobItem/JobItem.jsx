import { Link } from 'react-router-dom';
import styles from '../../styles/FeaturedJobs.module.css';
const JobItem = ({ job }) => {
  return (
    <div className={styles.job_card}>
      <h3 className={styles.job_title}>{job.position}</h3>
      <div className={styles.job_details}>
        <p>
          <i className="fas fa-building" /> Tech Solutions
        </p>
        <p>
          <i className="fas fa-map-marker-alt" /> {job.jobLocation}
        </p>
        <p>
          <i className="fas fa-dollar-sign" /> {job.salary} Dollars
        </p>
      </div>
      <div className={styles.job_tags}>
        {job.requirements.map((item) => (
          <span key={item} className={styles.job_tag}>
            {item}
          </span>
        ))}
      </div>
      <Link to={`/apply/${job._id}`}>
        <button className={styles.apply_button}>Ứng tuyển ngay</button>
      </Link>
    </div>
  );
};
export default JobItem;
