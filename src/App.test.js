import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import App from './App';
import sampleState from './sampleState';

const createAppInstance = () => {
  const app = new App();
  app.state = {
    ...app.state,
    queries: sampleState.queries,
    activeHistoryQuery: 'trees',
  };
  app.setState = update => {
    app.state = {
      ...app.state,
      ...(typeof update === 'function' ? update(app.state) : update),
    };
  };

  return app;
};

const mockQueryFetch = () => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          watsonEmotionResults: sampleState.watsonEmotionResults,
          duplicatesFiltered: sampleState.tweets,
        }),
    })
  );
};

afterEach(() => {
  delete global.fetch;
});

it('renders without crashing', async () => {
  global.fetch = jest.fn(() => Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ queries: sampleState.queries }),
  }));

  const div = document.createElement('div');
  await act(async () => {
    ReactDOM.render(<App />, div);
  });
  ReactDOM.unmountComponentAtNode(div);
});

it('keeps a history query active after repopulating its results', async () => {
  const app = createAppInstance();
  mockQueryFetch();

  await app.handleSubmitQuery('trees', true);

  expect(app.state.activeHistoryQuery).toBe('trees');
});

it('clears the active history query when submitting a new query', async () => {
  const app = createAppInstance();
  mockQueryFetch();

  const queryRequest = app.handleSubmitQuery('earthquake');

  expect(app.state.activeHistoryQuery).toBe(null);

  await queryRequest;
});
