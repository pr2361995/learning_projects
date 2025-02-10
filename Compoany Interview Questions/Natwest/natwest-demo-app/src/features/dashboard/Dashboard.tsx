import { Customer, setPage, selectCustomers, userTableDisplayer } from './customerSlice';
import { useAppDispatch, useAppSelector } from '../../app/store/hooks';
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchCustomers, removeCustomers } from './customerAPI';
import classes from './Dashboard.module.css';
import { MdDelete } from "react-icons/md";
import TextFilter from '../../Components/TextField/TextField';
import { getNestedValue, NestedKeys, sortByNestedKey } from '../../Utils/utils';
import Pagination from '../../Components/Pagination/Pagination';
import Sort from '../../Components/Sorting/Sort';
import ErrorPage from '../../Components/ErrorPage/ErrorPage';
import LoadingOverlay from '../../Components/Loading/LoadingOverlay';

type InputEvent = ChangeEvent<HTMLInputElement>;

const defaultFilter: {
    name: NestedKeys<Customer>;
    term: string;
} = { name: "id", term: "" };

const defaultSortOptions: {
    name: NestedKeys<Customer>;
    isASC: boolean;
} = { name: "id", isASC: true };

function Dashboard() {
    const dispatch = useAppDispatch();
    const { customers, paging, indicator, error } = useAppSelector(selectCustomers);
    const [filter, setFilter] = useState({ ...defaultFilter });
    const [sortByColumn, setSortByColumn] = useState({ ...defaultSortOptions });

    const filteredCustomers = customers.filter((customer) => {
        const data = getNestedValue<Customer>(customer, filter.name);
        return typeof data === "string"
            ? filter.term.trim() !== "" 
                ? data.toLowerCase().trim().includes(filter.term.trim().toLowerCase()) 
                : true
            : false;
    });

    const orderedCustomers = sortByNestedKey<Customer>(filteredCustomers, sortByColumn.name, sortByColumn.isASC);

    const startIndex = (paging.currentPage - 1) * paging.pageSize;
    const endIndex = paging.currentPage * paging.pageSize;
    const limitCustomers = orderedCustomers.filter((_, index) => {
        const cusIndex = index + 1;
        return startIndex < cusIndex && cusIndex <= endIndex;
    });

    const handleDelete = (id: string) => {
        const userConfirmed = confirm('Are you sure you want to delete this item?');
        if (userConfirmed) {
            dispatch(removeCustomers(id));
        }
    };

    function assignValue(field: string) {
        return field === filter.name ? filter.term : "";
    }

    function handleRetry() {
        dispatch(fetchCustomers(''));
    }

    function handleReset() {
        setFilter({ ...defaultFilter });
        setSortByColumn({ ...defaultSortOptions });
    }

    useEffect(() => {
        dispatch(setPage(1));
    }, [dispatch, filter, sortByColumn]);

    useEffect(() => {
        if(indicator === "idle")
            dispatch(fetchCustomers(''));
    }, [dispatch,indicator]);

    if (indicator === "failure" && error !== null) {
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
                                        onChange={(e: InputEvent) => setFilter({ name: columnKey, term: e.target.value })}
                                    />
                                    <Sort
                                        highlight={sortByColumn.name === columnKey ? sortByColumn.isASC : null}
                                        handleSort={(isASC: boolean) => setSortByColumn({ name: columnKey, isASC })}
                                    />
                                </th>
                            );
                        })}
                        <th className={classes.headcell}>
                            <div onClick={handleReset} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
                                Reset Filter
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {limitCustomers.map((customerDetail: Customer) => (
                        <tr key={customerDetail.id}>
                            {Object.keys(userTableDisplayer).map((key) => {
                                const columnKey = userTableDisplayer[key as keyof typeof userTableDisplayer];
                                const data =  getNestedValue<Customer>(customerDetail,columnKey)
                                return <td key={key} className={classes.datacell}>
                                            {typeof data === "string" && data}
                                        </td>
                            })}
                            <td className={classes.datacell}>
                                <button style={{background:"white"}} title='Remove' disabled={indicator === "loading"} onClick={() => handleDelete(customerDetail.id)}>
                                    <MdDelete 
                                        color='#009879' />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination
                totalItems={filteredCustomers.length}
                itemsPerPage={paging.pageSize}
                currentPage={paging.currentPage}
                onPageChange={(page: number) => dispatch(setPage(page))}
            />
        </>
    );
}

export default Dashboard;
