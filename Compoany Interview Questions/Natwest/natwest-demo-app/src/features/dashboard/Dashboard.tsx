import { Customer, setPage, selectCustomers, userTableDisplayer } from './dashboardSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { ChangeEvent, useEffect, useState } from 'react';
import { fetchCustomers } from './getCustomersAPI';
import classes from './dashboard.module.css'
import { removeCustomers } from './removeCustomerAPI';
import { MdDelete } from "react-icons/md";
import TextFilter from '../../Components/dashboard/TextFilter';
import { getNestedValue, NestedKeys, sortByNestedKey } from '../../Utils/utils';
import Pagination from '../../Components/pagination/Pagination';
import Sort from '../../Components/dashboard/Sort';


type InputEvent = ChangeEvent<HTMLInputElement>;
const defaultFilter : 
    {   name    :   NestedKeys<Customer>,
        term    :   string
    } = {name : "id",term:""}
const defaultSortOt : 
    {
        name    :   NestedKeys<Customer>,
        isASC   :   boolean
    } = {name : "id",isASC:true}

function Dashboard() {
    const dispatch = useAppDispatch();
    const {customers,paging} = useAppSelector(selectCustomers);
    const [filter,setFilter] = useState({...defaultFilter})
    const [sortByColumn,setSortByColumn] = useState({...defaultSortOt})

    const filteredCustomers = customers.filter(customer => {
        const data = getNestedValue<Customer>(customer,filter.name);
        return typeof data === "string" ? filter.term.trim() !== "" ? data.toLowerCase().trim().includes(filter.term.trim().toLowerCase()) : true : false
    });

    const orderedCustomers = sortByNestedKey<Customer>(filteredCustomers,sortByColumn.name,sortByColumn.isASC)
    
    const startIndex = (paging.currentPage - 1) * paging.pageSize;
    const endIndex = paging.currentPage * paging.pageSize;
    // console.log(startIndex,paging.currentPage,endIndex,customers)
    const limitCustomers = orderedCustomers.filter((_,index) => {
        const cusIndex = index+1;
        if(startIndex < cusIndex && cusIndex <= endIndex){
            return true;
        }
        return false;
    })

    const handleDelete = (id:string) => {
        const userConfirmed = confirm('Are you sure you want to delete this item?');
        if (userConfirmed) {
          dispatch(removeCustomers(id))
        }
    };
    
    function assignValue(field:string){
        return field === filter.name ? filter.term : ""
    }

    function handleRest(){
        setFilter({...defaultFilter});
        setSortByColumn({...defaultSortOt});
    }

    useEffect(()=>{
        dispatch(setPage(1))
    },[dispatch,filter,sortByColumn])

    useEffect(()=>{
        // `?_page=${getCurrentPageNumber(paging.isPrevious,paging.isNext)}&_per_page=${paging.pageSize}`
        dispatch(fetchCustomers(""));
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
                                highlight={sortByColumn.name === userTableDisplayer.accHolderName ? sortByColumn.isASC : null} 
                                handleSort={(isASC:boolean)=> setSortByColumn({name:userTableDisplayer.accHolderName,isASC})}/>
                        </th>
                        <th className={classes.headcell}>
                            <TextFilter 
                                value={assignValue(userTableDisplayer.accHolderAddress)} 
                                onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accHolderAddress,term:e.target.value})}/>
                            <Sort 
                                highlight={sortByColumn.name === userTableDisplayer.accHolderAddress ? sortByColumn.isASC : null} 
                                handleSort={(isASC:boolean)=> setSortByColumn({name:userTableDisplayer.accHolderAddress,isASC})}/>
                        </th>
                        <th className={classes.headcell}>
                            <TextFilter 
                                value={assignValue(userTableDisplayer.accNumber)} 
                                onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accNumber,term:e.target.value})}/>
                            <Sort 
                                highlight={sortByColumn.name === userTableDisplayer.accNumber ? sortByColumn.isASC : null} 
                                handleSort={(isASC:boolean)=> setSortByColumn({name:userTableDisplayer.accNumber,isASC})}/>
                        </th>
                        <th className={classes.headcell}>
                            <TextFilter 
                                value={assignValue(userTableDisplayer.accType)} 
                                onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accType,term:e.target.value})}/>
                            <Sort 
                                highlight={sortByColumn.name === userTableDisplayer.accType ? sortByColumn.isASC : null} 
                                handleSort={(isASC:boolean)=> setSortByColumn({name:userTableDisplayer.accType,isASC})}/>
                        </th>
                        <th className={classes.headcell}>
                            <TextFilter 
                                value={assignValue(userTableDisplayer.accStatus)} 
                                onChange={(e:InputEvent) => setFilter({name:userTableDisplayer.accStatus,term:e.target.value})}/>
                            <Sort 
                                highlight={sortByColumn.name === userTableDisplayer.accStatus ? sortByColumn.isASC : null} 
                                handleSort={(isASC:boolean)=> setSortByColumn({name:userTableDisplayer.accStatus,isASC})}/>
                        </th>
                        <th className={classes.headcell}>Action <div onClick={handleRest} style={{cursor:'pointer',textDecoration:'underline'}}>Rest Filter</div></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        limitCustomers.map((customerDetail : Customer) => 
                            <tr 
                                key={customerDetail.id}>
                                <td className={classes.datacell}>{customerDetail.firstName} {customerDetail.lastName}</td>
                                <td className={classes.datacell}>{customerDetail.contactDetails.address.state}</td>
                                <td className={classes.datacell}>{customerDetail.accountDetails.accountNumber}</td>
                                <td className={classes.datacell}>{customerDetail.accountDetails.accountType}</td>
                                <td className={classes.datacell}>{customerDetail.accountDetails.status}</td>
                                <td className={classes.datacell}>
                                        <span style={{cursor:"pointer"}}>
                                            <MdDelete color='#009879' onClick={()=>handleDelete(customerDetail.id)}/>
                                        </span>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <Pagination 
                totalItems={filteredCustomers.length} 
                itemsPerPage={paging.pageSize}
                // getCurrentPageNumber(paging.isPrevious,paging.isNext) 
                currentPage={paging.currentPage}
                onPageChange={(page:number) => dispatch(setPage(page))}
            />
        </>
    )
}

export default Dashboard