'use client';

import { useCallback, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, Node, Edge, DefaultEdgeOptions } from 'reactflow';
import tdvDescription from './tdv-descriptor.json';
import 'reactflow/dist/style.css';
import { buildNodesForSimplifiedTree } from './tdv-flow-helpers';

/* INIT NODES */
const { nodes: initialNodes, edges: initialEdges } = buildNodesForSimplifiedTree(tdvDescription.tdvSteps, tdvDescription.tdvTransitions, 50);

type TDVSimulatorProps = {}

export default function TDVSimulator({}:TDVSimulatorProps) {

    const defaultEdgeOptions:DefaultEdgeOptions = {
        animated: true,
        style: {
            stroke: 'black'
        }
    };

    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange = useCallback( (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes:any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <ReactFlow 
                fitView
                fitViewOptions={ { minZoom: 0.1, maxZoom: 10 } }
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