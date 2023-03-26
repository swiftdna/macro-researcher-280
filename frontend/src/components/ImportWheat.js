import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import wheat_data from '../data/wheat_arabia_fmtd.json';
import RangeSlider from 'rsuite/RangeSlider';
import { Chart } from "react-google-charts";

function CropMangos() {

    const [data, setData] = useState([]);
    const [range, setRange] = useState([1960, 2021]);

    // const ddata = [
    //     ["From", "To", "Weight"],
    //     ["A", "X", 5],
    //     ["A", "Y", 7],
    //     ["A", "Z", 6],
    //     ["B", "X", 2],
    //     ["B", "Y", 9],
    //     ["B", "Z", 4],
    // ];

    useEffect(() => {
        const [start, end] = range;
        let tmp_data = [];
        let filtered_data = [];
        tmp_data = [...wheat_data];
        if (start && end) {
            filtered_data = tmp_data.filter((td, indx) => {
                const [yr] = td;
                if (indx === 0) {
                    // td.shift();
                    return true;
                }
                if (typeof yr !== 'Year' && (yr >= start && yr <= end)) {
                    // td.shift();
                    return true;
                }
                return false;
            });
        }
        filtered_data = filtered_data.map(fd => {
            const fd_val = fd[1].split('-');
            if (fd_val.length < 2) {
                fd[1] = `${fd[1]} - ${fd[0]}`;
            }
            return fd.slice(1, fd.length + 1);
        });
        // console.log(filtered_data.length, filtered_data);
        if (filtered_data.length) {
            setData(filtered_data);
        }
    }, [range]);

    const sliderChanged = (val) => {
        setRange(val);
    }
    
    return(
        <div>
            <Row>
                <Col md="3">
                </Col>
                <Col md="6">
                    <RangeSlider min={1960} max={2021} value={range} defaultValue={[1960, 2021]} onChange={sliderChanged} style={{marginTop: '15px'}} />
                </Col>
                <Col md="3">
                </Col>
            </Row>
            
            {range.length ? <p style={{marginTop: '50px', marginBottom: '50px'}}>Showing data. Day range - {range.join(' to ')}</p> : <p>Please select a year range.</p>}
            {range.length ? <Chart
              chartType="Sankey"
              width="100%"
              height="800px"
              data={data}
            /> : ''}
        </div>
    )
}

export default CropMangos;