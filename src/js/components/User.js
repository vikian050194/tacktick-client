import { userJoinAction, userLeaveAction } from "actions";
import { UserModel } from "models";

import { BaseComponent } from "./Base";

export class User extends BaseComponent {
    constructor(dispatch) {
        super();
        this.dispatch = dispatch;
    }

    describe({ user }) {
        const model = new UserModel(user);
        const onJoin = () => this.dispatch(userJoinAction());
        const onLeave = () => this.dispatch(userLeaveAction(model));

        let text = null;
        let onClick = null;

        if (model.type === "guest") {
            text = "join";
            onClick = onJoin;
        } else {
            text = "leave";
            onClick = onLeave;
        }

        this.builder.button().onClick(onClick).text(text).close();
        return this.builder.done();
    }
}
