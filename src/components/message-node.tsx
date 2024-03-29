import { Handle, Position } from "reactflow";

function MessageNode({
  data,
  isConnectable,
}: {
  data: any;
  isConnectable: boolean;
}) {
  return (
    <div className="border border-black/[.1] shadow">
      <div className="bg-slate-300 border-b px-2 py-1">
        <p className="text-[7px]">Send Message</p>
      </div>
      <div className="px-2">
        <input
          id="text"
          name="text"
          disabled
          value={data.message}
          placeholder="message..."
          className="nodrag text-[7px]  text-ellipsis"
        />
      </div>
      <Handle
        type="target"
        position={Position.Left}
        id="a"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
}

export default MessageNode;
