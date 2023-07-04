/**
 * TDVDescriptor MUST BE PARSABLE TO JSON
 * When multiple transitions are available, meeting conditions should provide a clear winner (not allowed to have multiple valid transitions at the same time)
 */

export type TDVStep = {
    id: string
    name: string
    isStartStep?: boolean // is root (one and only one on tree)
}

export type TDVTransition = {
    from: string
    to: string
    conditions?: string[] // only if conditions have to be met to activate this transition
    conditionType?: string // accept "AND" or "ANY", necessary if multiple conditions are provided
}

export type TDVDescriptor = {
    tdvType: string
    tdvSteps: TDVStep[]
    tdvTransitions: TDVTransition[]
}