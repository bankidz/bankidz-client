import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { ReactElement, useEffect } from 'react';
import { INotificationDTO } from '@lib/apis/notification/notification.dto';
import useNotificationApi from '@lib/apis/notification/useNotificationApi';
import queryKeys from '@lib/constants/queryKeys';

const useGetNotifications = () => {
  const { getNotification } = useNotificationApi();
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    INotificationDTO,
    unknown
  >(queryKeys.NOTIFICATION, getNotification, {
    getNextPageParam: (lastPage) => lastPage.lastId,
    //refetchInterval: 5000,
  });

  const Observation = (): ReactElement => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;
      console.log(isLast);
      if (!isLast && inView) fetchNextPage();
    }, [inView]);

    return (
      <div className="infiniteObserve" ref={ref} style={{ height: '20px' }} />
    );
  };

  return { data, fetchNextPage, isFetchingNextPage, Observation };
};

export default useGetNotifications;
