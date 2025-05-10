import { useEffect, useState } from 'react';
import styles from '../../../styles/FeaturedJobs.module.css';
import ListJobs from './ListJobs/ListJobs';
import { getListJobForYouAPI } from '../../../apis';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import { ROLE_USER } from '../../../utils/constants';
const JobForYou = () => {
  const [listJobs, setListJobs] = useState(null);
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    getListJobForYouAPI(3, user.categories).then((res) => {
      setListJobs(res.jobs);
    });
  }, [user]);
  return (
    <section className={styles.jobs_section}>
      <div className={styles.jobs_container}>
        <h2 className={styles.section_title}>Việc làm dành cho bạn</h2>
        {user ? (
          <div className={styles.jobs_grid}>{listJobs && <ListJobs listJobs={listJobs} />}</div>
        ) : (
          <div className={styles.section_title}>
            Hãy đăng nhập để có thể thấy được danh sách công việc phù hợp với bạn
          </div>
        )}
      </div>
    </section>
  );
};
export default JobForYou;
