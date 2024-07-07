import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Application } from '../../src/client/Application';
import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';

describe('Гамбургер меню', () => {
    beforeAll(() => {
        // Устанавливаем ширину окна для тестов
        window.innerWidth = 500;
    });

    const basename = '/';

    const api = new ExampleApi(basename);
    const cart = new CartApi();
    const store = initStore(api, cart);
    
    const application = (
        <MemoryRouter initialEntries={['/']} initialIndex={0}>
            <Provider store={store}>
                <Application />
            </Provider>
        </MemoryRouter>
    );

    it('Отображается, когда ширина окна меньше или равна 576 пикселей', () => {
        const { container } = render(application);

        const hamburger = container.querySelector('.Application-Toggler');

        expect(hamburger).toBeVisible();
    });

    it('Отображает меню при клике и скрывает при повторном клике', async () => {
        const { container } = render(application);

        const hamburger = container.querySelector('.Application-Toggler');
        const menu = container.querySelector('.Application-Menu');

        // Изначально меню должно быть скрыто
        expect(menu).toHaveClass('collapse');

        // Клик по гамбургеру открывает меню
        await userEvent.click(hamburger);
        expect(menu).not.toHaveClass('collapse');

        // Повторный клик по гамбургеру скрывает меню
        await userEvent.click(hamburger);
        expect(menu).toHaveClass('collapse');
    });
});
