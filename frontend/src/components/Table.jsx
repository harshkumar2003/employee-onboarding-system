const Table = ({ columns, data , onRowClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      <table className="w-full">

        {/* Table Header */}
        <thead className="bg-slate-100">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="text-left px-6 py-4 text-sm font-semibold text-slate-700"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-t border-slate-200 hover:bg-slate-50"
              onClick={() => onRowClick(item)}
            >
              {columns.map((col) => (
                <td
                  key={col.accessor}
                  className="px-6 py-4 text-sm text-slate-600"
                >
                  {item[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default Table;