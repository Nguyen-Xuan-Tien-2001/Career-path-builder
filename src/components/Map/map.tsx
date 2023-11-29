import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
    Position,
    MarkerType
} from 'reactflow';

import 'reactflow/dist/style.css';
import './map.css'

export enum ConnectionLineType {
    Bezier = 'default',
    Straight = 'straight',
    Step = 'step',
    SmoothStep = 'smoothstep',
    SimpleBezier = 'simplebezier',
  }

const initNodes = [
    {
        id: 'a',
        data: { label: 'Lộ trình phát triển Tầng Nghiệp vụ/Lập trình' },
        position: { x: -500, y: 350 },
        sourcePosition: Position.Right,
        targetPosition: Position.Right,
        draggable: false,
        className:'node__level0'
    },
    {
        id: 'b',
        data: { label: 'Hướng DEV' },
        position: { x: 0, y: 165 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level1'
    },
    {
        id: 'c',
        data: { label: 'Hướng BA' },
        position: { x: 0, y: 670 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level1'

    }, 
    {
        id: 'd1',
        data: { label: 'FE Level 1' },
        position: { x: 400, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'd2',
        data: { label: 'FS Level 1' },
        position: { x: 400, y: 150 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'd3',
        data: { label: 'BE Level 1' },
        position: { x: 400, y: 300 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'd4',
        data: { label: 'BA Biz Level 1' },
        position: { x: 400, y: 450 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'd5',
        data: { label: 'BA Tech Level 1' },
        position: { x: 400, y: 600 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'd6',
        data: { label: 'QC Level 1' },
        position: { x: 400, y: 750 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'd7',
        data: { label: 'TK Level 1' },
        position: { x: 400, y: 900 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level2'
    },
    {
        id: 'e1',
        data: { label: 'FE Level 2' },
        position: { x: 800, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
    {
        id: 'e2',
        data: { label: 'FS Level 2' },
        position: { x: 800, y: 150 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
    {
        id: 'e3',
        data: { label: 'BE Level 2' },
        position: { x: 800, y: 300 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
    {
        id: 'e4',
        data: { label: 'BA Biz Level 2' },
        position: { x: 800, y: 450 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
    {
        id: 'e5',
        data: { label: 'BA Tech Level 2' },
        position: { x: 800, y: 600 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
    {
        id: 'e6',
        data: { label: 'QC Level 2' },
        position: { x: 800, y: 750 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
    {
        id: 'e7',
        data: { label: 'TK Level 2' },
        position: { x: 800, y: 900 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level3'
    },
];

const initEdges = [
    {
        id: 'a-b',
        source: 'a',
        target: 'b',
        animated: true,
        type: ConnectionLineType.Straight,
    },
    {
        id: 'a-c',
        source: 'a',
        target: 'c',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd1-b',
        source: 'b',
        target: 'd1',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd2-b',
        source: 'b',
        target: 'd2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd3-b',
        source: 'b',
        target: 'd3',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd4-c',
        source: 'c',
        target: 'd4',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd5-c',
        source: 'c',
        target: 'd5',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd5-c',
        source: 'c',
        target: 'd5',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd6-c',
        source: 'c',
        target: 'd6',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'd7-c',
        source: 'c',
        target: 'd7',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e1-b',
        source: 'd1',
        target: 'e1',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e2-b',
        source: 'd2',
        target: 'e2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e3-b',
        source: 'd3',
        target: 'e3',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e4-c',
        source: 'd4',
        target: 'e4',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e5-c',
        source: 'd5',
        target: 'e5',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e5-c',
        source: 'd5',
        target: 'e5',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e6-c',
        source: 'd6',
        target: 'e6',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e7-c',
        source: 'd7',
        target: 'e7',
        animated: true,
        type: ConnectionLineType.Straight,

    },
];


function Map() {
    const [nodes, , onNodesChange] = useNodesState(initNodes);
    const [edges, , onEdgesChange] = useEdgesState(initEdges);

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
  
            fitView
        >
            <Background />
            <Controls />
            <MiniMap />
            
        </ReactFlow>
    );
}

export default Map;
