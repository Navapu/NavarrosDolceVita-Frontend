import { useParams } from 'react-router';
export const OrderDetails = () => {
    const { id } = useParams();
    return(
        <h1>{id}</h1>
    )
}