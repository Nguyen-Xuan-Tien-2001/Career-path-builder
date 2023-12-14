import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
} from "reactflow";
import { Modal, Table } from "antd";

import "reactflow/dist/style.css";
import "./map.scss";
import { initNodes, initEdges, Nodes, edges } from "./dataTest.tsx";
import { useEffect, useMemo, useState } from "react";
import ModalListTieuChi from "./Modal/ModalListTieuChi.tsx";
import ModalKhaiBaoTieuChi from "./Modal/ModalKhaiBaoTieuChi.tsx";

export enum ConnectionLineType {
  Bezier = "default",
  Straight = "straight",
  Step = "step",
  SmoothStep = "smoothstep",
  SimpleBezier = "simplebezier",
}

function Map() {
  const nodeData = Nodes.map((value: any, index: any) => {
    return {
      id: String(value.id),
      data: { label: value.data.shortname, levelname: value.data.levelname },
      position: value.position,
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
      draggable: false,
      className:
        value.levelclass <= 1
          ? `node__level${value.levelclass}`
          : `node__level node__level${value.levelclass}`,
    };
  });

  const edgeData = edges.map((value: any, index: any) => {
    return {
      id: String(index),
      source: value.source,
      target: value.target,
      animated: true,
      type: ConnectionLineType.Straight,
    };
  });

  // caching lại values nodes khi cây dom thay đổi kh refresh key node
  const initialNodes = useMemo(() => (nodeData ? nodeData : []), [nodeData]);
  const initialEdges = useMemo(() => (edgeData ? edgeData : []), [edgeData]);

  const [nodesData, setNodes, onNodesChange] = useNodesState(initialNodes);

  const [edgesData, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const [tabNode, setTabNode] = useState<any>();

  const [open, setOpen] = useState(false);
  const [openModalKhaibao, setOpenModalKhaibao] = useState(false);

  useEffect(() => {
    setNodes(nodeData);
    setEdges(edgeData);
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  //Hàm xử lý khi click vào một NODE bất kỳ trên lộ trình
  const handleOnNodeClick = (e: any, obj: any) => {
    if (obj.className !== "node__level0" && obj.className !== "node__level1") {
      setTabNode(obj);
      showModal();
    }
  };

  return (
    <>
      <ModalListTieuChi
        setOpenModalKhaibao={setOpenModalKhaibao}
        openModalKhaibao={openModalKhaibao}
        setOpen={setOpen}
        open={open}
        tabNode={tabNode}
      />
      <ModalKhaiBaoTieuChi
        setOpen={setOpenModalKhaibao}
        open={openModalKhaibao}
        tabNode={tabNode}
      />

      <ReactFlow
        nodes={nodesData}
        onNodesChange={onNodesChange}
        edges={edgesData}
        onEdgesChange={onEdgesChange}
        onNodeClick={(e, obj) => {
          handleOnNodeClick(e, obj);
        }}
        fitView
      >
        <Background color="#000" />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </>
  );
}

export default Map;
