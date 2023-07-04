'use client';

import { Handle, NodeProps, Position } from "reactflow";

type StepData = {
    label: string
    slideType: string
}

export default function InputStepNode({ data, isConnectable }:NodeProps<StepData>) {
    return (
        <>
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