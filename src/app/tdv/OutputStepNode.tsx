'use client';

import { Handle, NodeProps, Position } from "reactflow";

type StepData = {
    label: string
    slideType: string
}

export default function OutputStepNode({ data, isConnectable }:NodeProps<StepData>) {
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
        </>
    );
};