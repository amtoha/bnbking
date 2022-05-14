import { toast } from 'wc-toast';

export const errorMsg = (msg) => {
  toast.error(msg);
};

export const success = (msg) => {
  toast.success(msg, {duration: 4000});
};

export const loading = (msg) => {
  toast.loading(msg, { duration: 4000 });
};
export const normal = (msg) => {
  toast(msg);
};

export const promise = () => {
  toast.promise(
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if ((Math.random(10) * 10) % 2 === 0) {
          resolve('foo');
        } else {
          reject('bar');
        }
      }, 2500);
    }),
    {
      loading: 'Authenticating...',
      success: 'Authentication success!',
      error: 'Authentication failed!',
    }
  );
};
