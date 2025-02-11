import { setPage, setSorting, setFilter, userTableDisplayer, setDefaultView } from './customerSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ChangeEvent, useEffect } from 'react';
import { fetchCustomers } from './customerAPI';
import classes from './CustomersDashboard.module.css';
import { MdDelete } from "react-icons/md";
import TextFilter from '../../Components/TextField/TextField';
import { getNestedValue, isFetchBaseQueryError, renderFetchBaseQueryError, renderSerializedError } from '../../utils/utils';
import Pagination from '../../Components/Pagination/Pagination';
import Sort from '../../Components/Sorting/Sort';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import LoadingOverlay from '../../Components/Loading/LoadingOverlay';
import { selectCustomers, selectFilteredCustomers, selectSortedCustomers } from './Selectors/customerSelectors';
import { useRemoveCustomersMutation } from '../api/customerApiSlice';
import { Customer, Status } from './customer.types';

type InputEvent = ChangeEvent<HTMLInputElement>;

function CustomersDashboard() {
    const [removeCustomers, {
        data:removedCustomer,
        isLoading,
        isError:isMutationError,
        error:mutationErrors
    }] = useRemoveCustomersMutation();
    const dispatch = useAppDispatch();

    const { paging, indicator, error, filter, sorting } = useAppSelector(selectCustomers);
    const filteredCustomers = useAppSelector(selectFilteredCustomers);
    const orderedCustomers = useAppSelector(selectSortedCustomers);
    
    // Paging precalculate value 
    const startIndex = (paging.currentPage - 1) * paging.pageSize;
    const endIndex = paging.currentPage * paging.pageSize;
    const limitedCustomers = orderedCustomers.slice(startIndex, endIndex); 

    const handleDelete = async (id: string) => {
        const userConfirmed = confirm('Are you sure you want to delete this item?');
        if (userConfirmed) {
            await removeCustomers(id);
        }
    };

    function assignValue(field: string) {
        return field === filter.name ? filter.term : "";
    }

    function handleRetry() {
        dispatch(fetchCustomers(''));
    }

    useEffect(()=>{
        if(removedCustomer)
            dispatch(fetchCustomers(''));
    },[dispatch,removedCustomer])

    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, filter, sorting]);

    useEffect(() => {
        if(indicator === 'idle')
            dispatch(fetchCustomers(''));
    }, [dispatch,indicator]);

    if ((indicator === "failure" && error !== null)) {
        return <ErrorPage message={error} onRetry={handleRetry} />;
    }

    return (
        <>
            {indicator === "loading" && <LoadingOverlay/>}
            <table className={classes.table}>
                <thead>
                    <tr className={classes.header}>
                        {Object.keys(userTableDisplayer).map((key) => {
                            const columnKey = userTableDisplayer[key as keyof typeof userTableDisplayer];
                            return (
                                <th key={key} className={classes.headcell}>
                                    <TextFilter
                                        value={assignValue(columnKey)}
                                        onChange={(e: InputEvent) => dispatch(setFilter({ name: columnKey, term: e.target.value }))}
                                    />
                                    <Sort
                                        highlight={sorting.name === columnKey ? sorting.isASC : null}
                                        handleSort={(isASC: boolean) => dispatch(setSorting({ name: columnKey, isASC }))}
                                    />
                                </th>
                            );
                        })}
                        <th className={classes.headcell}>
                            <div onClick={()=> dispatch(setDefaultView())} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Reset Filter
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {limitedCustomers.map((customerDetail: Customer) => { 
                        return (
                            <tr key={customerDetail.id}>
                                {
                                    Object.keys(userTableDisplayer).map((key) => {
                                        const columnKey = userTableDisplayer[key as keyof typeof userTableDisplayer];
                                        const data =  getNestedValue<Customer>(customerDetail,columnKey)
                                        return <td key={key} className={classes.datacell}>
                                                    {typeof data === "string" && data}
                                                </td>
                                    })
                                }
                                <td className={classes.datacell}>
                                    {
                                        customerDetail.accountDetails.status === Status[Status.Active] &&
                                        <button 
                                            aria-label='Remove Button' 
                                            style={{background:"white"}} 
                                            title='Remove' 
                                            disabled={isLoading} 
                                            onClick={() => handleDelete(customerDetail.id)}>
                                                <MdDelete 
                                                    color='#009879' />
                                        </button>
                                    }
                                </td>
                            </tr>
                    )})}
                </tbody>
            </table>
            <Pagination
                totalItems={filteredCustomers.length}
                itemsPerPage={paging.pageSize}
                currentPage={paging.currentPage}
                onPageChange={(page: number) => dispatch(setPage(page))}
            />
            { isMutationError && <ErrorPage message={isFetchBaseQueryError(mutationErrors) ? renderFetchBaseQueryError(mutationErrors) : renderSerializedError(mutationErrors)} onRetry={handleRetry} />}
            </>
    );
}

export default CustomersDashboard;
