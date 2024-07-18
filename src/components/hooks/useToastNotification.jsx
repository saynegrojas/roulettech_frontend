import { toast } from 'react-toastify';

const useToastNotification = () => {
  const toastNotification = (message, statusType) => {
    toast[statusType](message, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      theme: 'light',
    });
  };

  return { toastNotification };
};

export default useToastNotification;
