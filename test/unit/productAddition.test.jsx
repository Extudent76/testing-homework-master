import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import { addToCart, initStore, clearCart } from '../../src/client/store';
import { MOCK_PRODUCT_1, TestApi, TestCartApi } from './mock.api';
import { ProductDetails } from '../../src/client/components/ProductDetails';
import { Application } from '../../src/client/Application';

describe('Компонент <ProductDetails />', () => {
    let store;
    let api;
    let cart;

    beforeEach(() => {
        api = new TestApi('');
        cart = new TestCartApi();
        store = initStore(api, cart);
    });

    it('Нажатие на кнопку "Add to Cart" должно добавлять в корзину товар, который еще не в корзине', async () => {
        const application = (
            <Provider store={store}>
                <ProductDetails product={MOCK_PRODUCT_1} />
            </Provider>
        );

        render(application);
        await userEvent.click(screen.getByText('Add to Cart'));
        expect(store.getState().cart[MOCK_PRODUCT_1.id]?.count).toBe(1);
    });

    it('Нажатие на кнопку "Add to Cart" должно увеличивать на 1 количество товара, который уже присутствует в корзине', async () => {
        cart.setState({
            [MOCK_PRODUCT_1.id]: {
                count: 1,
                price: MOCK_PRODUCT_1.price,
                name: MOCK_PRODUCT_1.name,
            }
        });
        store = initStore(api, cart);
        const application = (
            <Provider store={store}>
                <ProductDetails product={MOCK_PRODUCT_1} />
            </Provider>
        );

        render(application);
        await userEvent.click(screen.getByText('Add to Cart'));
        expect(store.getState().cart[MOCK_PRODUCT_1.id]?.count).toBe(2);
    });

    it('Изменение товара в корзине должно отображаться в шапке', async () => {
        const application = (
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );

        render(application);

        const link = screen.getByRole('link', { name: /Cart/i });

        expect(link.innerHTML.trim()).toBe('Cart');

        store.dispatch(addToCart(MOCK_PRODUCT_1));

        await waitFor(() => {
            expect(link.innerHTML.trim()).toBe('Cart (1)');
        });

        const MOCK_PRODUCT_2 = {
            id: 2,
            name: 'Product 2',
            description: 'Description 2',
            price: 2000,
            color: 'Color 2',
            material: 'Material 2'
        };

        store.dispatch(addToCart(MOCK_PRODUCT_2));

        await waitFor(() => {
            expect(link.innerHTML.trim()).toBe('Cart (2)');
        });

        store.dispatch(clearCart());

        await waitFor(() => {
            expect(link.innerHTML.trim()).toBe('Cart');
        });
    });
});
