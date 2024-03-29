import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { Chart } from "react-google-charts";
import dbt_rsv from '../data/dbt_reserves_fmtd.json';
import dbt_gni from '../data/dbt_gni_fmtd.json';
import dbt_total from '../data/dbt_total_fmtd.json';
import agri_gdp from '../data/agri_gdp_fmtd.json';
import agri_fert from '../data/agri_fert_fmtd.json';
// import agri_credit from '../data/agri_credit_fmtd.json';
import agri_fert_prod from '../data/agri_fert_prod_fmtd.json';
import gdp_growth from '../data/gdp_growth_fmtd.json';
import countries from '../data/countries.json';
import fdi_netinflow from '../data/fdi_netinflow.json';
import fdi_netoutflows from '../data/fdi_netoutflows.json';


import RangeSlider from 'rsuite/RangeSlider';
import 'rsuite/dist/rsuite.min.css'; // or 'rsuite/dist/rsuite.min.css'

function MyBookings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [country, setCountry] = useState("");
    const [pageIdentifier, setPageIdentifier] = useState("");
    const [data, setData] = useState([]);
    const [range, setRange] = useState([1960, 2021]);
    let { pageID } = useParams();
    const master_data = {
        fdi_netoutflows,
        fdi_netinflow,
        gdp_growth,
        dbt_rsv,
        dbt_gni,
        dbt_total,
        agri_gdp,
        agri_fert,
        // agri_credit,
        agri_fert_prod
    };
    const pgmapping = {
        'macro-fdi-outflow': 'fdi_netoutflows',
        'macro-fdi-inflow' : 'fdi_netinflow', //BX.KLT.DINV.WD.GD.ZS
        'macro-gdp': 'gdp_growth', // NY.GDP.MKTP.KD.ZG
        'debt-reserves': 'dbt_rsv', //FI.RES.TOTL.DT.ZS
        'debt-gni': 'dbt_gni', // DT.TDS.DECT.GN.ZS
        'debt-total-debt': 'dbt_total', // DT.TDS.DECT.GN.ZS
        'agri-gdp': 'agri_gdp', // NV.AGR.TOTL.ZS
        'agri-fertilizers': 'agri_fert', // AG.CON.FERT.ZS
        'agri-fertilizers-prod': 'agri_fert_prod', // AG.CON.FERT.PT.ZS
        // 'agri-credit': 'agri_credit'
    };

    const reset = () => {
        setPageIdentifier(pageID);
        setRange([]);
        setCountry("");
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
        if (country) {
            tmp_data = master_data[src_name][country];
        }
        if (!tmp_data) {
            return;
        }
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
    }, [country, range]);

    const readableDate = (date, short) => {
        if (short) {
            return moment(date).format('LT');    
        }
        return moment(date).format('lll');
    }
    
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

    return(
        <div>
            <Row>
                <Col md="9">
                    <RangeSlider min={1960} max={2021} value={range} defaultValue={[1960, 2021]} onChange={sliderChanged} style={{marginTop: '15px'}} />
                </Col>
                <Col md="3">
                <Form.Select aria-label="Default select example" value={country} onChange={(e) => setCountry(e.target.value)}>
                  <option>Select country</option>
                  {countries.map(ct => <option value={ct.code}>{ct.name}</option>)}
                </Form.Select>
                </Col>
            </Row>
            
            {country && range.length ? <p style={{marginTop: '50px'}}>Showing {pageIdentifier} data for {getCountryName(country)}. Year range - {range.join(' to ')}</p> : <p>Welcome to {pageID}. Please select a country and year range.</p>}
            {country && range.length ? <Chart
              chartType="LineChart" 
              data={data}
              width="100%"
              height="400px"
              legendToggle
            /> : ''}
        </div>
    )
}

export default MyBookings;