import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Application } from '../../src/client/Application';
import { initStore } from '../../src/client/store';
import { CartApi, ExampleApi } from '../../src/client/api';

describe('Компонент Header', () => {
    const basename = '/';
    let store;
    let application;

    beforeEach(() => {
        const api = new ExampleApi(basename);
        const cart = new CartApi();
        store = initStore(api, cart);
    
        application = (
            <MemoryRouter initialEntries={['/']} initialIndex={0}>
                <Provider store={store}>
                    <Application />
                </Provider>
            </MemoryRouter>
        );
    });

    afterEach(() => {
        cleanup();
    });

    it('Логотип отображается как ссылка на главную страницу', () => {
        const { container } = render(application);
        const logo = container.querySelector('.Application-Brand');
        expect(logo).toHaveAttribute('href', '/');
    });

    it('Пункты меню отображаются корректно', () => {
        const { container } = render(application);
        const items = container.querySelectorAll('.nav-link');
        const labels = Array.from(items).map((item) => item.textContent);
        const links = Array.from(items).map((item) => item.getAttribute('href'));

        expect(labels).toStrictEqual(['Catalog', 'Delivery', 'Contacts', 'Cart']);
        expect(links).toStrictEqual(['/catalog', '/delivery', '/contacts', '/cart']);
    });

    it('Меню скрывается при клике на пункт меню', async () => {
        const { container } = render(application);
        const hamburger = container.querySelector('.Application-Toggler');
        const firstItem = container.querySelector('.nav-link');
        const menu = container.querySelector('.Application-Menu');

        await userEvent.click(hamburger);

        expect(menu).not.toHaveClass('collapse');

        await userEvent.click(firstItem);

        expect(menu).toHaveClass('collapse');
    });
});
