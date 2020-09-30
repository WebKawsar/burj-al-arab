import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';




const Book = () => {

    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date()
    });

    const handleCheckIn = (date) => {
        const newDate = {...selectedDate};
        newDate.checkIn = date;
      setSelectedDate(newDate);
    };

    const handleCheckOut = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOut = date;
      setSelectedDate(newDate);
    };
  
    const handleBooking = () => {

        const newBooking = {...loggedInUser, ...selectedDate};
        fetch("http://localhost:8080/addBooking", {
            method: "POST",
            body: JSON.stringify(newBooking),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            }
        })
        .then(response => response.json())
        .then(result => {
            console.log(result);
        })
    }

    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello {loggedInUser.name}, Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>


            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Check in date"
                    value={selectedDate.checkIn}
                    onChange={handleCheckIn}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Check out date"
                    format="MM/dd/yyyy"
                    value={selectedDate.checkOut}
                    onChange={handleCheckOut}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="secondary">Book Now</Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;