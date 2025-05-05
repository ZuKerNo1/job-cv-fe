import { ROLE_USER, STATUS } from './constants';
import dayjs from 'dayjs';
const capitalizeFirstLetter = (val) => {
  if (!val) return '';
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`;
};

const generatePlaceholderCard = (column) => {
  return {
    _id: `${column._id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  };
};

export const interceptorLoadingElements = (calling) => {
  // DOM lấy ra toàn bộ phần tử trên page hiện tại có className là 'interceptor-loading'
  const elements = document.querySelectorAll('.interceptor-loading');
  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      elements[i].style.opacity = '0.5';
      elements[i].style.pointerEvents = 'none';
    } else {
      elements[i].style.opacity = 'initial';
      elements[i].style.pointerEvents = 'initial';
    }
  }
};
export const roleName = (role) => {
  if (role === ROLE_USER.ADMIN) {
    return 'Admin';
  } else if (role === ROLE_USER.JOB_SEEKER) {
    return 'Người tìm việc';
  } else if (role === ROLE_USER.INTERVIEER) {
    return 'Người phỏng vấn';
  }
  return 'Nhà tuyển dụng';
};

export const statusName = (status) => {
  if (status === STATUS.ACTIVE) return 'Hoạt động';
  else if (status === STATUS.INACTIVE) return 'Ngừng hoạt động';
  else if (status === STATUS.PENDING) return 'Chờ phê duyệt';
  else if (status === STATUS.ACCEPT) return 'Phê duyệt';
  return 'Từ chối';
};
export const convertDate = (date) => {
  return dayjs(date).format('MMM DD YYYY');
};
export const convertDateTime = (dateTime) => {
  return dayjs(dateTime).format('MMM DD YYYY HH:mm A');
};
export const convertTime = (dateTime) => {
  return dayjs(dateTime).format('HH:mm');
};
export { capitalizeFirstLetter, generatePlaceholderCard };
