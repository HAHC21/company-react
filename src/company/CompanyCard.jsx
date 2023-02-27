import { useState } from "react"

export default function CompanyCard({ company_data, check }) {

    // Generic states
    const [deleted, setDeleted] = useState(false)
    const [dcheck, setdCheck] = useState(0)
    const [response, setResponse] = useState()

    // Edit company states
    const [companyName, setCompanyName] = useState(company_data.name)
    const [companyAddress, setCompanyAddress] = useState(company_data.address)
    const [edited, setEdited] = useState(false)
    const [updated, setUpdated] = useState(false)

    // Force reloads the component when the user clicks on 'See all companies'
    if (check > dcheck) {
        setdCheck(check)
        setDeleted(false)
        setEdited(false)
        setUpdated(false)
    }

    // Deletes selected company
    function deleteCompany(id) {
        const url = 'http://127.0.0.1:5000/company/' + id + '/delete'
        fetch(url, {
            method: 'POST'
        })
            .then((res) => res.json())
            .then((data) => setResponse(data.result), setDeleted(true))
        
    }

    // Edit Company Information
    function editCompany(id) {
        const url = 'http://127.0.0.1:5000/company/' + id
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            mode: 'cors',
            body: JSON.stringify({
                NIT: id,
                address: companyAddress,
                name: companyName
            })
        })
            .then((res) => res.json())
            .then((data) => setResponse(data.result))
        setEdited(false)
        setUpdated(true)
    }

    
    return (
        <>
        {
            deleted ? <div className="company-card-deleted">{ response }</div> :
            <div id={company_data.NIT} className="company-card">
                <table className='table thead-dark'>
                    <tbody>
                        <tr>
                            <th className="table_nit">NIT</th>
                            <th className="table_name">Name</th>
                            <th className="table_address">Address</th>
                            <th className=""></th>
                            <th className=""></th>
                        </tr>
                        { 
                            updated ? 
                            <tr>
                                <th className="company_update_response" colSpan={5}>
                                    <div className="company_updated_message">
                                    { response }
                                    </div>
                                    <button
                                        className="company_updated_dismiss"
                                        onClick={() => {setUpdated(false)}}
                                        >
                                        Dismiss
                                    </button>
                                </th>
                            </tr>
                            : '' 
                        }
                        <tr>
                            <td>{company_data.NIT}</td>
                            <td>
                                {
                                    edited ? 
                                        <input
                                            className="edit_company_input"
                                            type="text"
                                            value={companyName}
                                            onChange={(e) => {setCompanyName(e.target.value)}}
                                            id={company_data.NIT + '_1'}
                                            placeholder={company_data.name}
                                            name={company_data.name} 
                                            required
                                        />
                                        : companyName
                                }
                            </td>
                            <td>
                                {
                                    edited ? 
                                        <input 
                                            className="edit_company_input"
                                            type="text"
                                            value={companyAddress}
                                            onChange={(e) => {setCompanyAddress(e.target.value)}}
                                            id={company_data.NIT + '_2'}
                                            placeholder={company_data.address}
                                            name={company_data.address} 
                                            required
                                        />
                                        : companyAddress
                                }
                            </td>
                            <td>
                                {
                                    !edited ? 
                                        <button 
                                        className="company_update"
                                        onClick={() => {setEdited(true)}}
                                        >
                                        Update</button>
                                        :
                                        <button 
                                        className="company_update"
                                        onClick={() => {editCompany(company_data.NIT)}}
                                        >
                                        Save</button>
                                }
                            </td>
                            <td>
                                <button 
                                    className="company_delete"
                                    onClick={() => {deleteCompany(company_data.NIT)}}
                                    >
                                    Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        }
        </>
    )
}