/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { nanoid } from 'nanoid';
import React, { useEffect, useMemo, useState } from 'react';
import ToastItem from '../toastItem';
import toastData from './sample.json';

type ToastTypes = 'success' | 'error' | 'default' | 'show';

interface IToastTrigger {
  title: string;
  position?: ToastPositions;
  type: ToastTypes;
  duration:number;
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

const ToastContainerBase = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  text-align: center;
`;

const styles = {
  wrapper: css`
    position: absolute;
    width: 100%;
    `,
};

function ToastContainer() {
  const [toasts, setToasts] = useState<IToast[] | []>(toastData);

  const handleAddToast = ({ title, position = 'bottom', duration }: IToast&{duration:number}) => {
    const id = nanoid();
    setToasts((allToasts: IToast[]) => [{ title, id, position }, ...allToasts]);
    setTimeout(() => {
      setToasts((toasts:IToast[]) => toasts.filter((toast) => toast.id !== id));
    }, duration);
  };
  useEffect(() => {
    document.addEventListener('add_toast', (e) => {
      handleAddToast(e.detail);
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

  const positions = useMemo(() => calculatePositions(toasts), []);
  return (
    <ToastContainerBase>
      <Container className={styles.wrapper} style={{ bottom: '10px' }}>
        <Container>
          {positions.bottom
          && positions.bottom.map((item: IToast) => (
            <div>
              <ToastItem key={item.id}>{item.title}</ToastItem>
            </div>
          ))}
        </Container>
      </Container>
      <Container className={styles.wrapper} style={{ top: '10px' }}>
        <Container>
          {positions.top
          && positions.top.map((item: IToast) => (
            <div>
              <ToastItem key={item.id}>{item.title}</ToastItem>
            </div>
          ))}
        </Container>
      </Container>
    </ToastContainerBase>
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
        title, position, duration, type: 'success',
      },
    });
  },
  error: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title, position, duration, type: 'error',
      },
    });
  },
  default: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title, position, duration, type: 'default',
      },
    });
  },
  show: ({ title, position, duration = 200 }) => {
    dispatchEvent({
      eventName: 'add_toast',
      detail: {
        title, position, type: 'default', duration,
      },
    });
  },
};

export default ToastContainer;
