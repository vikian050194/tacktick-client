import { arenaFetchAction } from "actions";

import { BaseComponent } from "./Base";

export class Arena extends BaseComponent {
    constructor(dispatch) {
        super();
        this.dispatch = dispatch;
        dispatch(arenaFetchAction());
    }

    describe({ user, arena }) {
        const { size, walls, history } = arena;
        const { players } = history[history.length - 1];
        // const onClick = (id) => this.dispatch(toggleItemAction(id));

        const getCellClass = (x, y) => {
            if (walls.find((w) => w.x === x && w.y === y)) {
                return "wall";
            }

            const player = players.find(({ x: ux, y: uy }) => ux === x && uy === y);

            if (player) {
                return `color-bg-${player.id}`;
            }

            return "empty";
        };

        const getPlayerClass = (x, y) => {
            const player = players.find(({ x: ux, y: uy }) => ux === x && uy === y);

            if (player && player.id === user.id) {
                return "you";
            }

            return null;
        };

        this.builder.open("table").open("tbody");

        for (let y = 0; y < size; y++) {
            this.builder.open("tr");

            for (let x = 0; x < size; x++) {
                const classes = ["square", getCellClass(x, y)];
                const playerClass = getPlayerClass(x, y);
                if (playerClass) {
                    classes.push(playerClass);
                }

                this.builder.open("td", { class: "cell" });
                this.builder.div({ classList: classes }).close();
                this.builder.close();
            }

            this.builder.close();
        }

        this.builder.close().close();
        return this.builder.done();
    }
}
