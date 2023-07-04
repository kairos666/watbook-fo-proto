'use client';

import { Handle, NodeProps, Position } from "reactflow";

type StepData = {
    label: string
    slideType: string
}

export default function StepNode({ data, isConnectable }:NodeProps<StepData>) {
    return (
        <>
            <Handle
                type="target"
                position={Position.Left}
                isConnectable={isConnectable}
            />
            <span>{ data.label }</span>
            <br />
            <br />
            <small className="text-muted text-white-50">{ data.slideType }</small>
            <Handle
                type="source"
                position={Position.Right}
                isConnectable={isConnectable}
            />
        </>
    );
};