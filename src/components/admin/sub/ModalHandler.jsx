const ModalHandler = ({ id, action, obj, type }) => {

  const placeholders = [
    {
      message: "Root user can't be deleted or changed",
      action_btn: [
        { color: "bg-emerald-400", action_msg: "ok", do: action.cancel },
      ],
    },
    {
      message: "The app must have at least one extra Admin!",
      action_btn: [
        { color: "bg-emerald-400", action_msg: "ok", do: action.cancel },
      ],
    },
    {
      message: "Are you shure you want to ",
      action_btn: [
        {
          color: "bg-red-500 text-white",
          action_msg: "yes",
          do: action.confirm,
        },
        {
          color: "bg-gray-300 text-gray-800",
          action_msg: "cancel",
          do: action.cancel,
        },
      ],
    },
  ];

  const prop = placeholders[id];

  return (
    <>
      {id === 2 ? (
        <p>
          {prop.message}
          <span className="text-red-500">delete</span>{" "}
          <span className="font-bold">{`${obj} ${type}`}</span>?
        </p>
      ) : (
        <p>{prop.message}</p>
      )}
      <div className="flex justify-evenly items-center">
        {prop.action_btn.map((btn, i) => (
          <button
            key={i}
            onClick={btn.do}
            className={`${btn.color} px-4 py-2 rounded-md mt-8`}
          >
            {btn.action_msg}
          </button>
        ))}
      </div>
    </>
  );
};

export default ModalHandler;
