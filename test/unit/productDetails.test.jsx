import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { initStore } from '../../src/client/store';
import { MOCK_PRODUCT_1, TestApi, TestCartApi } from './mock.api';
import { ProductDetails } from '../../src/client/components/ProductDetails';

describe('Компонент <ProductDetails />', () => {
    const basename = '/';

    const store = initStore(new TestApi(basename), new TestCartApi());

    const application = (
        <MemoryRouter initialEntries={['/catalog/1']} initialIndex={0}>
            <Provider store={store}>
                <ProductDetails product={MOCK_PRODUCT_1} />
            </Provider>
        </MemoryRouter>
    );

    it('Отображает изображение продукта', () => {
        const { container } = render(application);
        const image = container.querySelector('.Image');
        expect(image).toBeVisible();
    });

    it('Отображает название продукта', () => {
        const { container } = render(application);
        const title = container.querySelector('.ProductDetails-Name')?.textContent;
        expect(title).toBe(MOCK_PRODUCT_1.name);
    });

    it('Отображает описание продукта', () => {
        const { container } = render(application);
        const description = container.querySelector('.ProductDetails-Description')?.textContent;
        expect(description).toBe(MOCK_PRODUCT_1.description);
    });

    it('Отображает цену продукта', () => {
        const { container } = render(application);
        const price = container.querySelector('.ProductDetails-Price')?.textContent;
        expect(price).toBe(`$${MOCK_PRODUCT_1.price}`);
    });

    it('Отображает цвет продукта', () => {
        const { container } = render(application);
        const color = container.querySelector('.ProductDetails-Color')?.textContent;
        expect(color).toBe(MOCK_PRODUCT_1.color);
    });

    it('Отображает материал продукта', () => {
        const { container } = render(application);
        const material = container.querySelector('.ProductDetails-Material')?.textContent;
        expect(material).toBe(MOCK_PRODUCT_1.material);
    });

    it('Кнопка "Добавить в корзину" видима и имеет класс "btn-lg"', () => {
        const { container } = render(application);
        const addToCart = container.querySelector('.ProductDetails-AddToCart');
        expect(addToCart).toBeVisible();
        expect(addToCart).toHaveClass('btn-lg');
    });
});
