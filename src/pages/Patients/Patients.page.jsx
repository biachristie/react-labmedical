import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Space, Table } from 'antd'
import { EyeOutlined } from '@ant-design/icons'

import './Patients.page.css'
import { TitlesContext } from '../../context/titles/titles.context'

function PatientsPage() {
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    const { setTitle } = useContext(TitlesContext)

    useEffect(() => {
        setTitle('Prontuários')
    }, [])
    
    const renderPage = () => {
        const columns = [
            {
                key: 'id',
                title: 'ID',
                dataIndex: 'id',
                align: 'center'
            },
            {
                key: 'fullname',
                title: 'Nome',
                dataIndex: 'fullname',
                sorter: (a, b) => a.fullname > b.fullname,
            },
            {
                key: 'age',
                title: 'Idade',
                dataIndex: 'age',
                sorter: (a, b) => a.age > b.age,
                align: 'center'
            },
            {
                key: 'gender',
                title: 'Sexo',
                dataIndex: 'gender',
                sorter: (a, b) => a.gender > b.gender,
            },
            {
                key: 'cellphone',
                title: 'Celular',
                dataIndex: 'cellphone',
                sorter: (a, b) => a.cellphone > b.cellphone,
            },
            {
                key: 'email',
                title: 'E-mail',
                dataIndex: 'email',
                sorter: (a, b) => a.email > b.email,
            },
            {
                key: 'appointments',
                title: 'Total de Consultas',
                render: (_, record) => {
                    
                },
                align: 'center'
            },
            {
                key: 'exams',
                title: 'Total de Exames',
                render: (_, record) => {
                    
                },
                align: 'center'
            },
            {
                key:'actions',
                title: 'Ações',
                render: (_, record) => (
                    <Space>
                        <a href={ `/patientRecord?id=${record.id}` }>
                            <EyeOutlined className='layout-content-table-eye' />
                        </a>
                    </Space>
                ),
                align: 'center'
            }
        ]

        return(
            <>
                <Table
                    className='layout-content-table-patients'
                    columns={ columns }
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