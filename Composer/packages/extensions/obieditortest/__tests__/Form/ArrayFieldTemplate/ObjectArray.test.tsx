import React from 'react';
import { render, fireEvent, RenderResult } from 'react-testing-library';

import ObjectArray from '../../../src/Form/ArrayFieldTemplate/ObjectArray';

const TestTitleField: React.FC<any> = ({ title, ...rest }) => <label {...rest}>{title}</label>;
const TestDescriptionField: React.FC<any> = ({ description, ...rest }) => <p {...rest}>{description}</p>;

const items = [
  { children: <div>element 1</div> },
  { children: <div>element 2</div> },
  { children: <div>element 3</div> },
];

function renderDefault(propOverrides = {}): RenderResult {
  const props = {
    TitleField: TestTitleField,
    DescriptionField: TestDescriptionField,
    items,
    title: 'My Array Title',
    schema: {
      description: 'My array description.',
    },
    idSchema: {
      __id: 'ObjectArrayTest',
    },
    ...propOverrides,
  };

  // @ts-ignore
  return render(<ObjectArray {...props} />);
}

describe('<ObjectArray />', () => {
  it('renders a TitleField', async () => {
    const { findByText } = renderDefault();

    const title = await findByText('My Array Title');
    expect(title.tagName).toEqual('LABEL');
    expect(title.id).toEqual('ObjectArrayTest__title');
  });

  it('renders a DescriptionField', async () => {
    const { findByText } = renderDefault();

    const title = await findByText('My array description.');
    expect(title.tagName).toEqual('P');
    expect(title.id).toEqual('ObjectArrayTest__description');
  });

  it('renders a StringItem for each item', async () => {
    const { findAllByText } = renderDefault();

    const items = await findAllByText('element', { exact: false });
    expect(items).toHaveLength(3);
  });

  it('can add new items', async () => {
    const onAddClick = jest.fn();
    const { findByText } = renderDefault({ canAdd: true, onAddClick });
    const addBtn = await findByText('Add');
    fireEvent.click(addBtn);
    expect(onAddClick).toHaveBeenCalled();
  });
});