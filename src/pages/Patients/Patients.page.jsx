import { Navigate } from 'react-router-dom'
import { Table } from 'antd'

import './Patients.page.css'

function PatientsPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    
    const renderPage = () => {
        return(
            <>
                <Table
                    className='layout-content-table-patients'
                    rowKey= { (record) => record.id }
                    style={{ tableLayout: 'fixed' }}
                    scroll={{ x: '100%' }}
                    pagination={{ 
                        position: ['bottomLeft'], 
                        size: 'small',
                    }}
                />
            </>
        )
    }
    
    return isLogged ? renderPage() : <Navigate to='/login' />

}

export default PatientsPage