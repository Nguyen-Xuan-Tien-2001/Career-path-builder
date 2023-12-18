import ReactFlow, {
  Controls,
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  Position,
} from "reactflow";

import "reactflow/dist/style.css";
import "./map.scss";
import { initNodes, initEdges, Nodes, edges } from "./dataTest.tsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import ModalListCriteria from "./Modal/ModalListCriteria.tsx";
import ModalCriteriaDeclaration from "./Modal/ModalCriteriaDeclaration.tsx";

//API
import { GetTree } from "../../ApiServices/MapApi/GetTree.tsx";

export enum ConnectionLineType {
  Bezier = "default",
  Straight = "straight",
  Step = "step",
  SmoothStep = "smoothstep",
  SimpleBezier = "simplebezier",
}

function Map() {
  const { getTreeResponse, getTreeIsLoading, getTreeError, getTreeRefetch } =
    GetTree();

  // const nodeData = Nodes.map((value: any, index: any) => {
  //   return {
  //     id: String(value.id),
  //     data: { label: value.data.shortname, levelname: value.data.levelname },
  //     position: value.position,
  //     sourcePosition: Position.Right,
  //     targetPosition: Position.Left,
  //     draggable: false,
  //     className:
  //       value.levelclass <= 1
  //         ? `node__level${value.levelclass}`
  //         : `node__level node__level${value.levelclass}`,
  //   };
  // });

  // const edgeData = edges.map((value: any, index: any) => {
  //   return {
  //     id: String(index),
  //     source: value.source,
  //     target: value.target,
  //     animated: true,
  //     type: ConnectionLineType.Straight,
  //   };
  // });

  // // caching lại values nodes khi cây dom thay đổi kh refresh key node
  // const initialNodes = useMemo(() => (nodeData ? nodeData : []), [nodeData]);
  // const initialEdges = useMemo(() => (edgeData ? edgeData : []), [edgeData]);

  const [nodesData, setNodes, onNodesChange] = useNodesState([]);
  const [edgesData, setEdges, onEdgesChange] = useEdgesState([]);

  const [tabNode, setTabNode] = useState(0);

  const [open, setOpen] = useState(false);
  const [openModalKhaibao, setOpenModalKhaibao] = useState(false);

  useEffect(() => {
    const handleRenderNode = async () => {
      if (getTreeResponse) {
        let dataFormat = getTreeResponse?.data?.nodes!.map(
          (value: any, index: any) => {
            return {
              id: String(value.id),
              data: {
                label: value.data.shortname,
                levelname: value.data.levelname,
              },
              position: value.position,
              sourcePosition: Position.Right,
              targetPosition: Position.Left,
              indelible: false,
              draggable: false,
              className:
                value.levelclass <= 1
                  ? `node__level${value.levelclass}`
                  : `node__level node__level${value.levelclass}`,
            };
          }
        );
        await setNodes(dataFormat);
      }
    };

    handleRenderNode();
  }, [getTreeResponse]);

  useEffect(() => {
    const handleRenderEdge = async () => {
      if (getTreeResponse) {
        let dataFormat = getTreeResponse?.data?.edges!.map(
          (value: any, index: any) => {
            return {
              id: String(index),
              source: value.source,
              target: value.target,
              animated: true,
              type: ConnectionLineType.Straight,
            };
          }
        );
        await setEdges(dataFormat);
      }
    };
    handleRenderEdge();
  }, [getTreeResponse]);

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
      <ModalListCriteria
        setOpenModalKhaibao={setOpenModalKhaibao}
        openModalKhaibao={openModalKhaibao}
        setOpen={setOpen}
        open={open}
        tabNode={tabNode}
      />
      <ModalCriteriaDeclaration
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
