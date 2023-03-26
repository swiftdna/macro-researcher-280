import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import sensor_data from '../data/sensor_data_fmtd.json';
// import countries from '../data/countries.json';
import RangeSlider from 'rsuite/RangeSlider';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

function TimeSeries() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [pageIdentifier, setPageIdentifier] = useState("");
    const [data, setData] = useState([]);
    const [range, setRange] = useState([1960, 2021]);
    let { pageID } = useParams();
    const master_data = {
        sensor_data
    };
    const pgmapping = {
        'sensors': 'sensor_data',
    };

    const reset = () => {
        setPageIdentifier(pageID);
        setRange([]);
    };

    useEffect(() => {
        reset();
        console.log('setting')
        setData(master_data[pageID])
    }, [pageID]);

    useEffect(() => {
        reset();
    }, [pageIdentifier]);

    useEffect(() => {
        const [start, end] = range;
        let src_name = pgmapping[pageIdentifier];
        let tmp_data = [];
        let filtered_data = [];
        if (!src_name) {
            return;
        }
        tmp_data = master_data[src_name];
        if (start && end) {
            filtered_data = tmp_data.filter((td, indx) => {
                const [yr] = td;
                if (indx === 0) {
                    return true;
                }
                if (typeof yr !== 'DateTime' && (new Date(yr).getDate() >= start+6 && new Date(yr).getDate() <= end+6)) {
                    return true;
                }
                return false;
            });
        }
        if (filtered_data.length) {
            setData(filtered_data);
        }
    }, [range]);

    const sliderChanged = (val) => {
        setRange(val);
        // const [start, end] = val;
        // console.log(start, end);
    }

    return(
        <div>
            <Row>
                <Col md="3">
                </Col>
                <Col md="6">
                    <RangeSlider min={1} max={3} value={range} defaultValue={[1, 3]} onChange={sliderChanged} style={{marginTop: '15px'}} />
                </Col>
                <Col md="3">
                </Col>
            </Row>
            
            {range.length ? <p style={{marginTop: '50px', marginBottom: '50px'}}>Showing {pageIdentifier} data. Day range - {range.join(' to ')}</p> : <p>Welcome to {pageID}. Please select a year range.</p>}
            {range.length ? <Chart
              chartType="LineChart"
              data={data}
              width="100%"
              height="400px"
              legendToggle
            /> : ''}
        </div>
    )
}

export default TimeSeries;