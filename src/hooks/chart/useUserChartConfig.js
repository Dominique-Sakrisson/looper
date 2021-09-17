import React, {useState, useEffect} from 'react'
import { Chart } from 'react-google-charts';

function useUserChartConfig(songData) {
  const [chart, setChart] = useState({ 
    width: '100%', 
    height: '36.5rem', 
    chartType: 'Timeline', 
    loader: '<div>Loading Chart</div>', 
    data: songData, 
    rootProps: { 'data-testid': '5' },
  });
  

  useEffect(() => {
    setChart((prevChart) => {
      prevChart.data = songData;
      return prevChart;
    });
    return;
  }), [songData];

  return { chart };
}

export default useUserChartConfig;
