import { Builder, replace, convert } from "fandom";
import { User } from "./User";
import { Arena } from "./Arena";
import { UsersList } from "./UsersList";
import { Actions } from "./Actions";
import { configureStore } from "store";
import { throttle, LocalStorage } from "utils";
// import { arenaFetchAction } from "actions";

const App = ($root) => {
    $root.classList.add("container");

    // TODO extract "state" to const or so
    const persistedState = LocalStorage.get("state");
    const store = configureStore(persistedState);

    store.subscribe(throttle(() => {
        const { user } = store.getState();
        LocalStorage.set("state", { user });
    }, 1000));

    const components = {
        user: new User(store.dispatch),
        arena: new Arena(store.dispatch),
        users: new UsersList(store.dispatch),
        actions: new Actions(store.dispatch)
    };

    const builder = new Builder();

    builder.open("header").div({ id: "actions" }).close(2);
    builder.open("main");

    builder.div({ id: "arena" }).close();
    builder.div({ id: "users" }).close();

    builder.close();
    builder.open("footer").div({ id: "user" }).close(2);

    replace($root, convert(builder.done()));

    const storeSnapshot = store.getState();

    const onUpdate = (currentState) => {
        for (const key in components) {
            // const substate = currentState[key];
            // const model = components[key].describe(substate);
            const model = components[key].describe(currentState);
            const elements = convert(model);
            replace(document.getElementById(key), elements);
        }
    };

    store.subscribe(onUpdate);

    // TODO remove hotfix
    // setInterval(() => store.dispatch(arenaFetchAction()), 1000);

    onUpdate(storeSnapshot);
};

export default App;