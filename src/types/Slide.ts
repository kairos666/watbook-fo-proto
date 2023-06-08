export type SlideBaseProps = {
    slideTitle?: string
    slideNextLabel?: string
    slideNextCb?: Function
}

export const SlideBasePropsDefaults = {
    slideTitle: "Exemple de titre",
    slideNextLabel: "Suivant",
    slideNextCb: () => alert('slide bouchonné')
}