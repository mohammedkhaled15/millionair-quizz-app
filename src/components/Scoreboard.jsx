import { useEffect } from 'react'
import { privateRequest } from '../requests/axios'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';

const Scoreboard = ({ setShowScoreboard }) => {

  const [userData, setUserData] = useState([])
  const [rowSerial, setRowSerial] = useState(0)

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await privateRequest.get("/")
        setUserData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllUsers()
  }, [])

  let count = 0

  const columns = [
    {
      field: '#',
      headerName: '#',
      width: 50,
      // renderCell: (params) => params.api.getRowIndexRelativeToVisibleRows(params.id) + 1
      // renderCell: params => {
      //   // console.log(params)
      //   let noOfRows = params.api.getRowsCount()
      //   // console.log(noOfRows)
      //   if (count < noOfRows) {
      //     count++
      //     console.log(count)
      //     return count
      //   }
      // }
      renderCell: (params) => params.api.getRowsCount() - count++
    },
    { field: 'username', headerName: 'Player Name', width: 250 },
    { field: 'topScore', headerName: 'Top Score', width: 100 },
    { field: 'updatedAt', headerName: 'Date Of Top Score', width: 250, renderCell: (params) => params.row.updatedAt.slice(0, 10) },
  ];


  return (
    <div className='relative w-full h-screen flex flex-col items-center '>
      <button className={`rounded-xl bg-[#02274d] p-6 text-xl  font-medium active:bg-[#0a1a2b] absolute top-10 right-10`} onClick={() => setShowScoreboard(false)}>Back To The Game</button>

      <div className="mt-32 shadow-md sm:rounded-lg h-[500px] w-3/4">
        <DataGrid
          autoPageSize
          className='bg-[#02274D] '
          rowCount={userData.lenght}
          sx={{ color: "white" }}
          rows={userData}
          columns={columns}
          getRowId={(row) => row?.username} />

      </div>
    </div>
  )
}

export default Scoreboard