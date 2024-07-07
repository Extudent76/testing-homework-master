import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Form } from '../../src/client/components/Form';

describe('<Form />', () => {
    it('Отмечает пустое поле "Имя" как недействительное', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const name = container.querySelector('.Form-Field_type_name');
        const submit = container.querySelector('.Form-Submit');

        await userEvent.click(submit);

        expect(name).toHaveClass('is-invalid');
    });

    it('Отмечает пустое поле "Телефон" как недействительное', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const phone = container.querySelector('.Form-Field_type_phone');
        const submit = container.querySelector('.Form-Submit');

        await userEvent.click(submit);

        expect(phone).toHaveClass('is-invalid');
    });

    it('Отмечает некорректный телефон как недействительный', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const phone = container.querySelector('.Form-Field_type_phone');
        const submit = container.querySelector('.Form-Submit');

        await userEvent.type(phone, '123');
        await userEvent.click(submit);

        expect(phone).toHaveClass('is-invalid');
    });

    it('Отмечает пустое поле "Адрес" как недействительное', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const address = container.querySelector('.Form-Field_type_address');
        const submit = container.querySelector('.Form-Submit');

        await userEvent.click(submit);

        expect(address).toHaveClass('is-invalid');
    });

    it('Не отправляет некорректные данные', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const phone = container.querySelector('.Form-Field_type_phone');
        const submit = container.querySelector('.Form-Submit');

        await userEvent.type(phone, '123');
        await userEvent.click(submit);

        expect(onSubmit).not.toHaveBeenCalled();
    });

    it('Правильно отправляет корректные данные', async () => {
        const onSubmit = jest.fn();

        const { container } = render(<Form onSubmit={onSubmit} />);

        const name = container.querySelector('.Form-Field_type_name');
        const phone = container.querySelector('.Form-Field_type_phone');
        const address = container.querySelector('.Form-Field_type_address');
        const submit = container.querySelector('.Form-Submit');

        await userEvent.type(name, 'name');
        await userEvent.type(phone, '1234567890');
        await userEvent.type(address, 'a');
        await userEvent.click(submit);

        expect(onSubmit).toHaveBeenCalledWith({ name: 'name', phone: '1234567890', address: 'a' });
    });
});
