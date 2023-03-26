import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from "react-google-charts";

function CropMangos() {

    const data = [
        ["From", "To", "Weight"],
        ["A", "X", 5],
        ["A", "Y", 7],
        ["A", "Z", 6],
        ["B", "X", 2],
        ["B", "Y", 9],
        ["B", "Z", 4],
    ];
    
    return(
        <div>
            <Chart
                  chartType="Sankey"
                  width="40%"
                  height="200px"
                  data={data}
                />
        </div>
    )
}

export default CropMangos;