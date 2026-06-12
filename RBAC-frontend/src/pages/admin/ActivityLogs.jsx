// src/pages/admin/ActivityLogs.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../api/axios';

const ActivityLogs = () => {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data } = await API.get('/admin/activity-logs');
      setLogs(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getBadgeColor = (action) => {
    switch (action) {
      case 'login':        
      return 'bg-blue-100 text-blue-700';
      case 'task_created': 
      return 'bg-green-100 text-green-700';
      case 'task_updated': 
      return 'bg-yellow-100 text-yellow-700';
      case 'task_deleted': 
      return 'bg-red-100 text-red-700';
      default:             
      return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Activity Logs</h2>
        <button
          onClick={() => navigate('/admin')}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Dashboard
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">User</th>
              <th className="p-3">Action</th>
              <th className="p-3">Details</th>
              <th className="p-3">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No logs found
                </td>
              </tr>
            ) : (
              logs.map((log) => (
                <tr key={log._id} className="border-t">
                  <td className="p-3">
                    {log.user?.userName || 'Unknown'}
                  </td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-sm ${getBadgeColor(log.action)}`}>
                      {log.action}
                    </span>
                  </td>
                  <td className="p-3 text-gray-600">
                    {log.details || '-'}
                  </td>
                  <td className="p-3 text-gray-500 text-sm">
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default ActivityLogs;