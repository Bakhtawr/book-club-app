import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
};

export default Toast;