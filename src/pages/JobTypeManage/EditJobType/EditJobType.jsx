import { Box } from '@mui/material';
import Header from '../../../components/Header/Admin/Header';
import styles from '../../../styles/Table.module.css';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { editJobType, getDetailJobType } from '../../../apis';
import { toast } from 'react-toastify';

const EditJobType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchJobType = async () => {
      try {
        const data = await getDetailJobType(id);
        setFormData({
          name: data.name,
          description: data.description
        });
      } catch (error) {
        toast.error('Không thể tải thông tin loại công việc');
        navigate('/admin/job-types');
      }
    };

    fetchJobType();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
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
      await editJobType(id, formData);
      toast.success('Cập nhật thành công!');
      navigate('/admin/job-types');
    } catch (error) {
      setErrors({ submit: 'Không thể cập nhật loại công việc. Vui lòng thử lại.' });
    }
  };

  return (
    <Box>
      <Header title={'Chỉnh sửa loại công việc'} />
      <div className={styles.data_section}>
        <div className={styles.section_header}>
          <h3 className={styles.section_title}>Chỉnh sửa loại công việc</h3>
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </Box>
  );
};

export default EditJobType;
