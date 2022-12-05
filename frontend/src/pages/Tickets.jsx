import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
// import TicketItem from "../components/TicketItem";
import { getTickets, reset } from "../features/tickets/ticketSlice";

const Tickets = () => {
    const { tickets, isLoading, isSuccess } = useSelector(
        (state) => state.tickets
    );

    const dispatch = useDispatch();

    useEffect(() => {});

    useEffect(() => {});

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <h1>Tickets</h1>
        </>
    );
};

export default Tickets;
