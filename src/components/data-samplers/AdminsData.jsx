import ActionHandler from "../sub/ActionHandler";

const AdminsData = (props) => {
  return (
    <div>
      {props.pMapper.length === 0 ? (
        <p>No {props.pField.toLowerCase()} added</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Admins</th>
              <th>email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {props.pMapper.map((field) => {
              const { id, username, email } = field;
              return (
                <tr key={id}>
                  <td className="text-xl">{username}</td>
                  <td>{email}</td>
                  <td className="flex justify-center items-center gap-4">
                    {username !== "root" ? (
                      <ActionHandler
                        action={{
                          handler: props.handleAction,
                          selected: props.setSelected,
                        }} 
                        id={0}
                        objId={id}
                        objName={username}
                      />
                    ) : (
                      <ActionHandler
                        action={{
                          handler: props.handleAction,
                          selected: props.setSelected,
                        }}
                        id={1}
                        objId={id}
                        objName={username}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminsData;
