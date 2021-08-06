import React, { useState } from 'react';

const Timeline = () => {
  const { songData } = useSongData();
  const [chartConfig, setChartConfig] = useState({
    width: '100%',
    height: '350px',
    chartType: 'Timeline',
    loader : '<div>Loading Chart</div>',
    data: songData, 
    rootProps: { 'data-testid': '5' },
  });
}

export default Timeline;
