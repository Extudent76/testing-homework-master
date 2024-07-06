import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Catalog } from '../../src/client/pages/Catalog';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('Компонент Catalog', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      products: []
    });

    store.dispatch = jest.fn();
  });

  test('Отображает заголовок страницы', () => {
    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    );
    expect(screen.getByRole('heading', { name: /Catalog/i })).toBeInTheDocument();
  });

  test('Получает список товаров с сервера и отображает их', async () => {
    const products = [
      { id: 1, name: 'Product 1', price: 100 },
      { id: 2, name: 'Product 2', price: 200 },
    ];

    store = mockStore({
      products
    });

    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    );

    // Ожидание загрузки товаров
    await waitFor(() => {
      expect(screen.getByTestId('1')).toBeInTheDocument();
      expect(screen.getByTestId('2')).toBeInTheDocument();
    });

    // Проверка отображения названий товаров
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('Отображает сообщение "LOADING" при отсутствии товаров', () => {
    render(
      <Provider store={store}>
        <Catalog />
      </Provider>
    );

    expect(screen.getByText('LOADING')).toBeInTheDocument();
  });
});
