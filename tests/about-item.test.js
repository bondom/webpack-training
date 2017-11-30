import React from 'react';
import renderer from 'react-test-renderer';
import AboutItem from '../src/components/widgets/about-item/AboutItem';

test('Div changes class when hovered', () => {
    const component = renderer.create(
        <AboutItem/>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //manually trigger callback
    tree.props.onMouseEnter();
    //re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();

    //manually trigger callback
    tree.props.onMouseLeave();
    //re-rendering
    tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})