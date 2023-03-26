import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import agri_credit from '../data/agri_credit_fmtd.json';
import { Chart } from "react-google-charts";

function AgriCredit() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const tmp_data = [...agri_credit];
        setData(tmp_data);
        console.log(tmp_data);
    }, []);

    return(
        <div>
            <p style={{marginTop: '50px', marginBottom: '50px'}}>Showing Agriculture Credit data</p>
            <Chart
              chartType="Bar"
              width="100%"
              height="800px"
              data={data}
            />
        </div>
    )
}

export default AgriCredit;