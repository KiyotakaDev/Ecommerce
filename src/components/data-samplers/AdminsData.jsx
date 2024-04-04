import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";


const AdminsData = (props) => {
  return (
    <div>
      {props.pMapper.length === 0 ? (
        <p>No {props.pField.toLowerCase()} added</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>{props.pTitle}</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.pMapper.map((field) => {
              const { id, username, name } = field;
              const validation = props.pField === "Admin" ? username : name
              return (
                <tr key={id}>
                  <td className="text-xl">
                    {validation}
                  </td>
                  <td className="flex justify-center items-center gap-4">
                    <button
                      onClick={() => {
                        props.deleteOnClick(id)
                        props.setSelected(validation)
                      }}
                      className="bg-red-400/80 delete-handler-btn"
                    >
                      <TrashIcon className="w-8 h-8" />
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        props.deleteOnClick(id)
                        props.setSelected(validation)
                      }}
                      className="bg-yellow-400/80 delete-handler-btn"
                    >
                      <PencilSquareIcon className="w-8 h-8" />
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default AdminsData