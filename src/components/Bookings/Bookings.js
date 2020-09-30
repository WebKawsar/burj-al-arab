import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {

        fetch("http://localhost:8080/bookings?email="+loggedInUser.email, {
            method: "GET",
            headers: {
                authorization: `Bearer ${sessionStorage.getItem("token")}`,
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setBookings(data))

    }, [])

    return (
        <div>
            <h3>You have : {bookings.length} bookings</h3>
            
            {
                bookings.map(book => <li key={book._id}>{book.name} from : {(new Date(book.checkIn)).toDateString("dd/MM/yyyy")} to : {(new Date(book.checkOut)).toDateString("dd/MM/yyyy")}</li>)
            }
            
        </div>
    );
};

export default Bookings;