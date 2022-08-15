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
import { TPercent } from '@lib/types/TPercent';

function renderGraph(percent: TPercent) {
  let graph;
  if (percent === 0) {
    graph = <Graph0 />;
  } else if (percent === 10) {
    graph = <Graph10 />;
  } else if (percent === 20) {
    graph = <Graph20 />;
  } else if (percent === 30) {
    graph = <Graph30 />;
  } else if (percent === 40) {
    graph = <Graph40 />;
  } else if (percent === 50) {
    graph = <Graph50 />;
  } else if (percent === 60) {
    graph = <Graph60 />;
  } else if (percent === 70) {
    graph = <Graph70 />;
  } else if (percent === 80) {
    graph = <Graph80 />;
  } else if (percent === 90) {
    graph = <Graph90 />;
  } else if (percent === 100) {
    graph = <Graph100 />;
  }
  return graph;
}

export default renderGraph;
