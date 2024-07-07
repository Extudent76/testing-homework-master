import type { CartItem, CartState, CheckoutFormData, Product, ProductShortInfo, CheckoutResponse, Order } from "../../src/common/types";

// Функция для создания mock-продукта с параметрами по умолчанию, которые можно переопределить
export const createMockProduct = (params: Partial<Product>): Product => ({
  id: 1,
  name: 'Default Product',
  description: 'Default description',
  price: 100,
  material: 'Default material',
  color: 'Default color',
  ...params
});

// Примеры mock-продуктов
export const MOCK_PRODUCT_1 = createMockProduct({ id: 1, name: 'Product 1' });
export const MOCK_PRODUCT_2 = createMockProduct({ id: 2, name: 'Product 2' });

// Массив mock-продуктов
export const MOCK_PRODUCTS: Product[] = [
  MOCK_PRODUCT_1,
  MOCK_PRODUCT_2
];

// Примеры элементов корзины
export const MOCK_CART_ITEM_1: CartItem = {
  name: MOCK_PRODUCT_1.name,
  price: MOCK_PRODUCT_1.price,
  count: 1
};

export const MOCK_CART_ITEM_2: CartItem = {
  name: MOCK_PRODUCT_2.name,
  price: MOCK_PRODUCT_2.price,
  count: 2
};

// Состояние корзины
export const MOCK_CART_STATE: CartState = {
};

export const MOCK_CART_STATE1: CartState = {
  [MOCK_PRODUCT_1.id]: MOCK_CART_ITEM_1,
  [MOCK_PRODUCT_2.id]: MOCK_CART_ITEM_2
};


// Пример данных формы оформления заказа
export const MOCK_CHECKOUT_FORM_DATA: CheckoutFormData = {
  name: 'John Doe',
  phone: '1234567890',
  address: '123 Main St'
};

// Mock API для продуктов и корзины
export class TestApi {
  private products: Product[];

  constructor(products: Product[] = MOCK_PRODUCTS) {
    this.products = products;
  }

  async getProducts(): Promise<Product[]> {
    return Promise.resolve(this.products);
  }

  async getProductById(id: number): Promise<Product> {
    const product = this.products.find(p => p.id === id);
    if (product) {
      return Promise.resolve(product);
    } else {
      return Promise.reject(`Product with id ${id} not found`);
    }
  }

  async checkout(form: CheckoutFormData, cart: CartState): Promise<CheckoutResponse> {
    // Имитируем успешное оформление заказа с id 1
    return Promise.resolve({ id: 1 });
  }
}

// Mock API для работы с состоянием корзины
export class TestCartApi {
  private state: CartState;

  constructor(state: CartState = MOCK_CART_STATE) {
    this.state = state;
  }

  getState(): CartState {
    return this.state;
  }

  setState(cart: CartState) {
    this.state = cart;
  }
}
