import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import styles from '../../styles/Table.module.css';
import { convertDateTime } from '../../utils/formatters';
import { getListReviewsAPI } from '../../apis';
import { Link } from 'react-router-dom';
const ReviewManage = () => {
  const [listReview, setListReview] = useState(null);
  useEffect(() => {
    getListReviewsAPI().then((data) => {
      setListReview(data);
    });
  }, []);
  return (
    <Box>
      <Header title={'Danh sách ứng viên được đánh giá'} />
      {listReview && (
        <div className={styles.data_section}>
          <div className={styles.section_header}>
            <h3 className={styles.section_title}>{''}</h3>
          </div>
          <table className={styles.data_table}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Email</th>
                <th>Ngày tạo</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {listReview.map((review, index) => (
                <tr key={review._id}>
                  <td>{index + 1}</td>
                  <td>{review.jobSeekerInfo.email}</td>
                  <td>{convertDateTime(review.createdAt)}</td>
                  <td>
                    <Link to={`/interviewer/reviews/details/${review._id}`}>
                      <button className={styles.btn_action + ' ' + styles.btn_view}>
                        <i className="fas fa-eye" /> xem chi tiết
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Box>
  );
};
export default ReviewManage;
