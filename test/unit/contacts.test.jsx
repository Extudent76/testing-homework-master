import React from 'react';
import { render, screen } from '@testing-library/react';
import { Contacts } from '../../src/client/pages/Contacts';

describe('Компонент Contacts', () => {
  test('Отображает заголовок страницы', () => {
    render(<Contacts />);
    expect(screen.getByRole('heading', { name: /Contacts/i })).toBeInTheDocument();
  });

  test('Отображает текст о вопросах и заказах', () => {
    render(<Contacts />);
    expect(screen.getByText(/Have a question about our scratchers or need help placing an order\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Don't hesitate to reach out to us!/i)).toBeInTheDocument();
  });

  test('Отображает текст о доступности представителей', () => {
    render(<Contacts />);
    expect(screen.getByText(/Our friendly representatives are available during business hours/i)).toBeInTheDocument();
  });

  test('Отображает текст об удовлетворенности клиентов', () => {
    render(<Contacts />);
    expect(screen.getByText(/At our store, customer satisfaction is our priority/i)).toBeInTheDocument();
    expect(screen.getByText(/we're committed to ensuring you have a smooth and enjoyable shopping experience/i)).toBeInTheDocument();
    expect(screen.getByText(/Reach out to us today – we're here to help make your cat's scratching dreams a reality!/i)).toBeInTheDocument();
  });
});
