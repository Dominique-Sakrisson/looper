import React, {useState, useEffect} from 'react'
import { Chart } from 'react-google-charts';

const ChallengeTrackPage = () => {
  return (<>
    <Chart 
      width={songListNotechart.width}
      height={songListNotechart.height}
      chartType={songListNotechart.chartType}
      loader={songListNotechart.loader}
      data={preSongData}
      rootProps={songListNotechart.rootProps}
    />
  </>
  );
};

export default ChallengeTrackPage;
