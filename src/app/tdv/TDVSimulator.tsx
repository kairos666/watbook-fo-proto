'use client';

import { useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, Node, Edge, DefaultEdgeOptions } from 'reactflow';
import 'reactflow/dist/style.css';

type TDVSimulatorProps = {}

export default function TDVSimulator({}:TDVSimulatorProps) {

    const defaultEdgeOptions:DefaultEdgeOptions = {
        animated: true,
        style: {
            stroke: 'black'
        }
    };

    const initialNodes = [
        {
            id: '1',
            data: { label: 'Hello' },
            position: { x: 0, y: 0 },
            type: 'input',
        },
        {
            id: '2',
            data: { label: 'World' },
            position: { x: 100, y: 100 },
        },
    ];

    const initialEdges = [{ id: '1-2', source: '1', target: '2', label: 'my condition' }];

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange = useCallback( (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes:any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

    return (
        <div style={{ height: '100%', aspectRatio: 2, maxHeight: '80vh', marginInline: 'auto' }}>
            <ReactFlow 
                fitView 
                nodes={ nodes } 
                edges={ edges } 
                onNodesChange={ onNodesChange } 
                onEdgesChange={ onEdgesChange } 
                defaultEdgeOptions={ defaultEdgeOptions }  
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
}