import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import { Chart } from "react-google-charts";
import walnut_prd_area from '../data/mangos_philly_prd_area.json';
import walnut_prd_yld from '../data/mangos_philly_prd_yld.json';
import countries from '../data/countries.json';
import RangeSlider from 'rsuite/RangeSlider';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

function YieldMangos() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [pageIdentifier, setPageIdentifier] = useState("");
    const [data1, setData1] = useState([]);
    const [data2, setData2] = useState([]);
    const [range, setRange] = useState([1960, 2021]);
    let { pageID } = useParams();
    const master_data = {
        walnut_prd_area,
        walnut_prd_yld
    };
    const pgmapping1 = {
        'mangos': 'walnut_prd_area',
    };
    const pgmapping2 = {
        'mangos': 'walnut_prd_yld',
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
        let src1_name = pgmapping1[pageIdentifier];
        let tmp_data1 = [];
        let filtered_data1 = [];
        if (!src1_name) {
            return;
        }
        tmp_data1 = master_data[src1_name];
        if (start && end) {
            filtered_data1 = tmp_data1.filter(td => {
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
        if (filtered_data1.length) {
            setData1(filtered_data1);
        }

        let src2_name = pgmapping2[pageIdentifier];
        let tmp_data2 = [];
        let filtered_data2 = [];
        if (!src2_name) {
            return;
        }
        tmp_data2 = master_data[src2_name];
        if (start && end) {
            filtered_data2 = tmp_data2.filter(td => {
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
        if (filtered_data2.length) {
            setData2(filtered_data2);
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

    const options1 = {
      chart: {
        title: "Mango Year vs Production and Area Harvested in Phillipines",
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

    const options2 = {
      chart: {
        title: "Mango Year vs Yield and Area Harvested in Phillipines",
      },
      width: 900,
      height: 500,
      series: {
        // Gives each series an axis name that matches the Y-axis below.
        0: { axis: "Yield" },
        1: { axis: "Area Harvested" },
      },
      axes: {
        // Adds labels to each axis; they don't have to match the axis names.
        y: {
          Temps: { label: "Yield" },
          Daylight: { label: "Area Harvested" },
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
              data={data1}
              options={options1}
              width="100%"
              height="400px"
              legendToggle
            /> : ''}
            <p style={{marginTop:'100px'}}></p>
            {range.length ? <Chart
              chartType="Line"
              data={data2}
              options={options2}
              width="100%"
              height="400px"
              legendToggle
            /> : ''}
        </div>
    )
}

export default YieldMangos;