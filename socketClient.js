import { io } from 'socket.io-client';
import { API_ROOT_SOCKET } from './src/utils/constants';
export const socketIoInstance = io(API_ROOT_SOCKET);
