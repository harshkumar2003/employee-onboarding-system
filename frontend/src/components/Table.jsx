const Table = ({ columns, data , }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mt-4 mx-6 cursor-pointer">
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          
          <thead className="bg-[#1D293D]">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.accessor}
                  className="px-6 py-4 text-left text-sm font-semibold text-white whitespace-nowrap"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row) => (
                <tr
                  key={row.id}
                  className="border-t border-slate-200 hover:bg-slate-50 transition"
                >
                  {columns.map((column) => (
                    <td
                      key={column.accessor}
                      className="px-6 py-4 text-sm text-black whitespace-nowrap"
                    >
                      {row[column.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-8 text-slate-500"
                >
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Table;