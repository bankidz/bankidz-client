import { TPercent } from '@lib/types/TPercent';
import renderGraph from '@lib/utils/render/renderGraph';
import { IDongil } from '@lib/types/IDongil';

interface DetailOverViewProps
  extends Pick<IDongil, 'successWeeks' | 'weeks' | 'progressList' | 'title'> {}

function DetailOverView({
  successWeeks,
  weeks,
  progressList,
  title,
}: DetailOverViewProps) {
  const percent = Math.ceil((successWeeks / weeks / 10) * 100) * 10;

  return (
    <>
      <div className="graph">{renderGraph(percent as TPercent)}</div>
      <span className="challenging">{progressList?.length}주차 도전중</span>
      <span className="title">{title}</span>
    </>
  );
}

export default DetailOverView;
