import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
// import RadioButtonsAvailability from './radioAvailability.js';
import FinalNote from '../uploadImages/notes/finalNote.js';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
// import { rows } from '../calls/rows.js';
import axios from 'axios';
// import rows from '../calls/rows.json';
import { useEffect, useState } from "react";
import '../../styleSheets/callsTable.css';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#00743e",
      color: theme.palette.common.white,
      fontSize: 20,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 10,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState("");
  const [notes, setNotes] = useState("");

  

  const handleSubmit = e => {
    e.preventDefault();
    setStatus(e.target.value);
    console.log(status);
  }


  const handleSubmit2 = e => {
    e.preventDefault();
    setNotes(e.target.value);
    console.log(notes);
    
  }


  const time = null;
  const current = null;
  const date = null;
  const final = null;
  const [status_time, setDate] = useState(""); 
  const handleTime = () => {
    let current = new Date();
    let date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    let time = current.toLocaleTimeString();
    setDate(time + " on " + date);
  }

  // const current = new Date();
  // const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  // let time = current.toLocaleTimeString();

  // to select button based on selection
  // value = {row.status}

  function changeBackground1(e) {
    e.target.style.background = "#72bc44";
  }

  function changeBackground2(e) {
    e.target.style.background = "#00743e";
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell 
            component="th"
            scope="row"
            style={{fontSize: "17px"}}>
          <span style={{fontWeight: "bold", fontSize: "20px"}}> 
            {row.firstname + " " + row.lastname} 
          </span> <br /> 
          <a href={"tel:" + row.number}>{row.number}</a>
          <br /> Preferred Language: {row.language}
          <br /> Most Recent Status: <span style={{fontWeight: "bold"}} 
            >
            {row.status}
          </span>
          <br /> Notes: {row.calls_notes} 
          <br /> Status Last Changed: {row.status_time}
          
        </TableCell>        
        <TableCell>  
          <form noValidate method = "post" action="http://127.0.0.1:5000/calls">
            <input type="hidden" name="id" value={row.id} />
            <input type="hidden" name="status_time" value={status_time} />
            <FormControl>
            <FormLabel id="radio-buttons-availability">Please mark participant availability: </FormLabel>
            <RadioGroup
              aria-labelledby="radio-buttons-availability"
              name="radio-buttons-group"
              defaultValue = "No Response"
              >
              <FormControlLabel name = 'status' control={<Radio />} value="Available" label="Available" />
              <FormControlLabel name = 'status' control={<Radio />} value="No Response" label="No Response" />
              <FormControlLabel name = 'status' control={<Radio />} value="Not Available" label="Not Available" />
            </RadioGroup>
            
            
        <Button className="submitCall"
            style={{backgroundColor: "#00743e"}}
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={handleSubmit}
            onClick={handleTime}
            onMouseOver={changeBackground1}
            onMouseOut={changeBackground2}
            >
            Submit
        </Button>
        </FormControl>
        </form>

          {/* <form 
          method = "post" action="http://127.0.0.1:5000/calls">
            <input type="hidden" name="id" value={row.id} />
            <p>Enter participant's availability</p>
            <div class="form-group">
              <input class="form-control" type="text" name="status" placeholder="status" />
            </div>
            <div class="form-group">
              <button 
                class="btn btn-primary"
                onSubmit={handleSubmit}>Submit</button>
            </div>
          </form> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Participant Notes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <form noValidate method = "post" action="http://127.0.0.1:5000/calls/notes">
                        <input type="hidden" name="id" value={row.id} />
                        <input type= "text" name="notes" placeholder="Enter notes here..." />
                      <Button
                          style={{backgroundColor: "#00743e"}}
                          type="submit"
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          onSubmit={handleSubmit2}
                          >
                          Submit
                      </Button>
                      <form noValidate method = "post" action="http://127.0.0.1:5000/calls/deletenotes">
                        <input type="hidden" name="id" value={row.id} />
                        <Button
                            name = "delete"
                            style={{backgroundColor: "#fc2848"}}
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onSubmit={handleSubmit2}
                            >
                            DELETE NOTE HISTORY
                        </Button>                        
                      </form>

                    </form>
                    <h3>{row.calls_notes}</h3>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={row.id}>
                      <TableCell></TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.number.isRequired,
    number: PropTypes.number.isRequired,
    address: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {

  // const [rows, setRows] = useState([])

  // useEffect(() => {
  //   fetch('http://127.0.0.1:5000/calls', {
  //     'methods':'GET',
  //     headers: {
  //       'Content-Type':'application/json'
  //     }
  //   })
  //   .then(resp => resp.json())
  //   .then(resp => setRows(resp))
  //   .catch(error => console.log(error))

  // },[])

  // axios!
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios
    .get('http://127.0.0.1:5000/calls')
    .then((res) => {console.log(res)
       setRows(res.data)})
    .catch((err) => {console.log(err)
    })
    }, [])

  return (
    <TableContainer 
        component={Paper}
        style={{paddingBottom: '100px'}}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <StyledTableCell />
            <StyledTableCell>Participant Information</StyledTableCell>
            <StyledTableCell>Participant Availability</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.id} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

  