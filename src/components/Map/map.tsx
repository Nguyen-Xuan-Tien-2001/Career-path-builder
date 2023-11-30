import ReactFlow, {
    Controls,
    Background,
    MiniMap,
    useNodesState,
    useEdgesState,
    Position,
} from 'reactflow';

import 'reactflow/dist/style.css';
import './map.scss'

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
        className:'node__level node__level2'
    },
    {
        id: 'd2',
        data: { label: 'FS Level 1' },
        position: { x: 400, y: 150 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level2'
    },
    {
        id: 'd3',
        data: { label: 'BE Level 1' },
        position: { x: 400, y: 300 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level2'
    },
    {
        id: 'd4',
        data: { label: 'BA Biz Level 1' },
        position: { x: 400, y: 450 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level2'
    },
    {
        id: 'd5',
        data: { label: 'BA Tech Level 1' },
        position: { x: 400, y: 600 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level2'
    },
    {
        id: 'd6',
        data: { label: 'QC Level 1' },
        position: { x: 400, y: 750 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level2'
    },
    {
        id: 'd7',
        data: { label: 'TK Level 1' },
        position: { x: 400, y: 900 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level2'
    },
    {
        id: 'e1',
        data: { label: 'FE Level 2' },
        position: { x: 700, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level3'
    },
    {
        id: 'e2',
        data: { label: 'FS Level 2' },
        position: { x: 700, y: 150 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level3'
    },
    {
        id: 'e3',
        data: { label: 'BE Level 2' },
        position: { x: 700, y: 300 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level3'
    },
    {
        id: 'e4',
        data: { label: 'BA Biz Level 2' },
        position: { x: 700, y: 450 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level3'
    },
    {
        id: 'e5',
        data: { label: 'BA Tech Level 2' },
        position: { x: 700, y: 600 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level3'
    },
    {
        id: 'e6',
        data: { label: 'QC Level 2' },
        position: { x: 700, y: 750 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level3'
    },
    {
        id: 'f1',
        data: { label: 'FE Level 3' },
        position: { x: 1000, y: 0 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'f2',
        data: { label: 'FS Level 3' },
        position: { x: 1000, y: 150 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'f3',
        data: { label: 'BE Level 3' },
        position: { x: 1000, y: 300 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'f4',
        data: { label: 'BA Biz Level 3' },
        position: { x: 1000, y: 450 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'f5',
        data: { label: 'BA Tech Level 3' },
        position: { x: 1000, y: 600 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'f6',
        data: { label: 'QC Level 3' },
        position: { x: 1000, y: 750 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'f7',
        data: { label: 'TK Level 3' },
        position: { x: 1000, y: 900 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level4'
    },
    {
        id: 'g1',
        data: { label: 'Master DEV' },
        position: { x: 1300, y: 150 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level5'
    },
    {
        id: 'g2',
        data: { label: 'Master BA' },
        position: { x: 1300, y: 650 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level5'
    },
    {
        id: 'h',
        data: { label: 'PH' },
        position: { x: 1600, y: 350 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level6'
    },
    {
        id: 'k',
        data: { label: 'PGĐ' },
        position: { x: 1900, y: 350 },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level7'
    },
    {
        id: 'l',
        data: { label: 'GĐ' },
        position: { x: 2200, y: 350 },
        sourcePosition: Position.Left,
        targetPosition: Position.Left,
        draggable: false,
        className:'node__level node__level8'
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
        id: 'e1-d1',
        source: 'd1',
        target: 'e1',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e2-d2',
        source: 'd2',
        target: 'e2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e3-d3',
        source: 'd3',
        target: 'e3',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e4-d4',
        source: 'd4',
        target: 'e4',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e5-d5',
        source: 'd5',
        target: 'e5',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'e6-d6',
        source: 'd6',
        target: 'e6',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f1-e1',
        source: 'e1',
        target: 'f1',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f2-e2',
        source: 'e2',
        target: 'f2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f3-e3',
        source: 'e3',
        target: 'f3',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f4-e4',
        source: 'e4',
        target: 'f4',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f5-e5',
        source: 'e5',
        target: 'f5',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f6-e6',
        source: 'e6',
        target: 'f6',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'f7-d7',
        source: 'd7',
        target: 'f7',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'g1-f2',
        source: 'f2',
        target: 'g1',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'g2-f4',
        source: 'f4',
        target: 'g2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'g2-f5',
        source: 'f5',
        target: 'g2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'g2-f6',
        source: 'f6',
        target: 'g2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'g2-f7',
        source: 'f7',
        target: 'g2',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'h-g2',
        source: 'g2',
        target: 'h',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'h-g1',
        source: 'g1',
        target: 'h',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'k-h',
        source: 'h',
        target: 'k',
        animated: true,
        type: ConnectionLineType.Straight,

    },
    {
        id: 'l-k',
        source: 'k',
        target: 'l',
        animated: true,
        type: ConnectionLineType.Straight,

    },
];


function Map() {
    const [nodes, , onNodesChange] = useNodesState(initNodes);
    const [edges, , onEdgesChange] = useEdgesState(initEdges);

    //Hàm xử lý khi click vào một NODE bất kỳ trên lộ trình
    const handleOnNodeClick = (e:any,obj:any) => {
        console.log(obj);
    };


    //Hàm xử lý khi di chuột vào 1 node bất kỳ
    const handleOnMouseEnter = (e:any,obj:any) => {
        console.log(obj);
    };

    return (
        <ReactFlow
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            onNodeClick={(e,obj)=> {handleOnNodeClick(e,obj)}}
            onNodeMouseEnter = {(e,obj)=>{handleOnMouseEnter(e,obj)}}
            fitView
        >
            <Background />
            <Controls />
            <MiniMap />
            
        </ReactFlow>
    );
}

export default Map;
