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
import React from 'react';

function renderGraph(percent: TPercent) {
  const map = new Map<TPercent, React.ReactElement>();
  map.set(0, <Graph0 />);
  map.set(10, <Graph10 />);
  map.set(20, <Graph20 />);
  map.set(30, <Graph30 />);
  map.set(40, <Graph40 />);
  map.set(50, <Graph50 />);
  map.set(60, <Graph60 />);
  map.set(70, <Graph70 />);
  map.set(80, <Graph80 />);
  map.set(90, <Graph90 />);
  map.set(100, <Graph100 />);
  return map.get(percent);
}

export default renderGraph;
