// Library imports
import { useState, useEffect } from 'react';

// Style imports
import './Company.css'


// Component imports
import ButtonCard from '../forms/ButtonCard.jsx';
import InputCard from '../forms/InputCard.jsx'
import CompanyCard from './CompanyCard';


// Main Component
function CompanyView() {

    const [company_view, setCompanyView] = useState('')
    const [reset_companies, setResetCompanies] = useState(0)

    return (
        <>  
            <div className='company-container'>
                <div className="company_menu">
                    <ButtonCard 
                        id='all_companies_button'
                        value='See all companies'
                        onclick={() => {
                            setResetCompanies(reset_companies + 100)
                            setCompanyView(
                            < CompanyAll 
                                check={reset_companies} 
                                />
                            )
                        }}
                    />
                    <ButtonCard 
                        id='search_company_button'
                        value='Find a company'
                        onclick={() => {
                            setCompanyView(< CompanySearch />);
                        }}
                    />
                    <ButtonCard 
                        id='new_company_button'
                        value='Create a company'
                        onclick={() => {
                            setCompanyView(< CompanyNew />)
                        }}
                    />
                </div>
                <div className='company-main'>
                    {company_view}
                </div>
            </div>
        </>
    )
}


// Content rendering functions
function CompanyAll(props) {

    const [companies, setCompanies] = useState([])
    const [selected_companies, setSelectedCompanies] = useState([])
    const [page, setPage] = useState(1)

    useEffect(() => {

        function prepareCompanies(data) {
            setCompanies(data)
            setSelectedCompanies(data.slice(0, 5))
        }

        fetch('http://127.0.0.1:5000/companies/')
            .then((res) => res.json())
            .then(data => prepareCompanies(data.companies))
    }, [props.check])

    useEffect(() => {
        let start = page * 5
        let end = start + 5

        setSelectedCompanies(companies.slice(start, end))

    }, [page, companies])

    return (
        <>  
            <h2>All Companies</h2>
            <div className="company_data">
                {
                    selected_companies?.length > 0 ?
                        selected_companies.map((company) => (
                        < CompanyCard 
                            company_data={company} 
                            key={company.NIT} 
                            check={props.check + 0.1} 
                            />
                    )) : ''
                }
            </div>
            <div className='company_navigation'>
                {
                    page > 1 & selected_companies.length > 0 ? 
                    < ButtonCard 
                        id='companies_move_backwards'
                        value='Previous 5 results'
                        onclick={() => {
                            setPage(prevPage => prevPage - 1)
                            } 
                        }
                        />
                    : ''
                }
                {
                    page * 5 < companies.length ? 
                    < ButtonCard 
                        id='companies_move_forward'
                        value='Next 5 results'
                        onclick={() => {
                            setPage(prevPage => prevPage + 1)
                        }}
                        />
                    : ''
                }
            </div>
        </>
    )
}


function CompanySearch() {

    const [search_view, setSearchView] = useState()
    const [search_value, setSearchValue] = useState('')
    const [search_nit, setNIT] = useState('')

    useEffect(() => {

        function validate_results(data) {
            console.log(data)
            if (data.result !== 'success') {
                setSearchView(data.result)
            }
            else {
                setSearchView(< CompanyCard company_data={data.company} />)
            }
        }

        if (search_value) {
            let url = 'http://127.0.0.1:5000/company/' + search_value
            fetch(url)
                .then((res) => res.json())
                .then((data) => validate_results(data))
        }
    }, [search_value])

    return (
        <>
            <div className='company-search'>
                <form>
                    <h2>Find a company</h2>
                    <InputCard 
                        placeholder="Company NIT"
                        id="nit_value"
                        name="nit_value"
                        onChange={setNIT}
                        />
                    <ButtonCard 
                        id="find_company_button"
                        value="Find Company"
                        onclick={() => {setSearchValue(search_nit)}}
                        />
                </form>
            </div>
            <div className='search-results'>
                {search_view}
            </div>
        </>
    )
}



function CompanyNew() {

    const [result_view, setResultView] = useState()
    const [result, setResult] = useState()
    const [company_nit, setCompanyNIT] = useState()
    const [company_name, setCompanyName] = useState()
    const [company_address, setCompanyAddress] = useState()

    useEffect(() => {
        if (result) {
            if (result.result === 'success') {
                setResultView(
                    <>
                        <p>Company created successfully!</p>
                        < CompanyCard company_data={result.company_data} />
                    </>
                )
            }
            else {
                setResultView(
                    result.result
                )
            }
        }
        
    }, [result])

    function companyCreate() {

        fetch('http://127.0.0.1:5000/company/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            mode: 'cors',
            body: JSON.stringify({
                NIT: company_nit,
                name: company_name,
                address: company_address
            })
        })
            .then((res) => res.json())
            .then((data) => setResult(data))
    }

    return (
        <>
            <div className='company-create'>
                <form>
                    <h2>Create a new company</h2>
                    < InputCard 
                        placeholder="NIT" 
                        id="company_nit" 
                        name="company_nit" 
                        onChange={setCompanyNIT}
                        />
                    < InputCard 
                        placeholder="Name" 
                        id="company_name" 
                        name="company_name"
                        onChange={setCompanyName}
                        />
                    < InputCard 
                        placeholder="Address" 
                        id="company_address" 
                        name="company_address"
                        onChange={setCompanyAddress}
                        />
                    < ButtonCard 
                        id="company_create_button" 
                        value="Create company" 
                        onclick={() => {companyCreate()}}
                        />
                </form>
                <div className='process-result'>
                    { result_view }
                </div>
            </div>
        </>
    )
}

export default CompanyView;