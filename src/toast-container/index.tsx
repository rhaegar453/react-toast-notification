/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { css } from '@emotion/css';
import { nanoid } from 'nanoid';
import React, { useEffect, useMemo, useState } from 'react';
import ToastItem from '../toastItem';
import toastData from './sample.json';

type ToastTypes = 'success' | 'error' | 'default' | 'show';

interface IToastTrigger {
  title: string;
  position?: ToastPositions;
  type: ToastTypes;
  duration: number;
}

type ToastPositions = 'bottom' | 'top';
interface IToast {
  id?: string;
  title: string;
  position?: ToastPositions;
}

interface IDispatchEvent {
  eventName: string;
  detail: any;
}

const styles = {
  topContainer: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0;
    right: 0;
    top:10px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    `,
  bottomContainer: css`
    position: absolute;
    display: flex;
    flex-direction: column;
    left: 0;
    right: 0;
    bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    `,
};

function ToastContainer() {
  const [toasts, setToasts] = useState<IToast[] | []>(toastData);

  const handleAddToast = ({
    title,
    position = 'bottom',
    duration,
  }: IToast & { duration: number }) => {
    const id = nanoid();
    setToasts((allToasts: IToast[]) => [{ title, id, position }, ...allToasts]);
    setTimeout(() => {
      setToasts((toasts: IToast[]) => toasts.filter((toast) => toast.id !== id));
    }, duration);
  };
  useEffect(() => {
    document.addEventListener('add_toast', (e:Event) => {
      const { title, position, duration } = e.detail;
      handleAddToast({ title, position, duration });
    });
    return () => {
      document.removeEventListener('add_toast', () => {});
    };
  }, []);

  const calculatePositions = (allToasts: IToast[]) => allToasts.reduce((a: any, c: IToast) => {
    if (a[`${c.position}`]) {
      return { ...a, [`${c.position}`]: [...a[`${c.position}`], c] };
    }
    return { ...a, [`${c.position}`]: [c] };
  }, {});

  const positions = useMemo(() => calculatePositions(toasts), [toasts]);
  return (
    <div>
      <div className={styles.topContainer}>
        {positions.top
        && positions.top.map((item: IToast) => (
          <ToastItem key={item.id}>{item.title}</ToastItem>
        ))}
      </div>
      <div className={styles.bottomContainer}>
        {positions.bottom
        && positions.bottom.map((item: IToast) => (
          <ToastItem key={item.id}>{item.title}</ToastItem>
        ))}
      </div>
    </div>
  );
}

const dispatchEvent = ({ eventName, detail }: IDispatchEvent) => {
  const event = new CustomEvent(eventName, { detail });
  document.dispatchEvent(event);
};

export const toast: Record<ToastTypes, (data: IToastTrigger) => void> = {
  success: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title,
        position,
        duration,
        type: 'success',
      },
    });
  },
  error: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title,
        position,
        duration,
        type: 'error',
      },
    });
  },
  default: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title,
        position,
        duration,
        type: 'default',
      },
    });
  },
  show: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title,
        position,
        type: 'default',
        duration,
      },
    });
  },
};

export default ToastContainer;
