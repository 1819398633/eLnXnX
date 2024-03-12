class Sun {
    element: HTMLDivElement;

    constructor() {
        this.element = document.createElement('div');
        this.element.style.width = '100px';
        this.element.style.height = '100px';
        this.element.style.borderRadius = '50%';
        this.element.style.backgroundColor = 'yellow';
        this.element.style.position = 'absolute';
        this.element.style.top = '50px';
        this.element.style.left = '50px';
    }
}

export { Sun };