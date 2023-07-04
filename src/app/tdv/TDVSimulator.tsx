'use client';

import { useCallback, useLayoutEffect, useState } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, Node, Edge, DefaultEdgeOptions, NodeTypes } from 'reactflow';
import tdvDescription from './tdv-descriptor.json';
import 'reactflow/dist/style.css';
import './tdv-flow-styles.scss';
import { buildNodesForSimplifiedTree, flowToElkGraph } from './tdv-flow-helpers';
import InputStepNode from './InputStepNode';
import StepNode from './StepNode';
import OutputStepNode from './OutputStepNode';

/* INIT NODES */
const { nodes: initialNodes, edges: initialEdges } = buildNodesForSimplifiedTree(tdvDescription.tdvSteps, tdvDescription.tdvTransitions);
const nodeTypes: NodeTypes = {
    input: InputStepNode,
    default: StepNode,
    output: OutputStepNode
};

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

    // organise graph the first time
    useLayoutEffect(() => {
        const elkOptions = {
            'elk.direction': 'RIGHT',
            'elk.algorithm': 'layered',
            'elk.layered.spacing.baseValue': '200',
            'elk.spacing.nodeNode': '250',
            'elk.spacing.edgeNode': '250'
        };
        
        flowToElkGraph(nodes, edges, elkOptions).then(result => {
            setNodes((result as any).nodes);
            setEdges((result as any).edges);
        });
    }, []);

    const onNodesChange = useCallback( (changes:any) => setNodes((nds) => applyNodeChanges(changes, nds)),[] );
    const onEdgesChange = useCallback( (changes:any) => setEdges((eds) => applyEdgeChanges(changes, eds)),[] );

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={ nodes } 
                edges={ edges } 
                nodeTypes={ nodeTypes }
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