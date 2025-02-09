import { Customer, selectCustomers, userTableDisplayer } from './dashboardSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchCustomers } from './getCustomersAPI';
import classes from './dashboard.module.css'
import { removeCustomers } from './removeCustomerAPI';
import { MdDelete } from "react-icons/md";
import TextFilter from '../../Components/dashboard/TextFilter';
import { getCurrentPageNumber, getNestedValue, NestedKeys, sortByNestedKey } from '../../Utils/utils';
import Pagination from '../../Components/pagination/Pagination';
import Sort from '../../Components/dashboard/Sort';


type InputEvent = ChangeEvent<HTMLInputElement>;

function Dashboard() {
    const dispatch = useAppDispatch();
    const {customers,paging} = useAppSelector(selectCustomers);
    const [filter,setFilter] = useState<{name:NestedKeys<Customer>,term:string}>({name : "id",term:""})
    const [sortByColumn,setSortByColumn] = useState<{name:NestedKeys<Customer>,isASC:boolean}>({name : "id",isASC:true})

    const filteredCustomers = customers.filter(customer => {
        const data = getNestedValue<Customer>(customer,filter.name);
        return typeof data === "string" ? filter.term.trim() !== "" ? data.toLowerCase().trim().includes(filter.term.trim().toLowerCase()) : true : false
    });

    const orderedCustomers = sortByNestedKey<Customer>(filteredCustomers,sortByColumn.name,sortByColumn.isASC)
    
    function assignValue(field:string){
        return field === filter.name ? filter.term : ""
    }
    
    useEffect(()=>{
        dispatch(fetchCustomers(`?_page=${getCurrentPageNumber(paging.isPrevious,paging.isNext)}&_per_page=${paging.pageSize}`));
    },[dispatch])


    return (
        <>
            <table className={classes.table}>
            <thead>
                <tr className={classes.header}>
                    <th className={classes.headcell}>
                        <TextFilter 
                            value={assignValue(userTableDisplayer.accHolderName)} 
                            onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accHolderName,term:e.target.value})}/>
                        <Sort 
                            className={sortByColumn.name === userTableDisplayer.accHolderName ? 'active' : ''} 
                            handleSort={()=> setSortByColumn(prev => ({name:userTableDisplayer.accHolderName,isASC: !prev.isASC}))}/>
                        
                    </th>
                    <th className={classes.headcell}>
                        <TextFilter 
                            value={assignValue(userTableDisplayer.accHolderAddress)} 
                            onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accHolderAddress,term:e.target.value})}/>
                        <Sort 
                            className={sortByColumn.name === userTableDisplayer.accHolderAddress ? 'active' : ''} 
                            handleSort={()=> setSortByColumn(prev => ({name:userTableDisplayer.accHolderAddress,isASC: !prev.isASC}))}/>
                    </th>
                    <th className={classes.headcell}>
                        <TextFilter 
                            value={assignValue(userTableDisplayer.accNumber)} 
                            onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accNumber,term:e.target.value})}/>
                        <Sort 
                            className={sortByColumn.name === userTableDisplayer.accNumber ? 'active' : ''} 
                            handleSort={()=> setSortByColumn(prev => ({name:userTableDisplayer.accNumber,isASC: !prev.isASC}))}/>
                        
                    </th>
                    <th className={classes.headcell}>
                        <TextFilter 
                            value={assignValue(userTableDisplayer.accType)} 
                            onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accType,term:e.target.value})}/>
                        {/* <label htmlFor="acccountType">AccountType:</label>
                        <select id="acccountType">
                            <option disabled>select...</option>
                            <option>Active</option> 
                            <option>Inactive</option> 
                            <option>Closed</option> 
                        </select> */}
                        <Sort 
                            className={sortByColumn.name === userTableDisplayer.accType ? 'active' : ''} 
                            handleSort={()=> setSortByColumn(prev => ({name:userTableDisplayer.accType,isASC: !prev.isASC}))}/>
                    </th>
                    <th className={classes.headcell}>
                        <TextFilter 
                            value={assignValue(userTableDisplayer.accStatus)} 
                            onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accStatus,term:e.target.value})}/>
                        {/* <label htmlFor="accountstatus">AccountStatus:</label>
                        <select id="accountstatus">
                            <option disabled>select...</option>
                            <option>Operational</option> 
                            <option>Overdrawn</option> 
                            <option>Suspended</option> 
                            <option>Dormant</option> 
                            <option>Closed</option> 
                        </select> */}
                        <Sort 
                            className={sortByColumn.name === userTableDisplayer.accStatus ? 'active' : ''} 
                            handleSort={()=> setSortByColumn(prev => ({name:userTableDisplayer.accStatus,isASC: !prev.isASC}))}/>
                    </th>
                    <th className={classes.headcell}>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    orderedCustomers.map((customerDetail : Customer) => 
                    <tr 
                        key={customerDetail.id}>
                        <td className={classes.datacell}>{customerDetail.firstName} {customerDetail.lastName}</td>
                        <td className={classes.datacell}>{customerDetail.contactDetails.address.state}</td>
                        <td className={classes.datacell}>{customerDetail.accountDetails.accountNumber}</td>
                        <td className={classes.datacell}>{customerDetail.accountDetails.accountType}</td>
                        <td className={classes.datacell}>{customerDetail.accountDetails.status}</td>
                        <td className={classes.datacell}>
                            <button onClick={()=>dispatch(removeCustomers(customerDetail.id))}>
                                <MdDelete/>
                            </button>
                        </td>
                    </tr>)
                }
            </tbody>
            </table>
            <Pagination 
                totalItems={paging.total} 
                itemsPerPage={paging.pageSize} 
                currentPage={getCurrentPageNumber(paging.isPrevious,paging.isNext)}
                onPageChange={(params: string) => dispatch(fetchCustomers(params))}
            />
        </>
    )
}

export default Dashboard