import { userReducer } from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Adil' };

    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

    expect(endState.age).toBe(21);
    expect(endState.childrenCount).toBe(2);
});

test('user reducer should increment only childrenCount', () => {
    const startState = { age: 20, childrenCount: 2, name: 'Adil'};
});