import React, { useEffect } from 'react';
import PageTitle from '../../../components/PageTitle';
import { message, Table } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/loaderSlice';
import { getAllReports } from '../../../apicalls/reports';


function AdminReports() {
  const [reportsData, setReportsData] = React.useState([]);
  const dispatch = useDispatch();
  const [filters, setFilters] = React.useState({
    examName: '',
    userName: '',
  });
  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      render: (_, __, index) => <>{index + 1}</>,
    },
    {
      title: 'User Name',
      dataIndex: 'userName',
      render: (text, record) => <>{record.user.name}</>,
    },
    {
      title: 'Obtained Marks',
      dataIndex: 'correctAnswers',
      render: (text, record) => (
        <>
          {record.result.correctAnswers.length *
            (record.exam.totalMarks /
              (record.result.correctAnswers.length +
                record.result.wrongAnswers.length))}
        </>
      ),
    },
  ];

  const getData = async (tempFilters) => {
    try {
      dispatch(ShowLoading());
      const response = await getAllReports(tempFilters);
      if (response.success) {
        // Sort the data based on obtained marks
        const sortedData = response.data.sort((a, b) => {
          // Calculate obtained marks for each report
          const marksA =
            a.result.correctAnswers.length *
            (a.exam.totalMarks /
              (a.result.correctAnswers.length + a.result.wrongAnswers.length));
          const marksB =
            b.result.correctAnswers.length *
            (b.exam.totalMarks /
              (b.result.correctAnswers.length + b.result.wrongAnswers.length));
          // Sort in descending order based on obtained marks
          return marksB - marksA;
        });

        setReportsData(sortedData);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData(filters);
  }, []);

  return (
    <div>
      <PageTitle title='Leaderboard' />
      <div className='divider'></div>
      <div className='flex gap-2'>
        <input
          type='text'
          placeholder='User'
          value={filters.userName}
          onChange={(e) => setFilters({ ...filters, userName: e.target.value })}
        />
        <button
          className='primary-outlined-btn'
          onClick={() => {
            setFilters({
              examName: '',
              userName: '',
            });
            getData({
              examName: '',
              userName: '',
            });
          }}
        >
          Clear
        </button>
        <button
          className='primary-contained-btn'
          onClick={() => getData(filters)}
        >
          Search
        </button>
      </div>
      <Table  columns={columns} dataSource={reportsData} className='mt-2' />
    </div>
  );
}

export default AdminReports;
