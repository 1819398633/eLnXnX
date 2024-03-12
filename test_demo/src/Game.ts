import { Sun } from './Sun';

class Game {
    root: HTMLDivElement;

    constructor() {
        this.root = document.createElement('div');
        this.root.style.width = '1200px';
        this.root.style.height = '800px';
        this.root.style.backgroundColor = '#B0B0B0';
        document.body.appendChild(this.root);

        let sun = new Sun();
        this.root.appendChild(sun.element);

        this.gameLoop();
    }

    gameLoop() {
        console.log("Game loop running");
        requestAnimationFrame(() => this.gameLoop());
    }
}

window.onload = () => {
    const game = new Game();
}