import { ReactComponent as Graph0 } from '@assets/illusts/graph/graph_0.svg';
import { ReactComponent as Graph10 } from '@assets/illusts/graph/graph_10.svg';
import { ReactComponent as Graph20 } from '@assets/illusts/graph/graph_20.svg';
import { ReactComponent as Graph30 } from '@assets/illusts/graph/graph_30.svg';
import { ReactComponent as Graph40 } from '@assets/illusts/graph/graph_40.svg';
import { ReactComponent as Graph50 } from '@assets/illusts/graph/graph_50.svg';
import { ReactComponent as Graph60 } from '@assets/illusts/graph/graph_60.svg';
import { ReactComponent as Graph70 } from '@assets/illusts/graph/graph_70.svg';
import { ReactComponent as Graph80 } from '@assets/illusts/graph/graph_80.svg';
import { ReactComponent as Graph90 } from '@assets/illusts/graph/graph_90.svg';
import { ReactComponent as Graph100 } from '@assets/illusts/graph/graph_100.svg';
import { TPercent } from '@lib/types/kid';

function renderGraph(percent: TPercent) {
  if (percent === 0) {
    return <Graph0 />;
  } else if (percent === 10) {
    return <Graph10 />;
  } else if (percent === 20) {
    return <Graph20 />;
  } else if (percent === 30) {
    return <Graph30 />;
  } else if (percent === 40) {
    return <Graph40 />;
  } else if (percent === 50) {
    return <Graph50 />;
  } else if (percent === 60) {
    return <Graph60 />;
  } else if (percent === 70) {
    return <Graph70 />;
  } else if (percent === 80) {
    return <Graph80 />;
  } else if (percent === 90) {
    return <Graph90 />;
  } else if (percent === 100) {
    return <Graph100 />;
  }
}

export default renderGraph;
