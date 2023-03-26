import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import walnut_prd_area from '../data/walnut_iran_prd_area.json';
import countries from '../data/countries.json';
import RangeSlider from 'rsuite/RangeSlider';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

function Yield() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [pageIdentifier, setPageIdentifier] = useState("");
    const [data, setData] = useState([]);
    const [range, setRange] = useState([1960, 2021]);
    let { pageID } = useParams();
    const master_data = {
        walnut_prd_area,
    };
    const pgmapping = {
        'walnuts': 'walnut_prd_area',
    };

    const reset = () => {
        setPageIdentifier(pageID);
        setRange([]);
    };

    useEffect(() => {
        reset();
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
            filtered_data = tmp_data.filter(td => {
                const [yr] = td;
                if (typeof yr === 'string') {
                    return true;
                }
                if (typeof yr === 'number' && (yr >= start && yr <= end)) {
                    return true;
                }
                return false;
            });
        }
        if (filtered_data.length) {
            setData(filtered_data);
        }
    }, [range]);
    
    const getCountryName = (code) => {
        // console.log(code);
        const ctyArr = countries.filter(ct => ct.code === code);
        // console.log(code);
        return ctyArr.length ? ctyArr[0].name : '';
    }

    const sliderChanged = (val) => {
        setRange(val);
        // const [start, end] = val;
        // console.log(start, end);
    }

    const options = {
      chart: {
        title: "Walnuts Year vs Production and Area Harvested in Iran",
      },
      width: 900,
      height: 500,
      series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "Area Harvested" },
        1: { axis: "Production" },
      },
      axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
          Temps: { label: "Area Harvested" },
          Daylight: { label: "Production" },
        },
      },
    };

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
            
            {range.length ? <p style={{marginTop: '50px', marginBottom: '50px'}}>Showing {pageIdentifier} data. Year range - {range.join(' to ')}</p> : <p>Welcome to {pageID}. Please select a year range.</p>}
            {range.length ? <Chart
              chartType="Line"
              data={data}
              options={options}
              width="100%"
              height="400px"
              legendToggle
            /> : ''}
        </div>
    )
}

export default Yield;