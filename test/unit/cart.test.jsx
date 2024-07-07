import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initStore } from '../../src/client/store';
import { MOCK_CART_STATE1, MOCK_PRODUCT_1, MOCK_PRODUCT_2, TestApi, TestCartApi } from './mock.api';
import { Cart } from '../../src/client/pages/Cart';

describe('Компонент <Cart />', () => {
    const basename = '/';
    const api = new TestApi(basename);
    const cart = new TestCartApi(MOCK_CART_STATE1);
    const store = initStore(api, cart);

    const application = (
        <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
            <Provider store={store}>
                <Cart />
            </Provider>
        </MemoryRouter>
    );

    it('Корректно отображает элементы корзины', () => {
        const { container } = render(application);

        const table = container.querySelector('.Cart-Table');
        const names = Array.from(table.querySelectorAll('.Cart-Name')).map((el) => el.textContent);
        const prices = Array.from(table.querySelectorAll('.Cart-Price')).map((el) => el.textContent);
        const counts = Array.from(table.querySelectorAll('.Cart-Count')).map((el) => el.textContent);
        const totals = Array.from(table.querySelectorAll('.Cart-Total')).map((el) => el.textContent);
        const orderPrice = table.querySelector('.Cart-OrderPrice')?.textContent;

        const total1 = MOCK_CART_STATE1[MOCK_PRODUCT_1.id].count * MOCK_PRODUCT_1.price;
        const total2 = MOCK_CART_STATE1[MOCK_PRODUCT_2.id].count * MOCK_PRODUCT_2.price;

        expect(names).toStrictEqual([MOCK_PRODUCT_1.name, MOCK_PRODUCT_2.name]);

        expect(prices).toStrictEqual([
            `$${MOCK_PRODUCT_1.price}`,
            `$${MOCK_PRODUCT_2.price}`
        ]);

        expect(counts).toStrictEqual([
            MOCK_CART_STATE1[MOCK_PRODUCT_1.id].count.toString(),
            MOCK_CART_STATE1[MOCK_PRODUCT_2.id].count.toString()
        ]);

        expect(totals).toStrictEqual([
            `$${total1}`,
            `$${total2}`
        ]);

        expect(orderPrice).toBe(`$${total1 + total2}`);
    });

    it('Корректно отображает пустую корзину', () => {
        const emptyCartStore = initStore(new TestApi(basename), new TestCartApi({}));
        const { container } = render(
            <MemoryRouter initialEntries={['/cart']} initialIndex={0}>
                <Provider store={emptyCartStore}>
                    <Cart />
                </Provider>
            </MemoryRouter>
        );

        const table = container.querySelector('.Cart-Table');
        const cart = container.querySelector('.Cart');
        const link = cart.querySelector('a');
        const clear = container.querySelector('.Cart-Clear');
        const form = container.querySelector('.Form');

        expect(table).not.toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/catalog');
        expect(clear).not.toBeInTheDocument();
        expect(form).not.toBeInTheDocument();
    });

    it('Корректно очищает корзину', async () => {
        const { container } = render(application);

        const table = container.querySelector('.Cart-Table');
        const clearButton = container.querySelector('.Cart-Clear');

        await userEvent.click(clearButton);

        expect(table).not.toBeInTheDocument();
    });
});
