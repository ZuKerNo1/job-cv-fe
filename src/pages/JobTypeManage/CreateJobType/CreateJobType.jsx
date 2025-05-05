import { Box } from '@mui/material';
import Header from '../../../components/Header/Admin/Header';
import styles from '../../../styles/Table.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';

const CreateJobType = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Tên loại công việc không được để trống';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Mô tả không được để trống';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // TODO: Replace with actual API call
      // await createJobTypeAPI(formData);
      navigate('/admin/job-types');
    } catch (error) {
      console.error('Error creating job type:', error);
    }
  };

  return (
    <Box>
      <Header title={'Thêm loại công việc'} />
      <div className={styles.data_section}>
        <div className={styles.section_header}>
          <h3 className={styles.section_title}>Thêm loại công việc mới</h3>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.form_group}>
            <label htmlFor="name">Tên loại công việc:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? styles.error : ''}
            />
            {errors.name && <FieldErrorAlert message={errors.name} />}
          </div>

          <div className={styles.form_group}>
            <label htmlFor="description">Mô tả:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className={errors.description ? styles.error : ''}
            />
            {errors.description && <FieldErrorAlert message={errors.description} />}
          </div>

          <div className={styles.form_actions}>
            <button
              type="button"
              onClick={() => navigate('/admin/job-types')}
              className={styles.btn_cancel}
            >
              Hủy
            </button>
            <button type="submit" className={styles.btn_submit}>
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default CreateJobType;
