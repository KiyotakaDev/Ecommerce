import {
  PencilSquareIcon,
  TrashIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ActionHandler = ({ action, id, objId, objName }) => {
  const placeholders = [
    {
      action_btn: [
        { color: "bg-red-400/80", action_msg: "Delete", icon: TrashIcon },
        {
          color: "bg-yellow-400/80",
          action_msg: "Edit",
          icon: PencilSquareIcon,
        },
      ],
    },
    {
      action_btn: [
        {
          color: "bg-gray-300 w-full",
          action_msg: "",
          icon: InformationCircleIcon,
        },
      ],
    },
  ];

  const prop = placeholders[id];

  return (
    <>
      {prop.action_btn.map((btn, i) => (
        <button
          key={i}
          onClick={() => {
            action.handler(objId), action.selected(objName);
          }}
          className={`${btn.color} action-btn`}
        >
          <btn.icon className="w-8 h-8" />
          {btn.action_msg}
        </button>
      ))}
    </>
  );
};

export default ActionHandler;
