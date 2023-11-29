import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
    Position,
    ConnectionLineType,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './map.css'


const initNodes = [
    {
        id: 'a',
        data: { label: 'Node A' },
        position: { x: -500, y: 350 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: 'b',
        data: { label: 'Node B' },
        position: { x: 0, y: 200 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
    {
        id: 'c',
        data: { label: 'Node C' },
        position: { x: 0, y: 500 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    }, {
        id: 'd',
        data: { label: 'Node D' },
        position: { x: 400, y: 300 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
    },
];

const initEdges = [
    {
        id: 'a-b',
        source: 'a',
        target: 'b',
        animated: true
    },
    {
        id: 'a-c',
        source: 'a',
        target: 'c',
        animated: true
    },
    {
        id: 'd-c',
        source: 'c',
        target: 'd',
        animated: true
    },
    {
        id: 'b-d',
        source: 'b',
        target: 'd',
        animated: true
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
