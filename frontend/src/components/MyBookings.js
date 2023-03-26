import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaRedo } from 'react-icons/fa';
import { Row, Col, Form, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
import { Chart } from "react-google-charts";
import dbt_rsv from '../data/dbt_reserves_fmtd.json';
import countries from '../data/countries.json';

function MyBookings() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLandedPage = useLocation();
    const [allbookingslist,setAllBookingsList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState("");
    const [data, setData] = useState([]);
    let { pageID } = useParams();
    const user_id = useSelector((store) => store.app.user.id);
    const username = useSelector((store) =>store.app.user.name);
    const imageurl = useSelector((store) =>store.app.user.imageurl);
    const debt_reserves = dbt_rsv;

    useEffect(() => {
        console.log('pageID - ', pageID);
        getBookingsData();
    }, []);

    useEffect(() => {
        setData(debt_reserves[country]);
    }, [country])

    const getBookingsData = () => {
        setLoading(true);
        axios.post(`/api/userbookings`,{
            id: user_id
        })
        .then(response => {
            setLoading(false);
            // console.log('records -> ', response.data.data);
            setAllBookingsList(response.data.data)
        });
    };

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

    return(
        <div>
            <Row>
                <Col md="9">
                </Col>
                <Col md="3">
                    <Form.Select aria-label="Default select example" onChange={(e) => setCountry(e.target.value)}>
                      <option>Select country</option>
                      {countries.map(ct => <option value={ct.code}>{ct.name}</option>)}
                    </Form.Select>
                </Col>
            </Row>
            {country ? <p style={{marginTop: '50px'}}>Showing {pageID} data for {getCountryName(country)}</p> : <p>Welcome to {pageID}</p>}
            {country ? <Chart
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