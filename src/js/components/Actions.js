import { actionsSetAction, actionsResetAction, actionsSubmitAction } from "actions";

import { BaseComponent } from "./Base";

const options = ["empty", "left", "right", "up", "down"];
const optionsSign = ["", "L", "R", "U", "D"];

export class Actions extends BaseComponent {
    constructor(dispatch) {
        super();
        this.dispatch = dispatch;
    }

    describe({ user, actions }) {
        const onSubmit = () => this.dispatch(actionsSubmitAction({ id: user.id, actions: actions.map(a => options[a]) }));
        const onReset = () => this.dispatch(actionsResetAction());
        const nextAction = (index) => () => {
            const updatedAction = (actions[index] + 1) % options.length;
            this.dispatch(actionsSetAction([...actions.slice(0, index), updatedAction, ...actions.slice(index + 1, actions.length)]));
        };

        this.builder.div({ class: "actions" }).div().open("table").open("tbody").open("tr");
        const actionType = "empty";
        const classes = ["square", actionType];
        for (let i = 0; i < actions.length; i++) {
            const action = actions[i];
            this.builder.open("td", { classList: ["cell", "action"] }).div({ classList: classes }).onClick(nextAction(i)).text(optionsSign[action]).close(2);
        }
        this.builder.close(4);
        this.builder.div({ class: "buttons" });
        this.builder.button({ class: "button" }).onClick(onSubmit).text("submit").close();
        this.builder.button({ class: "button" }).onClick(onReset).text("reset").close();
        this.builder.close(2);

        return this.builder.done();
    }
}