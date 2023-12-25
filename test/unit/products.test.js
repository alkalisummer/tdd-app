const productController = require('../../controller/products');
const productModel = require('../../models/Product');
const httpMocks = require('node-mocks-http');
const newProduct = require('../data/new-product.json');

productModel.create = jest.fn();

let req, res, next;
beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = null;
});

describe('Product Controller Create', () => {
  beforeEach(() => {
    req.body = newProduct;
  });
  it('should have a createProduct function', () => {
    expect(typeof productController.createProduct).toBe('function');
  });
  it('should call ProductModel.create', () => {
    productController.createProduct(req, res, next);
    expect(productModel.create).toBeCalledWith(newProduct);
  });
  it('should return 201 response code', () => {
    productController.createProduct(req, res, next);
    expect(res.statusCode).toBe(201);
    console.log('isEndCalled:' + res._isEndCalled());
    expect(res._isEndCalled()).toBeTruthy();
  });
  it('should return json body in response', () => {
    productModel.create.mockReturnValue(newProduct);
    productController.createProduct(req, res, next);
    expect(res._getJSONData()).toStrictEqual(newProduct);
  });
});
