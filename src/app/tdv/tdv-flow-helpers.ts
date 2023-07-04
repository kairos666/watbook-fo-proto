import { Edge, Node } from "reactflow";
import { TDVStep, TDVTransition } from "./tdv-descriptor.type";
import ELK from 'elkjs/lib/elk.bundled.js';

/* NODE & EDGES */

const stepToFlowNodeMapper = (transitions:TDVTransition[]) => (step:TDVStep) => {
    const type = (transitions.find(trans => (trans.from === step.id)) === undefined)
            ? 'output'
            : (step.isStartStep) 
            ? 'input' 
            : 'default';
    
    return {
        id: step.id,
        data: { label: step.name, slideType: step.slideType },
        position: { x: 0, y: 0 },
        targetPosition: 'left',
        sourcePosition: 'right',
        type,
    }
}

const transitionToEdgeMapper = (fromOverride?:string, toOverride?:string) => (transition:TDVTransition) => {
    const uniqueID = `${ transition.from }_to_${ transition.to }_uuid_${ Math.random().toString(36).substr(2, 9) }`;
    const customLabel = (transition.conditions && transition.conditionType === "AND")
        ? transition.conditions.join(' & ')
        : (transition.conditions && transition.conditionType === "ANY")
        ? transition.conditions.join(' OU ')
        : (transition.conditions)
        ? transition.conditions.join(' ; ')
        : undefined;

    return { 
        id: uniqueID, 
        source: (fromOverride) ? fromOverride : transition.from, 
        target: (toOverride) ? toOverride : transition.to, 
        label: customLabel 
    };
}

export function buildNodesForSimplifiedTree(steps:TDVStep[], transitions:TDVTransition[]):{ nodes: Node[], edges: Edge[] } {
    const xStepOffset = 200;
    const stepToNode = stepToFlowNodeMapper(transitions);
    const transitionToEdge = transitionToEdgeMapper();

    // build once every nodes
    const nodes:Node[] = steps.map(stepToNode);

    // build once every transitions
    const edges:Edge[] = transitions.map(transitionToEdge);

    return { nodes, edges };
}

// function* breadthFirstStepIterator(steps:TDVStep[], transitions:TDVTransition[]) {
//     // find and build root node
//     const rootStep = steps.find(step => (step.isStartStep)) ?? null;
//     if(rootStep === null) throw new Error(`No root node found in TDV`);
//     yield { steps: [rootStep], transitions: [] };

//     // map steps
//     const stepsMap:Map<string, TDVStep> = new Map();
//     steps.forEach(step => stepsMap.set(step.id, step));

//     // cycle throught each levels until reached all leafs
//     let currentLevel:{ steps:TDVStep[], transitions:TDVTransition[] } = { steps:[rootStep], transitions: [] } // all steps at this level of depth and edges to reach currentLevel (none for root step)
//     while (currentLevel.steps.length !== 0) {
//         // find all relevant transitions for next level
//         const nextLevelTransitions = currentLevel.steps.flatMap(currentStep => transitions.filter(trans => (trans.from === currentStep.id)));

//         // fetch all next level steps from next level transitions
//         const nextLevelSteps = nextLevelTransitions.map(trans => {
//             const stepMatch = stepsMap.get(trans.to);
//             if(!stepMatch) throw new Error(`No match found for step id : ${ trans.to }`);

//             return stepMatch;
//         });

//         currentLevel = { steps: nextLevelSteps, transitions: nextLevelTransitions };
//         yield currentLevel;
//     }
// }

// export function buildNodesForFullTree(steps:TDVStep[], transitions:TDVTransition[], maxDepthLevel:number = 100):{ nodes: Node[], edges: Edge[] } {
//     const xStepOffset = 200;
//     const yStepOffset = 150;
//     const nodes:Node[] = [];
//     const edges:Edge[] = [];
//     const stepToNode = stepToFlowNodeMapper(transitions);
//     const treeIterator = breadthFirstStepIterator(steps, transitions);
//     let iteratorOutput = treeIterator.next();
//     let depthLevel = 1; // avoid cycles infinite loops with maxDepthLevel

//     while(!iteratorOutput.done && depthLevel <= maxDepthLevel) {
//         const depthYOffset = (depthLevel - 1) * yStepOffset;

//         /* handle level steps and transitions */
//         // STEPS
//         // console.log(`depth level ${ depthLevel }`, iteratorOutput.value.steps);
//         const newNodes = iteratorOutput.value.steps
//             .map(stepToNode)
//             .map((nodeWithoutOffset, index, arr) => {
//                 const nodeXOffset = (index * xStepOffset) - (arr.length * 0.5 * xStepOffset);

//                 return {...nodeWithoutOffset, position: { x: nodeXOffset, y: depthYOffset } }
//             });
//         nodes.push(...newNodes);

//         // TRANSITIONS
//         const newEdges = iteratorOutput.value.transitions.map(transitionToEdgeMapper());
//         edges.push(...newEdges);

//         // go to next iteration
//         depthLevel++;
//         iteratorOutput = treeIterator.next();
//     }

//     return { nodes, edges };
// }

/* LAYOUT - ELK ALGO (https://github.com/kieler/elkjs) */
export function flowToElkGraph(nodes:Node[], edges:Edge[], options?:any) {
    const elk = new ELK();
    const isHorizontal = options?.['elk.direction'] === 'RIGHT';

    // create ELK graph
    const graph = {
        id: 'root',
        layoutOptions: options ?? {},
        children: nodes.map((node) => ({
                ...node,
                // Adjust the target and source handle positions based on the layout
                // direction.
                targetPosition: isHorizontal ? 'left' : 'top',
                sourcePosition: isHorizontal ? 'right' : 'bottom',

                // Hardcode a width and height for elk to use when layouting.
                width: 200,
                height: 75,
            })),
        edges: edges,
    };

    return elk
        .layout((graph as any))
        .then((layoutedGraph) => ({
            nodes: layoutedGraph.children.map((node) => ({
                ...node,
                // React Flow expects a position property on the node instead of `x`
                // and `y` fields.
                position: { x: node.x, y: node.y },
            })),

            edges: layoutedGraph.edges,
        }))
        .catch(console.error);
}
