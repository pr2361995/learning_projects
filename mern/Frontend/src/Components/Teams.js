import React from "react";


const Teams = ({data,
        edit,
        editId,
        empId,
        empName,
        experience,
        handleCancel,
        handleDone,
        handleEdit,
        handleDelete,
        handleChange})  => {
  return (
    <>
      {data.map((gpTeam,index) => <table key={index}>
        <thead>
          <tr>
            <td>{gpTeam[0].technology_name}</td>
          </tr>
        </thead>
        <tbody>
            {gpTeam.map((md,ind) => 
              <tr key={md._id}>
                {
                  edit == true && editId == md._id ? 
                    <>
                      <td>{ind+1}</td>
                      <td>
                        <input  placeholder="employee id" 
                          type="number" 
                          name="empId" 
                          onChange={handleChange} 
                          defaultValue={md.employee_id} 
                          value={empId}/>
                      </td>
                      <td>
                        <input  placeholder="employee name" 
                          type="text" 
                          name="empName" 
                          onChange={handleChange} 
                          defaultValue={md.employee_name} 
                          value={empName}/>
                      </td>
                      <td>
                        <input  placeholder="experience" 
                          type="number" 
                          name="experience" 
                          onChange={handleChange} 
                          defaultValue={md.experience} 
                          value={experience}/>
                      </td>
                      <td>
                        <button onClick={handleDone}>Done</button>
                      </td>
                      <td>
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  : 
                    <>
                      <td>{ind+1}</td>
                      <td>{md.employee_id}</td>
                      <td>{md.employee_name}</td>
                      <td>{md.experience}</td>
                      <td>
                          <button onClick={(e) => handleEdit(md._id)}>Edit</button>
                      </td>
                      <td>
                        <button onClick={(e) => handleDelete(e,md._id)}>Delete</button>
                      </td>
                    </>
                }
              </tr>)
            }
        </tbody>
      </table>)}
    </>
  );
}

export default Teams;
