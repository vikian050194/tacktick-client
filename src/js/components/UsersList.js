import { BaseComponent } from "./Base";

export class UsersList extends BaseComponent {
    constructor(dispatch) {
        super();
        this.dispatch = dispatch;
    }

    describe({ user, arena }) {
        this.builder.div({ class: "users" }).div({ class: "list" });
        for (const player of arena.history[arena.index].players) {
            const classes = ["user", `color-bg-${player.id}`];
            if (player.id === user.id) {
                classes.push("you");
            }
            let health = "";
            if (player.health > 0) {
                health = (new Array(player.health)).fill("🤍").join("");
            } else {
                health = "💀";
            }
            this.builder.div({ classList: classes }).text(health).close();
        }
        this.builder.close().close();
        return this.builder.done();
    }
}
