// keept sidebar and setting message update here only.

import React from "react";
import { ArrowLeft, MessageSquareMore } from "lucide-react";
import {
  Edge,
  Node,
  OnSelectionChangeParams,
  getConnectedEdges,
  useOnSelectionChange,
} from "reactflow";

interface Props {
  edges: Edge<any>[];
  setNodes: React.Dispatch<
    React.SetStateAction<Node<any, string | undefined>[]>
  >;
  nodes: Node<any, string | undefined>[];
}
export default function Sidebar({ setNodes, nodes, edges }: Props) {
  const [showEdit, setShowEdit] = React.useState(false); // for toggle edit mode.

  const [editeNodes, setEditNodes] = React.useState<Node[]>([]); // for edit message text input state.

  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  useOnSelectionChange({
    onChange: (params: OnSelectionChangeParams) => {
      if (params.nodes.length) {
        setEditNodes(params.nodes); //set values for edit text area.
        setShowEdit(true); // and toggle the state edit mode.
      } else setShowEdit(false);
    },
  });

  return (
    <div className="py-2 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-center border-b">
          {showEdit ? (
            <ArrowLeft
              className="mb-2 text-center text-black/[.6] cursor-pointer"
              onClick={() => setShowEdit(false)}
            />
          ) : (
            <p className="leading-8 tracking-tight m-0 p-0 text-sm text-black/[.75] font-semibold">
              Node Panel
            </p>
          )}
        </div>
        {showEdit ? (
          <div className="grid grid-cols-2 gap-2 p-2 ">
            {editeNodes.map((node) => {
              return (
                <div
                  key={node.id}
                  className="flex p-2 flex-row gap-2 shadow  cursor-pointer items-center justify-center border"
                >
                  <p className="text-sm tracking-tight">Message</p>
                  <textarea
                    className="resize-none w-auto border-2 text-sm tracking-tight border-black/[.1] outline-none "
                    name="textarea"
                    value={node.data.message}
                    onChange={(
                      event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                      // update local state for edit nodes value data..
                      setEditNodes((prev) =>
                        prev.map((prevn) => {
                          if (prevn.id === node.id) {
                            prevn.data = {
                              ...prevn.data,
                              message: event.target.value,
                            };
                          }
                          return prevn;
                        })
                      );

                      // update global values here.
                      setNodes((prev) =>
                        prev.map((prevn) => {
                          if (prevn.id === node.id) {
                            prevn.data = {
                              ...prevn.data,
                              message: event.target.value,
                            };
                          }
                          return prevn;
                        })
                      );
                    }}
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex gap-2 p-2  ">
            <div
              className="h-32 w-32 flex flex-col shadow hover:shadow-inner cursor-pointer items-center justify-center border"
              onDragStart={(event) => onDragStart(event, "message")}
              draggable
            >
              <MessageSquareMore className="w-5 h-5 text-black/[.6]" />
              <p>Message</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex py-4 items-center justify-center border-t border-black/[.1]">
        <button
          onClick={() => {
            // check the connections. and validate here.
            const connectedEdges = getConnectedEdges(nodes, edges);
            if (nodes.length > 1 && connectedEdges.length !== nodes.length - 1)
              alert("error");
          }}
          className="border px-6 py-2 shadow border-black/[.1] hover:shadow-inner text-black/[.6] hover:text-black text-center cursor-pointer rounded "
        >
          Save changes
        </button>
      </div>
    </div>
  );
}
