import "../CSS/landing.css"
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { pluck } from 'underscore';
import {   Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRedirectionPath } from '../actions/app-actions'
import { RiSettingsLine, RiListUnordered } from 'react-icons/ri';
import { TbReportAnalytics } from 'react-icons/tb';
import { FaUser } from 'react-icons/fa';
import {BiUserCircle} from 'react-icons/bi';
import { GrContact } from 'react-icons/gr';
import { GiDeliveryDrone } from 'react-icons/gi';
import MyBookings from './MyBookings';
import YieldWalnuts from './YieldWalnuts';
import YieldMangos from './YieldMangos';
import CropMangos from "./CropMangos";
import CropBananas from "./CropBananas"
import CropWalnuts from "./CropWalnuts"
import TimeSeries from './TimeSeries';
import ImportWheat from './ImportWheat';
import AgriCredit from './AgriCredit';
import { Row, Col, Form } from 'react-bootstrap';
import { TbDrone } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import {Tree} from 'react-arborist';

function Node({ node, style, dragHandle }) {
  /* This node instance can do many things. See the API reference. */
  return (
    <div style={{...style, textAlign: 'left'}} ref={dragHandle} onClick={() => node.toggle()}>
      <span style={{backgroundColor: node.isSelected ? '#DEDEDE' : '', padding: '6px 12px', borderRadius: '5px'}}>{node.isLeaf ? "- " : (node.isOpen ? "▼ " : "➤ ") }{node.data.name}</span>
    </div>
  );
}

//create the Navbar Component
function LandingPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userLandedPage = useLocation();
 
    useEffect(() => {
    }, []);

    const home = () => {
        navigate('/');
    }

    const navMapping = {
        'm1': 'macro-gdp',
        'm2': 'macro-fdi-inflow',
        'm3': 'macro-fdi-outflow',
        'a1': 'agri-gdp',
        'a2': 'bar/agri-credit',
        'a3': 'agri-fertilizers',
        'a4': 'agri-fertilizers-prod',
        'd1': 'debt-reserves',
        'd2': 'debt-gni',
        'd3': 'debt-total-debt',
        'c1': 'crops/bananas',
        'c2': 'crops/mangos',
        'c3': 'crops/walnuts',
        'y1': 'yield/walnuts',
        'y2': 'yieldm/mangos',
        '6': 'imports',
        '7': 'timeseries/sensors',
    };

    const data = [
      { id: "1", name: "Macroeconomic (USD)" ,
        children: [
            { id: "m1", name: "GDP(USD)" },
            { id: "m2", name: "FDI Inflow(USD)" },
            { id: "m3", name: "FDI Outflows(USD)" },
        ] 
      },
      { id: "2", name: "Agriculture",
        children: [
            { id: "a1", name: "Contribution of Agri(% GDP)" },
            { id: "a2", name: "Credit" },
            { id: "a3", name: "Fertilizers" },
            { id: "a4", name: "Fertilizers PROD" },
        ]  },
      {
        id: "3",
        name: "Debt Services",
        children: [
          { id: "d1", name: "Reserves" },
          { id: "d2", name: "GNI" },
          { id: "d3", name: "Total Debt(%)" },
        ],
      },
      {
        id: "4",
        name: "Crops",
        children: [
          { id: "c1", name: "bananas" },
          { id: "c2", name: "mangos" },
          { id: "c3", name: "walnuts" },
        ],
      },
      {
        id: "5",
        name: "Yield",
        children: [
          { id: "y1", name: "Walnuts" },
          { id: "y2", name: "Mangos" },
        ],
      },
      {
        id: "6",
        name: "Imports"
      },
      {
        id: "7",
        name: "Sensors"
      }
    ];

    const clicked =  (e) => {
        console.log('click', e.target.value);
    }

    const onMove = ({ dragIds, parentId, index }) => {
        // console.log(dragIds, parentId, index);
        const [id] = dragIds;
        console.log(id, navMapping[id]);
        if (navMapping[id]) {
            navigate(`/view/${navMapping[id]}`);
        }
    };

    return(
        <div className="container main-frame fill-page">
            <Row style={{width: '100%'}}>
                <Col xs={3} className="text-center py-3 dc-default dc-leftpane">
                    {/*<h3 className="title"><RiSettingsLine size={40} style={{marginTop: '-5px'}} /> Dashboard</h3> */}
                    {
                        <Tree data={data}
                          openByDefault={true}
                          width={300}
                          height={1000}
                          indent={24}
                          rowHeight={36}
                          overscanCount={1}
                          paddingTop={30}
                          paddingBottom={10}
                          padding={25 /* sets both */}
                          onMove={onMove}
                          onClick={(e) => clicked(e)}
                        >
                            {Node}
                        </Tree>
                    }
                </Col>
                <Col xs={9} className="text-center py-3 dc-default content_panel">
                    <Routes>
                        <Route path="view">
                            <Route path="timeseries/:pageID" element={<TimeSeries />} />
                            <Route path="crops/mangos" element={<CropMangos />} />
                            <Route path="crops/bananas" element={<CropBananas />} />
                            <Route path="crops/walnuts" element={<CropWalnuts />} />
                            {/* <Route path="crop/:pageID" element={<CropMangos />} /> */}
                            <Route path="yield/:pageID" element={<YieldWalnuts />} />
                            <Route path="yieldm/:pageID" element={<YieldMangos />} />
                            <Route path="bar/agri-credit" element={<AgriCredit />} />
                            <Route path="imports" element={<ImportWheat />} />
                            <Route path=":pageID" element={<MyBookings />} />
                        </Route>
                    </Routes>
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage;