import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';
import { ReactElement, useEffect } from 'react';
import { INotificationDTO } from '@lib/apis/notification/notificationDTO';
import queryKeys from '@lib/constants/queryKeys';
import notificationAPI from '@lib/apis/notification/notificationAPI';

const useInfiniteNotificationQuery = () => {
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery<
    INotificationDTO,
    unknown
  >(queryKeys.NOTIFICATION, notificationAPI.getNotification, {
    getNextPageParam: (lastPage) => lastPage.lastId,
    //refetchInterval: 5000,
  });

  const Observation = (): ReactElement => {
    const [ref, inView] = useInView();

    useEffect(() => {
      if (!data) return;

      const pageLastIdx = data.pages.length - 1;
      const isLast = data?.pages[pageLastIdx].isLast;
      if (!isLast && inView) fetchNextPage();
    }, [inView]);

    return (
      <div className="infiniteObserve" ref={ref} style={{ height: '20px' }} />
    );
  };

  return { data, status, fetchNextPage, isFetchingNextPage, Observation };
};

export default useInfiniteNotificationQuery;
